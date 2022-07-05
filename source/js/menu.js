let mainNav = document.querySelector(".main-nav");
let navToggle = mainNav.querySelector(".main-nav__toggle");

mainNav.classList.remove("main-nav--nojs");

navToggle.addEventListener("click", function () {
  if (mainNav.classList.contains('main-nav--opened')) {
    mainNav.classList.remove('main-nav--opened');
  }

  else {
    mainNav.classList.add('main-nav--opened');
  }
});
