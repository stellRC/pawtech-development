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

document.addEventListener("scroll", () => {
  let stickyHeader = document.querySelector(".sticky-header");
  for (const child of stickyHeader.children) {
    if (window.scrollY > 100) {
      child.classList.remove("hide");
    } else {
      child.classList.add("hide");
    }
  }
});

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

  if (e.innerHTML == "See More") {
    e.innerHTML = "See Less";

    servicesMore.classList.add("show");
  } else {
    e.innerHTML = "See More";
    servicesMore.classList.remove("show");
  }
}
