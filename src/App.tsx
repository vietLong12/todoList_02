import { Route, Router, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import LoginForm from "/src/components/LoginForm";
import PageLogin from "./components/PageLogin";
import { useSelector } from "react-redux";
import { TStateProps } from "./components/types";
import PageError from "./components/PageError/PageError";
import RegisterForm from "./components/RegisterForm/RegisterForm";

function App() {
  const isLogin = useSelector((state: TStateProps) => {
    return state.checkLogin;
  });

  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        {isLogin ? <Route path="/home" element={<PageLogin />} /> : ""}
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/*" element={<PageError />} />
      </Routes>
    </div>
  );
}

export default App;
