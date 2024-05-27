import { delay } from "lodash";
import axios from "../untils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, image) => {
  // sumbit data

  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("api/v1/participant", data);
};

const getAllUsers = () => {
  return axios.get("api/v1/participant/all");
};

const pushDataUser = (id, username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put("api/v1/participant", data);
};

const deleteDataUser = (id) => {
  return axios.delete("api/v1/participant", { data: { id } });
};

const getUserWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postLoginUser = (email, password) => {
  return axios.post("http://localhost:8081/api/v1/login", {
    email: email,
    password: password,
    delay: 5000,
  });
};
const postResigister = (email, username, password) => {
  return axios.post("http://localhost:8081/api/v1/register", {
    email: email,
    username: username,
    password: password,
  });
};

// Quizz

const getQuizByUser = () => {
  return axios.get("api/v1/quiz-by-participant");
};

const getDataQuiz = (id) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};
export {
  postCreateNewUser,
  getAllUsers,
  pushDataUser,
  deleteDataUser,
  getUserWithPaginate,
  postLoginUser,
  postResigister,
  getQuizByUser,
  getDataQuiz,
};
