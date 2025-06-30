// TYPEWRITER VARIABLES
const solutionsMore = document.querySelector("#solutionsMore");

let fullFirst;
const TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 600;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

// FORM VARIABLES
const emailRegex = /\S+@\S+\.\S+/; // has @ and .
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; // starts with 9

const elForm = document.getElementsByClassName("form")[0];
const elEmail = document.getElementsByClassName("email")[0];
const elPhone = document.getElementsByClassName("phone")[0];
const elName = document.getElementsByClassName("name")[0];
const elMessage = document.getElementsByClassName("message")[0];
const elSubmit = document.getElementsByClassName("input-submit")[0];

const formErrors = {
  email: false,
  phone: false,
  message: false,
  name: false,
};

let hasSubmitted = false;

// TYPEWRITER ANIMATION

TxtType.prototype.tick = function () {
  let i = this.loopNum % this.toRotate.length;
  let fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  if (fullTxt == this.toRotate[0]) {
    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";
  } else {
    this.el.innerHTML =
      '<span class="wrap">' + fullFirst + this.txt + "</span>";
  }

  let that = this;
  let delta = (200 - Math.random() * 100) / 3;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    if (fullTxt == this.toRotate[this.toRotate.length - 1]) return;
    else if (fullTxt == this.toRotate[0]) {
      fullFirst = this.txt;
      this.loopNum++;
    } else {
      delta = this.period;
      this.isDeleting = true;
    }
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

// SOLUTION EXPANSION LINKS

// TYPEWRITE ANIMATION
window.onload = function () {
  let elements = document.getElementsByClassName("typewrite");
  for (let i = 0; i < elements.length; i++) {
    let toRotate = elements[i].getAttribute("data-type");
    let period = elements[i].getAttribute("data-period");
    if (toRotate.toString()) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  let carrot = document.createElement("style");
  HTMLStyleElement.type = "text/css";
  document.body.appendChild(carrot);
  // const hiddenSpan = document.querySelector('.span-hidden')
  // hiddenSpan.style.display = 'none'
};

// MAILTO LINK
const links = document.querySelectorAll(
  "[data-part1][data-part2][data-part3][data-subject]"
);
for (const link of links) {
  const attrs = link.dataset;
  link.setAttribute(
    "href",
    `mailto:${attrs.part1}&#64;${attrs.part2}&#46;${attrs.part3}?subject=${attrs.subject}`
  );
  if (link.classList.contains("contact-add")) {
    link.innerHTML =
      `${window.atob(attrs.part1)}@` +
      link.innerHTML +
      `${window.atob(attrs.part2)}.${window.atob(attrs.part3)}`;
  }
}

function showText(e) {
  if (!e.classList.contains("show-flex")) {
    e.classList.add("show-flex");

    // e.previousElementSibling.classList.add("link-background");
    e.previousElementSibling.classList.add("clicked");
  } else {
    hideText(e);
  }
}

// Services Grid and Modal
const servicesGrid = document.querySelector(".services");
const bodyElement = document.querySelector("body");

function modal(e) {
  if (!e.classList.contains("show-flex")) {
    e.classList.add("show-flex");

    // e.previousElementSibling.classList.add("link-background");
    e.previousElementSibling.classList.add("clicked");
    bodyElement.classList.add("modal-open");
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    e.showModal();
  } else {
    hideText(e);
  }
}

function hideText(e) {
  e.close();

  bodyElement.classList.remove("modal-open");
  e.previousElementSibling.classList.remove("clicked");
  e.classList.remove("show-flex");
}

function showMore(e) {
  let servicesMore = document.getElementById("servicesMore");

  if (servicesMore.classList.contains("show")) {
    e.innerHTML = "See More";
    servicesMore.classList.remove("show");
  } else {
    e.innerHTML = "See Less";

    servicesMore.classList.add("show");
  }
}
// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);

// // We listen to the resize event
// window.addEventListener("resize", () => {
//   // We execute the same script as before
//   let vh = window.innerHeight * 0.01;
//   document.documentElement.style.setProperty("--vh", `${vh}px`);
// });

document.addEventListener("scroll", function () {
  const stickyHeader = document.querySelector(".sticky-header");
  const background = document.querySelector(".ios-background");
  const content = document.querySelector(".main-content");

  const scrollPosition = window.scrollY;
  const contentTop = content.offsetTop;

  for (const child of stickyHeader.children) {
    if (window.scrollY >= contentTop) {
      child.classList.add("opacity-change");
      stickyHeader.classList.add("fixed");
    } else {
      child.classList.remove("opacity-change");
      stickyHeader.classList.remove("fixed");
    }
  }

  if (scrollPosition >= contentTop) {
    background.style.top = "0";
  } else {
    background.style.top = "0";
  }
});

// Safari scroll trigger fix
document
  .querySelector(".scroller")
  .addEventListener("scroll", ScrollTrigger.update);
