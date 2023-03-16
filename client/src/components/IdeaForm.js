import IdeasApi from "../services/IdeasApi";
import IdeaList from "./IdeaList";
import Modal from "./Modal";
class IdeaForm {
  constructor() {
    this._formModal = document.querySelector("#form-modal");
    this._form = document.querySelector("#idea-form");
    this._modal = document.querySelector("#modal");
    this._ideaList = new IdeaList();
    this._modal = new Modal();
  }

  addEventListeners() {
    this._form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  handleSubmit(e) {
    e.preventDefault();

    if (
      !this._form.elements.username.value ||
      !this._form.elements.title.value ||
      !this._form.elements.description.value ||
      !this._form.elements.tag.value
    ) {
      alert("Please enter all fields");
      return;
    }
    const idea = {
      user: this._form.elements.username.value,
      title: this._form.elements.title.value,
      description: this._form.elements.description.value,
      tags: this._form.elements.tag.value,
      status: this._form.elements.status.value || "new",
    };
    if (this._form.dataset.id) {
      this.updateIdea(this._form.dataset.id, idea);
    } else {
      this.createIdea(idea);
    }
    localStorage.setItem("username", idea.user);
    this._form.reset();
    this._form.dataset.id = "";
    this.render();
    document.dispatchEvent(new Event("closeModal"));
  }

  async createIdea(idea) {
    try {
      const res = await IdeasApi.createIdea(idea);
      this._ideaList.addIdeaToList(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async updateIdea(id, idea) {
    try {
      const res = await IdeasApi.updateIdea(id, idea);
      this._ideaList.updateIdeaInList(res.data.data);
    } catch (error) {
      console.error(error);
    }
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
        <div class="form-control">
          <label for="status">Status</label>
          <select name="status" id="status" value="new">
            <option value="new">New</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button class="btn" type="submit" id="submit">Submit</button>
      </form>
        `;
    this._form = document.querySelector("#idea-form");
    this.addEventListeners();
  }
}

export default IdeaForm;
