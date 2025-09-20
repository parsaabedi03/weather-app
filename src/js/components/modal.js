const modal = document.getElementById("modal");
const modalText = modal.querySelector("p");
const modalTitle = modal.querySelector("h2");
const modalButton = document.getElementById("modalBtn");

const showModal = (title, text) => {
  modalText.innerHTML = text;
  modalTitle.innerHTML = title;
  modal.classList.remove("hidden");
};

const removeModal = () => {
  modal.classList.add("hidden");
};

modalButton.addEventListener("click", removeModal);

export { showModal, removeModal };
