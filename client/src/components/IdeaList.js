import IdeasApi from "../services/IdeasApi";

class IdeaList {
  constructor() {
    this._ideaList = document.querySelector("#idea-list");

    this.getIdeas();
    this._ideas = [
      {
        _id: 1,
        title: "first idea",
        description: "This is a test",
        tags: "technology",
        status: "new",
        user: "mat",
        date: "2018-01-01",
      },
      {
        _id: 2,
        title: "second idea",
        description: "This is a test 2",
        tags: "test",
        status: "new",
        user: "mat",
        date: "2020-01-01",
      },
      {
        _id: 3,
        title: "third idea",
        description: "This is a test 3",
        tags: "business",
        status: "new",
        user: "mat",
        date: "2022-01-01",
      },
    ];
    this._validTags = new Set();
    this._validTags.add("technology");
    this._validTags.add("software");
    this._validTags.add("business");
    this._validTags.add("education");
    this._validTags.add("health");
    this._validTags.add("inventions");
  }

  addEventListeners() {
    this._ideaList.addEventListener("click", (e) => {
      console.log(e.target);
      if (e.target.classList.contains("fa-times")) {
        e.stopImmediatePropagation();
        const id = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(id);
      }
    });
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
        return `
      <div class="card" data-id="${idea._id}">
      ${deleteBtn}
      <h3>
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
