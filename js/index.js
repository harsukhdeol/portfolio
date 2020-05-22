const container = [...document.getElementsByClassName("container")][0];
const menu = document.getElementById("menu");
const height = container.clientHeight;
const width = container.clientWidth;
const welcome = document.getElementById("welcome-section");
const main = document.getElementById("main");
var i = 0;
function visible(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= content.pageYOffset &&
    left >= content.pageXOffset &&
    top + height <= content.pageYOffset + content.innerHeight &&
    left + width <= content.pageXOffset + content.innerWidth
  );
}
function scroll(e) {
  if (e.clientX > width * 0.6) {
    menu.style.transform = `translateX(${
      -i * 1.73
    }px) translateY(${i}px)  rotate(60deg) skewY(-30deg) scaleY(0.864)`;
    if (i < 100) {
      i += 10;
    }
  } else if (e.clientX < width * 0.4) {
    menu.style.transform = ` translateX(${
      -i * 1.73
    }px) translateY(${i}px)  rotate(60deg) skewY(-30deg) scaleY(0.864)`;
    if (i > -500) {
      i -= 10;
    }
  }
}
var slide = 0;
var scrollCount = 0;
var offset = main.offsetTop;
const [about, experience, projects, services, contact] = [
  ...document.getElementsByClassName("section"),
];

let dir = 0;
let scrollPos = content.scrollTop;
function scrollDir() {
  // detects new state and compares it with the new one
  if (content.scrollTop > scrollPos) dir = -1;
  else dir = 1;
  scrollPos = content.scrollTop;
  return dir;
}

function inView(e) {
  let ev = e.getBoundingClientRect();
  return !(ev.top + ev.height < 0);
}
function update(x, speed, step, e) {
  let body = content.scrollTop;
  dir = Math.sign(e.wheelDeltaY);
  if (inView(x)) {
    x.style = `transform: translateY( ${dir * speed - body * step}px )`;
  }
}

content.addEventListener("mousewheel", function (e) {
  slide += Math.sign(e.wheelDeltaY);

  update([...welcome.children][1], 20, 0.3, e);
  update([...about.children][1], 3, 0.15, e);
  update([...about.children][0], 5, 0.15, e);
  update([...experience.children][0], 5, 0.15, e);

  update([...projects.children][0], 5, 0.15, e);

  update([...contact.children][0], 15, 0.25, e);
  update([...contact.children][1], 10, 0.25, e);
  [...services.children].forEach((p) => update(p, 10, 0.15, e));

  if (Math.abs(welcome.getBoundingClientRect().top) < offset) {
    content.style = "overflow-y: none";
  } else {
    content.style = "overflow-y: scroll";
  }

  if (Math.abs(container.getBoundingClientRect().top) < offset) {
    // e.preventDefault();
    content.style = "overflow-y: hidden";

    scrollCount += Math.sign(e.wheelDeltaY);
    if (Math.abs(scrollCount) > 25) {
      content.style = "overflow-y: scroll";
      console.log("go");
    }
  } else {
    scrollCount = 0;
  }
});

projects.addEventListener("mouseover", function (e) {
  if (i >= -500 && i <= 100) {
    if (e.clientX < projects.offsetWidth / 2) {
      i -= 5;
    } else {
      i += 5;
    }
    menu.style.transform = ` translateX(${
      -i * 1.73
    }px) translateY(${i}px)  rotate(60deg) skewY(-30deg) scaleY(0.864)`;
  } else if (i > 100) {
    i = 100;
  } else {
    i = -500;
  }
});
// When the user scrolls the page, execute myFunction
content.onscroll = function () {
  myFunction();
};

// Get the header
var header = [...document.getElementsByTagName("header")][0];

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (content.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
var cards = [...document.getElementsByClassName("card")];

/* console.log(cards);
setInterval(function() {
  removeClass(cards[0]);
  cards[0].classList.add(btn[i]);
  removeClass(cards[1]);
  i < 2 ? cards[1].classList.add(btn[i + 1]) : cards[1].classList.add(btn[0]);
  removeClass(cards[2]);
  if (i == 0) {
    cards[2].classList.add(btn[i + 2]);
  } else if (i == 1) {
    cards[2].classList.add(btn[0]);
  } else if (i == 2) {
    cards[2].classList.add(btn[1]);
  }
  i == 2 ? (i = 0) : i++;
  console.log(i);
}, 2000); */

function removeClass(e) {
  e.classList.remove(btn[0]);
  e.classList.remove(btn[1]);
  e.classList.remove(btn[2]);
}
const grid = document.getElementById("grid");
const slides = [
  document.querySelector(".prev"),
  document.querySelector(".center"),
  document.querySelector(".next"),
];

grid.addEventListener("mouseover", function () {
  cards.forEach((slide) => (slide.style = "animation-play-state: paused;"));
});
grid.addEventListener("mouseout", function () {
  cards.forEach((slide) => (slide.style = "animation-play-state: play;"));
});
