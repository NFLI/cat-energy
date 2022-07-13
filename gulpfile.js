import gulp from 'gulp';
import del from 'del';
import plumber from 'gulp-plumber';
import htmlmin from 'gulp-htmlmin';
import sass from 'gulp-dart-sass';
import rename from 'gulp-rename';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';


const clean = () => {
  return del("build");
};

// Copy Files

const copy = () => {
  return gulp.src([
    "source/img/**",
    "source/js/**",
    "source/*.ico"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
};

// Image Optimize

const optimizeImages = () => {
  return gulp.src("source/img/*.{png,jpg}")
    .pipe(imagemin([
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
    ]))
    .pipe(gulp.dest("build/img/raster"))
};

// Webp

const createWebp = () => {
  return gulp.src("source/img/raster/*.{jpg,png}")
    .pipe(webp({quality: 95}))
    .pipe(gulp.dest("build/img/webp"))
};

// Svg Sprite

const sprite = () => {
  return gulp.src('source/img/vector/sprite/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img/vector'));
};

const svgImages = () =>
  gulp.src('source/img/*.svg')
  .pipe(gulp.dest('build/img/vector'));

const svgIcons = () => gulp.src('source/img/vector/*.svg')
  .pipe(svgo())
  .pipe(gulp.dest('build/img/vector'));

const reload = (done) => {
  browser.reload();
  done();
};

// HTML Minify

const html = () => {
  return gulp.src("source/*.html")
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest("build"));
};

// CSS Styles

const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer('last 2 versions'), csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};


// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload && gulp.series(html));
};


export default gulp.series(
  clean, copy, optimizeImages, createWebp, svgIcons, svgImages, sprite, reload, html, styles, server, watcher
);
