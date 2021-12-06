"use strict";

// Selecting elements
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnHamburger = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav--links");
const hamburger = document.querySelector(".hamburger");
const modalCardFooters = document.querySelectorAll(".modal__card__footer");
const modalCompleted = document.querySelector(".modal-completed");
const btnModalCompleted = document.querySelector(".modal-completed-btn");
const backedTotal = document.getElementById("backed");
const backers = document.getElementById("backers");
const progressBar = document.querySelector(".progress__bar");

// Opening and closing the modal window
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

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
    closeModalComplete();
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

// Bookmark functionality
const bookmark = document.querySelector(".bookmark");
const bookmarkText = document.querySelector(".bookmark__text");

bookmark.addEventListener("click", () => {
  bookmark.classList.toggle("bookmarked");
  bookmark.classList.contains("bookmarked")
    ? (bookmarkText.innerText = "Bookmarked")
    : (bookmarkText.innerText = "Bookmark");
});

// Modal card footers open from radio input
const btnsRadio = document.querySelectorAll(".modal__radio__input");
const modalItem = document.querySelectorAll(".modal__card");

function removeClass() {
  for (const item of modalItem) {
    item.classList.remove("modal__card-checked");
  }
}

modalItem.forEach((item, index) => {
  if (!item.classList.contains("disabled_item")) {
    item.addEventListener("click", () => {
      btnsRadio[index].checked = true;
      removeClass();
      item.classList.add("modal__card-checked");

      if (item === modalItem[0]) {
        modalCardFooters[0].style = "display: block";
        modalCardFooters[1].style = "display: none";
        modalCardFooters[2].style = "display: none";
        modalCardFooters[3].style = "display: none";
      } else if (item === modalItem[1]) {
        modalCardFooters[0].style = "display: none";
        modalCardFooters[1].style = "display: block";
        modalCardFooters[2].style = "display: none";
        modalCardFooters[3].style = "display: none";
      } else if (item === modalItem[2]) {
        modalCardFooters[0].style = "display: none";
        modalCardFooters[1].style = "display: none";
        modalCardFooters[2].style = "display: block";
        modalCardFooters[3].style = "display: none";
      } else if (item === modalItem[3]) {
        modalCardFooters[0].style = "display: none";
        modalCardFooters[1].style = "display: none";
        modalCardFooters[2].style = "display: none";
        modalCardFooters[3].style = "display: block";
      }
    });
  }
});

const goal = 100000;
let totalBacked = parseInt(89914);
let totalBackers = parseInt(5007);

const format = function (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const pledges = document.querySelectorAll(".footer__num");
const modalPledges = document.querySelectorAll(
  ".modal__card__header__subtext__number"
);
const aboutCard = document.querySelectorAll(".about__card");
const btnsModalCard = document.querySelectorAll(".modal__card__btn");

btnsModalCard.forEach((btnModalCard, index) => {
  btnModalCard.addEventListener("click", function (e) {
    e.preventDefault();

    let backs = parseInt(btnModalCard.previousElementSibling.value);

    backedTotal.innerHTML = `$${format((totalBacked += backs))}`;
    totalBackers++;
    backers.innerHTML = totalBackers;

    // calculate new percentage of goal from updated total
    const backedPercent = totalBacked + backs;
    const backedPercentage = Math.floor((backedPercent / goal) * 100);
    progressBar.style.width = `${backedPercentage}%`;

    if (!index == 0) {
      pledges[index - 1].textContent = pledges[index - 1].textContent - 1;
      modalPledges[index - 1].textContent =
        modalPledges[index - 1].textContent - 1;
    }

    removeClass();
    pledgeCheck();
    closeModal();
    modalCompleted.style = "display: block";
    overlay.classList.toggle("hidden");
  });
});

// Input number validation
const pledgeInput = document.querySelectorAll(".modal__card__footer__input");

pledgeInput.forEach((field) => {
  field.addEventListener("keyup", () => {
    if (+field.value >= +field.max) {
      alert(`Please enter a value between ${+field.min} and ${+field.max}.`);
      field.value = field.defaultValue;
    }
  });
});

// Checks the available pledges, disables item if 0 pledges are available.
function pledgeCheck() {
  modalPledges.forEach((item, index) => {
    if (item.innerText <= 0) {
      modalItem[index + 1].classList.add("disabled_item");
    }
  });

  pledges.forEach((item, index) => {
    if (item.innerText <= 0) {
      aboutCard[index].classList.add("disabled_item");
    }
  });
}
pledgeCheck();

const closeModalComplete = function () {
  modalCompleted.style = "display: none";
  overlay.classList.add("hidden");
};

btnModalCompleted.addEventListener("click", closeModalComplete);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !navMenu.classList.contains("hidden")) {
    closeMenu();
    closeModalComplete();
  }
});
