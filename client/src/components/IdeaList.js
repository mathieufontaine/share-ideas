import IdeasApi from "../services/IdeasApi";

class IdeaList {
  constructor() {
    this._ideaList = document.querySelector("#idea-list");
    this.getIdeas();
    this._ideas = [];
    this._validTags = new Set();
    this._validTags.add("technology");
    this._validTags.add("software");
    this._validTags.add("business");
    this._validTags.add("education");
    this._validTags.add("health");
    this._validTags.add("inventions");
  }

  addEventListeners() {
    const ideaList = document.querySelectorAll(".card");
    ideaList.forEach((card) =>
      card.addEventListener("click", (e) => {
        const id = e.target.closest(".card").dataset.id;
        if (e.target.classList.contains("fa-times")) {
          e.stopImmediatePropagation();
          this.deleteIdea(id);
        } else if (e.target.classList.contains("fa-edit")) {
          e.stopImmediatePropagation();
          this.editIdea(id);
        } else if (e.target.classList.contains("fa-thumbs-up")) {
          e.stopImmediatePropagation();
          this.updateIdeaVotes(id, true);
        } else if (e.target.classList.contains("fa-thumbs-down")) {
          e.stopImmediatePropagation();
          this.updateIdeaVotes(id, false);
        }
      })
    );
  }

  getIdea(id) {
    return this._ideas.find((idea) => idea._id === id);
  }

  editIdea(id) {
    const idea = this._ideas.find((idea) => idea._id === id);
    document.dispatchEvent(new Event("openModal"));
    document.querySelector("#username").value = idea.user;
    document.querySelector("#idea-text").value = idea.title;
    document.querySelector("#idea-description").value = idea.description;
    document.querySelector("#tag").value = idea.tags;
    document.querySelector("#status").value = idea.status;
    document.querySelector("#idea-form").dataset.id = idea._id;
  }

  async updateIdeaVotes(id, upVote) {
    const idea = this._ideas.find((idea) => idea._id === id);
    if (idea.user === localStorage.getItem("username")) {
      return alert("You cannot vote on your own idea");
    }
    try {
      const res = await IdeasApi.updateIdeaVotes(id, upVote);
      this.updateIdeaInList(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas();
      this._ideas = res.data.data;
      this.render();
    } catch (error) {
      console.error(error);
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  updateIdeaInList(idea) {
    const index = this._ideas.findIndex((i) => i._id === idea._id);
    this._ideas[index] = idea;
    this.render();
  }

  async getIdea(id) {
    try {
      const res = await IdeasApi.getIdea(id);
      return res.data.data;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteIdea(id) {
    try {
      await IdeasApi.deleteIdea(id);
      this._ideas = this._ideas.filter((idea) => idea._id !== id);
      this.render();
    } catch (error) {
      console.error(error);
    }
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    return this._validTags.has(tag) ? tag : "other";
  }

  render() {
    this._ideaList.innerHTML = this._ideas
      .map((idea) => {
        const deleteBtn =
          idea.user === localStorage.getItem("username")
            ? `<button class="delete"><i class="fas fa-times"></i></button>`
            : "";
        const editBtn =
          idea.user === localStorage.getItem("username")
            ? `<button class="edit"><i class="fas fa-edit"></i></button>`
            : "";
        const upvoteBtn = `<button class="upvote"><i class="fas fa-thumbs-up"></i></button>`;
        const downvoteBtn = `<button class="downvote"><i class="fas fa-thumbs-down"></i></button>`;
        return `
      <div class="card" data-id="${idea._id}">
      <div class="status status-${idea.status}">${
          idea.status === "progress" ? "in progress" : idea.status
        }</div>
      <div class="actions">
      ${
        idea.user !== localStorage.getItem("username")
          ? `<span class="upVotes">${idea.upVotes}</span>
            <span class="downVotes">${idea.downVotes}</span>
            ${upvoteBtn}${downvoteBtn}`
          : `
          <span class="upVotes">${idea.upVotes}</span>
          <span class="downVotes">${idea.downVotes}</span>
          ${editBtn}${deleteBtn}
         `
      }
      
      </div>
      <h3 class="title">
        ${idea.title}
      </h3>
      <p class="description">${idea.description}</p>
      <p class="tag tag-${this.getTagClass(
        idea.tags
      )}">${idea.tags.toUpperCase()}</p>
      <p>
        Posted on <span class="date">${idea.date}</span> by
        <span class="author">${idea.user}</span>
      </p>
    </div>
      `;
      })
      .join("");
    this.addEventListeners();
  }
}

export default IdeaList;
