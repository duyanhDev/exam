import { Routes, Route } from "react-router-dom";
import App from "./App";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import HomPage from "./components/Home/HomePage";
import DashBoar from "./components/Admin/Content/DashBoar";
import ManageUsers from "./components/Admin/Content/ManageUser";
import Login from "./components/Auth/Login";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Auth/Register";
import LisQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import Questions from "./components/Admin/Content/Question/Questions";
import PrivateRouter from "./routers/PrivateRoute";
import React, { Suspense } from "react";
import Profile from "./components/User/Profile/Profile";

const NotFound = () => {
  return (
    <div class="container mt-3 alert alert-danger" role="alert">
      A simple dark alert—check it out!
    </div>
  );
};

const Layout = (props) => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomPage />} />
          <Route
            path="/users"
            element={
              <PrivateRouter>
                <LisQuiz />
              </PrivateRouter>
            }
          />
        </Route>
        <Route path="quiz/:id" element={<DetailQuiz />} />

        <Route
          path="/admins"
          element={
            <PrivateRouter>
              <Admin />
            </PrivateRouter>
          }
        >
          <Route index element={<DashBoar />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manage-quizzes" element={<ManageQuiz />} />
          <Route path="manage-questions" element={<Questions />} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/test" element={<PrivateRouter />}></Route>
        <Route path="/profile/:user" element={<Profile />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      {/* Same as */}
      <ToastContainer />
    </Suspense>
  );
};

export default Layout;
