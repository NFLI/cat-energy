(function () {
  function debounce(f, ms) {
    var timer = null;

    return function (cb) {
      var onComplete = function () {
        f.apply(this, cb);
        timer = null;
      };
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(onComplete, ms);
    };
  }

  function debounce(f, ms) {
    var timer = null;

    return function (cb) {
      var onComplete = function () {
        f.apply(this, cb);
        timer = null;
      };
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(onComplete, ms);
    };
  }

  window.initMap = function () {
    let viewport = document.documentElement.clientWidth || window.innerWidth;
    let mapCenter = viewport < 1300 ? { lat: 59.938882, lng: 30.32323 } : { lat: 59.939065, lng: 30.319335 };
    let mapPinCenter = viewport < 768 ? { lat: 59.93871, lng: 30.32323 } : { lat: 59.93871, lng: 30.32299 };
    let mapPinSize = viewport < 768 ? { width: 62, height: 53 } : { width: 124, height: 106 };

    let mapOptions = {
      center: mapCenter,
      zoom: viewport < 768 ? 15 : 17
    };

    let map = new google.maps.Map(document.getElementById("map"), mapOptions);

    let mapPinImage = ({
      url: "img/raster/map-pin.png",
      scaledSize: mapPinSize
    });

    let marker = new google.maps.Marker({
      map: map,
      position: mapPinCenter,
      title: "Мяу!",
      icon: mapPinImage
    });
  };

  window.addEventListener("resize", debounce(initMap, 1000));
})();
