//Oma Modal Pop Up
//Elementen aus HTML selektieren
const modal = document.querySelector(".my-modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open-modal");
const closeModalBtn = document.querySelector(".btn-close-modal");

const openModal = function () { //Pop up wird gezeigt wenn hidden class ist entfernt
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

openModalBtn.addEventListener("click", openModal); //Erstellung von EventListener zum öffnen des Modals

const closeModal = function () { //funktion zum schließen - gibt hidden class
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeModalBtn.addEventListener("click", closeModal); //event listener zum schließen

//for service worker script loading
const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("https://intranet.ikt.hs-ulm.de/user/voynova/sw.js");
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

// …

registerServiceWorker();
