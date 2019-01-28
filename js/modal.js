var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    if (connected) {
        button_click();
    } else {
        modal.classList.toggle("show-modal");
    }
}

function windowOnClick(event) {
    if (event.target === modal) {
    toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
