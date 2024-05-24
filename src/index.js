import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import HomPage from "./components/Home/HomePage";
import DashBoar from "./components/Admin/Content/DashBoar";
import ManageUsers from "./components/Admin/Content/ManageUser";
import Login from "./components/Auth/Login";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomPage />} />
            <Route path="/users" element={<User />} />
          </Route>
          <Route path="/admins" element={<Admin />}>
            <Route index element={<DashBoar />} />
            <Route path="manage-users" element={<ManageUsers />} />
          </Route>
          <Route path="/login" element={<Login />}></Route>
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
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
