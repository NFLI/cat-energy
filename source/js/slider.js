(function () {
  const mobileWidth = 320;
  const tabletWidth = 768;
  const laptopWidth = 1024;

  let viewport = document.documentElement.clientWidth || window.innerWidth;
  let slider = document.querySelector(".slider");
  let imageBefore = slider.querySelector(".slider__image--before");
  let imageAfter = slider.querySelector(".slider__image--after");
  let buttonBefore = slider.querySelector(".slider__btn--before");
  let sliderRange = slider.querySelector(".slider__range");
  let sliderThumb = slider.querySelector(".slider__thumb");
  let buttonAfter = slider.querySelector(".slider__btn--after");
  let sliderWidth,
    rangeWidth,
    thumbWidth;

  let getElemWidth = function (elem) {
    return parseInt(getComputedStyle(elem).width, 10);
  };

  buttonBefore.addEventListener("click", (evt) => {
    evt.preventDefault();
    imageBefore.style.width = "100%";
    imageAfter.style.width = "0";
    if(window.innerWidth < tabletWidth) {
      sliderThumb.style.left = "50%";
    }
    else {
     sliderThumb.style.left = "3%";
    }
    sliderThumb.style.transition = "left 2.5s ease-in-out";
    imageBefore.style.transition = "width 2s ease-in-out";

    if (window.innerWidth >= laptopWidth) {
      sliderThumb.style.transition = "left 3s ease-in-out";
      imageBefore.style.transition = "width 3s ease-in-out";
    }
    else {
      sliderThumb.style.transition = "left 3s ease-in-out";
      imageBefore.style.transition = "width 1.5s ease-in-out";
    }
  });

  buttonAfter.addEventListener("click", (evt) => {
    evt.preventDefault();
    imageAfter.style.width = "100%";
    imageBefore.style.width = "0";
    if (window.innerWidth < tabletWidth) {
      sliderThumb.style.left = "90%";
    }
    else {
      sliderThumb.style.left = "97%";
    }
    imageAfter.style.transition = "width 2s ease-in-out";
    sliderThumb.style.transition = "left 2.5s ease-in-out"

    if (viewport>=laptopWidth) {
      sliderThumb.style.transition = "left 3s ease-in-out";
      imageAfter.style.transition = "width 3s ease-in-out";
    }
    else {
      sliderThumb.style.transition = "left 1s ease-in-out";
      imageAfter.style.transition = "width 1.5s ease-in-out";
    };
  });

  sliderThumb.ondblclick = function () {
    imageBefore.style.width = "50%";
    imageAfter.style.width = "50%";
    sliderThumb.style.left = "50%";
  };

  let getCoords = function (elem) {
    let box = elem.getBoundingClientRect();
    return box.left + scrollX;
  };

  let thumbDownHandler = function (evtDown) {
    let thumbCoords = getCoords(sliderThumb);
    let rangeCoords = getCoords(sliderRange);
    sliderThumb.style.transition = "none";

    let shiftX = evtDown.pageX - thumbCoords;

    document.onmousemove = function (evtMove) {
      let newLeft = evtMove.pageX - shiftX - rangeCoords;

      if (newLeft < 0) {
        newLeft = 0;
      }

      let rightEdge = rangeWidth - thumbWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      let thumbValue = newLeft / rightEdge * 100;
      sliderThumb.style.left = newLeft + "px";

      imageBefore.style.width = (100 - thumbValue) + "%";
      imageAfter.style.width = thumbValue + "%";
    };

    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
      sliderThumb.style.transition = "left 0.2s ease-out";
    };

    return false;
  };

  let addThumbHandlers = function () {
    sliderThumb.addEventListener("mousedown", thumbDownHandler);
  };

  let removeThumbHandlers = function () {
    sliderThumb.removeEventListener("mousedown", thumbDownHandler);
  };


  let init = function () {

    if (viewport >= tabletWidth) {
      addThumbHandlers();
    }
    else {
      removeThumbHandlers();
    }

    sliderWidth = getElemWidth(slider);
    rangeWidth = getElemWidth(sliderRange) + 20;
    thumbWidth = getElemWidth(sliderThumb);

    imageBefore.style.width = "";
    imageAfter.style.width = "";
    sliderThumb.style.left = "";
  };

  window.addEventListener("load", init);
  window.addEventListener("resize", init);
})();
