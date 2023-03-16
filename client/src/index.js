import "./style/index.css";
// import "@fortawesome/fontawesome-free/css/all.css";
import Modal from "./components/Modal";
import IdeaForm from "./components/IdeaForm";
import IdeaList from "./components/IdeaList";

new Modal();
const ideaForm = new IdeaForm();
const ideaList = new IdeaList();
ideaForm.render();
ideaList.render();
