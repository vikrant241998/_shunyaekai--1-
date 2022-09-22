window.addEventListener(
  "load",
  function (e) {
    // Hamburger or X
    let navham = document.getElementById("nav-ham");
    // 1st level (only one)
    let navul = document.querySelector("nav > ul");
    // 2nd level (many)
    let navulliuls = document.querySelectorAll("nav > ul > li > ul");
    // 1st level links that have a 2nd level dropdown (many)
    let navullis = document.querySelectorAll(
      "nav > ul > li a:not(:only-child)"
    );
    // Toggle 2nd level visibility
    let toggle2nd = function (e) {
      // Make 2nd level visible
      let thisul = this.parentNode.querySelector("ul");
      thisul.classList.toggle("active");
      // Hide other dropdowns
      for (let item of navulliuls) {
        if (item !== thisul) {
          item.classList.remove("active");
        }
      }
      // Do not execute this link or hidenav
      e.stopPropagation();
    };
    // Toggle mobile navigation bar
    let togglenav = function (e) {
      // Hamburger to X toggle
      navham.classList.toggle("active");
      // 1st level visible toggle
      navul.classList.toggle("active");
      // Do not execute hidenav
      e.stopPropagation();
    };
    // Hide mobile navigation bar
    let hidenav = function (e) {
      // Hamburger
      navham.classList.remove("active");
      // 1st level visible toggle
      navul.classList.remove("active");
      e.stopPropagation();
      // Hide 2nd level
      for (let item of navulliuls) {
        item.classList.remove("active");
      }
    };
    // Toggle 2nd level visibility on click on any link that has a 2nd level dropdown
    for (let item of navullis) {
      item.addEventListener("click", toggle2nd, false);
    }
    // Hamburger or X click
    navham.addEventListener("click", togglenav, false);
    // Clicking away from dropdown will remove the dropdown class
    document.documentElement.addEventListener("click", hidenav, false);
  },
  false
);
// accordion js
var acc = document.getElementsByClassName("label");
for (var i = 0; i < acc.length; i++) {
  acc[i].onclick = function () {
    this.classList.toggle("accordion-active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  };
}
// form flag
var option = document.querySelector("#phone");
var iti = window.intlTelInput(option, {
  separateDialCode: true,
  autoPlaceholder: false,
  initialCountry: "ae",
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.9/js/utils.js",
});
// comming soon
let comming = document.getElementsByClassName("comming")[0];
let vbutton = document.getElementsByClassName("video-button")[0];
vbutton.onclick = function () {
  vbutton.style.display = "none";
  comming.style.display = "block";
};
comming.onclick = function () {
  vbutton.style.display = "block";
  comming.style.display = "none";
};
