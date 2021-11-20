"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnHamburger = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav--links");
const hamburger = document.querySelector(".hamburger");
const bookmark = document.querySelector(".bookmark");
const modalCardFooters = document.querySelectorAll(".modal__card__footer");
const btnsRadio = document.querySelectorAll(".modal__radio__input");
const modalCompleted = document.querySelector(".modal-completed");
const btnsModalCard = document.querySelectorAll(".modal__card__btn");
const btnModalCompleted = document.querySelector(".modal-completed-btn");
const backedTotal = document.getElementById("backed");
const backers = document.getElementById("backers");
const pledgeInput = document.querySelectorAll(".modal__card__footer__input");
const progressBar = document.querySelector(".progress__bar");

// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  modalCardFooters[0].style = "display: none";
  modalCardFooters[1].style = "display: none";
  modalCardFooters[2].style = "display: none";
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Hamburger menu
const openMenu = function () {
  navMenu.classList.toggle("nav-links-show");
  overlay.classList.toggle("hidden");

  if (navMenu.classList.contains("nav-links-show")) {
    hamburger.src = "/assets/images/icon-close-menu.svg";
  } else {
    hamburger.src = "/assets/images/icon-hamburger.svg";
  }
};

const closeMenu = function () {
  navMenu.classList.remove("nav-links-show");
  hamburger.src = "/assets/images/icon-hamburger.svg";
  overlay.classList.add("hidden");
};

btnHamburger.addEventListener("click", openMenu);
overlay.addEventListener("click", closeMenu);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !navMenu.classList.contains("hidden")) {
    closeMenu();
  }
});

// Modal card footers open
btnsOpenModal.forEach((btnOpenModal) => {
  btnOpenModal.addEventListener("click", () => {
    if (btnOpenModal === btnsOpenModal[1]) {
      modalCardFooters[1].style = "display: block";
      modalCardFooters[2].style = "display: none";
    } else if (btnOpenModal === btnsOpenModal[2]) {
      modalCardFooters[2].style = "display: block";
      modalCardFooters[1].style = "display: none";
    } else {
      modalCardFooters[0].style = "display: none";
      modalCardFooters[1].style = "display: none";
      modalCardFooters[2].style = "display: none";
    }
  });
});

// Modal card footers open from radio input
btnsRadio.forEach((btnRadio) => {
  btnRadio.addEventListener("click", () => {
    if (btnRadio === btnsRadio[0]) {
      modalCardFooters[0].style = "display: block";
      modalCardFooters[1].style = "display: none";
      modalCardFooters[2].style = "display: none";
    } else if (btnRadio === btnsRadio[1]) {
      modalCardFooters[0].style = "display: none";
      modalCardFooters[1].style = "display: block";
      modalCardFooters[2].style = "display: none";
    } else if (btnRadio === btnsRadio[2]) {
      modalCardFooters[0].style = "display: none";
      modalCardFooters[1].style = "display: none";
      modalCardFooters[2].style = "display: block";
    } else {
      modalCardFooters[0].style = "display: none";
      modalCardFooters[1].style = "display: none";
      modalCardFooters[2].style = "display: none";
    }
  });
});

const goal = 100000;
let totalBacked = parseInt(89914, 10);
let totalBackers = parseInt(5007, 10);

const format = function (x) {
  return x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

btnsModalCard.forEach((btnModalCard) => {
  btnModalCard.addEventListener("click", function (e) {
    e.preventDefault();

    let backs = parseInt(btnModalCard.previousElementSibling.value, 10);

    backedTotal.innerHTML = `${format(totalBacked + backs)}`;
    totalBackers++;
    backers.innerHTML = totalBackers;

    // calculate new percentage of goal from updated total
    const backedPercent = totalBacked + backs;
    const backedPercentage = Math.floor((backedPercent / goal) * 100);
    progressBar.style.width = `${backedPercentage}%`;

    closeModal();
    modalCompleted.style = "display: block";
    overlay.classList.toggle("hidden");
  });
});

const closeModalComplete = function () {
  modalCompleted.style = "display: none";
  overlay.classList.toggle("hidden");
};

btnModalCompleted.addEventListener("click", closeModalComplete);
