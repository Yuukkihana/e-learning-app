const modal = document.querySelector(".my-modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open-modal");
const closeModalBtn = document.querySelector(".btn-close-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

openModalBtn.addEventListener("click", openModal);

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeModalBtn.addEventListener("click", closeModal);
