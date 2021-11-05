"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnHamburger = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav--links");

// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
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
  navMenu.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeMenu = function () {
  overlay.classList.add("hidden");
  navMenu.classList.add("hidden");
};

btnHamburger.addEventListener("click", openMenu);
overlay.addEventListener("click", closeMenu);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !nav.classList.contains("hidden")) {
    closeMenu();
  }
});
