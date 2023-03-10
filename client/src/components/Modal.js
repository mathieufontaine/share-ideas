class Modal {
  constructor() {
    this._modal = document.querySelector("#modal");
    this._modalBtn = document.querySelector("#modal-btn");
    this.addEventListener();
  }

  addEventListener() {
    this._modalBtn.addEventListener("click", this.open.bind(this));
    window.addEventListener("click", this.close.bind(this));
    document.addEventListener("closeModal", this.close.bind(this));
  }

  open() {
    this._modal.classList.add("show-modal");
  }

  close(e) {
    if (e.target === modal) {
      this._modal.classList.remove("show-modal");
    }
  }
}

export default Modal;
