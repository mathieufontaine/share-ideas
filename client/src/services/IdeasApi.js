import axios from "axios";

class IdeasApi {
  constructor() {
    this._apiUrl = "/api/ideas";
  }

  getIdeas() {
    return axios.get(this._apiUrl);
  }

  getIdea(id) {
    return axios.get(`${this._apiUrl}/${id}`);
  }

  createIdea(idea) {
    return axios.post(this._apiUrl, idea);
  }

  updateIdea(id, idea) {
    return axios.put(`${this._apiUrl}/${id}`, idea);
  }

  updateIdeaVotes(id, upVote) {
    return axios.put(`${this._apiUrl}/${id}/votes`, {
      vote: upVote,
      user: localStorage.getItem("username"),
    });
  }

  deleteIdea(id) {
    const user = localStorage.getItem("username") || "";
    return axios.delete(`${this._apiUrl}/${id}`, { data: { user } });
  }
}

export default new IdeasApi();
