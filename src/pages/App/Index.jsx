import { Routes, Route } from "react-router-dom";
import "./app.scss";
import Login from "../Login/Index";
import Register from "../Register/Index";
import Todolist from "../Todolist/Index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Change_password from "../Change_password/Change_password";
import Profil from "../Profil/Index";

function App() {
  return (
    <div className="App">
      <ToastContainer limit={2} />
      <Routes>
        <Route path="/" element={<Todolist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change_password" element={<Change_password />} />
      </Routes>
    </div>
  );
}

export default App;
