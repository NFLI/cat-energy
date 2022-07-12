import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import rename from 'gulp-rename';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import imagemin from 'gulp-imagemin';
import webp from "gulp-webp";
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';

const optimizeImages = () => {
  return gulp.src("source/img/*.{png,jpg}")
    .pipe(imagemin([
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
    ]))
    .pipe(gulp.dest("source/img/raster"))
}

const createWebp = () => {
  return gulp.src("source/img/raster/*.{jpg,png}")
    .pipe(webp({quality: 100}))
    .pipe(gulp.dest("source/img/webp"))
}

const sprite = () => {
  return gulp.src('source/img/vector/sprite/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('source/img/vector'));
}

const svgImages = () =>
  gulp.src('source/img/*.svg')
  .pipe(gulp.dest('source/img/vector'));

const svgIcons = () => gulp.src('source/img/vector/*.svg')
  .pipe(svgo())
  .pipe(gulp.dest('source/img/vector'));

const reload = (done) => {
  browser.reload();
  done();
}

// // Styles

const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}


// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}


export default gulp.series(
  optimizeImages, createWebp, svgIcons, svgImages, sprite, reload, styles, server, watcher
);
