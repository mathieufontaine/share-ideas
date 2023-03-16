class Modal {
  constructor() {
    this._modal = document.querySelector("#modal");
    this._modalBtn = document.querySelector("#modal-btn");
    this.addEventListeners();
  }

  addEventListeners() {
    this._modalBtn.addEventListener("click", this.open.bind(this));
    window.addEventListener("click", this.outsideClick.bind(this));
    document.addEventListener("openModal", this.open.bind(this));
    document.addEventListener("closeModal", this.close.bind(this));
  }

  open() {
    this._modal.classList.add("show-modal");
  }

  close() {
    this._modal.classList.remove("show-modal");
  }

  outsideClick(e) {
    if (e.target === this._modal) {
      this.close();
    }
  }
}

export default Modal;
