class IdeaForm {
  constructor() {
    this._formModal = document.querySelector("#form-modal");
    this._form = document.querySelector("#idea-form");
    this._modal = document.querySelector("#modal");
  }

  addEventListeners() {
    this._form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("submitting");
    const idea = {
      user: this._form.elements.username.value,
      title: this._form.elements.title.value,
      description: this._form.elements.description.value,
      tag: this._form.elements.tag.value,
    };
    localStorage.setItem("username", idea.user);
    console.log(idea);
    this._form.reset();
    document.dispatchEvent(new Event("closeModal"));
  }

  render() {
    this._formModal.innerHTML = `
        <form id="idea-form">
        <div class="form-control">
          <label for="idea-text">Enter a Username</label>
          <input type="text" name="username" id="username" value="${
            localStorage.getItem("username")
              ? localStorage.getItem("username")
              : ""
          }" />
        </div>
        <div class="form-control">
          <label for="idea-text">What's Your Idea About?</label>
          <input type="text" name="title" id="idea-text"/>
        </div>
        <div class="form-control">
          <label for="idea-description">Describe Your Idea</label>
          <textarea name="description" id="idea-description"></textarea>
        </div>
        <div class="form-control">
          <label for="tag">Tag</label>
          <input type="text" name="tag" id="tag" />
        </div>
        <button class="btn" type="submit" id="submit">Submit</button>
      </form>
        `;
    this._form = document.querySelector("#idea-form");
    this.addEventListeners();
  }
}

export default IdeaForm;
