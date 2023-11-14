import { Formik, Field, Form, ErrorMessage } from "formik";
import s from "./loginForm.module.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLoginAction } from "../../redux/action";

interface TLoginType {
  username?: string;
  password?: string;
}
interface TResetForm {
  resetForm: () => void;
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    username: "",
    password: "",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (values: TLoginType, { resetForm }: TResetForm) => {
    if (values.username === "admin@todo.vn" && values.password === "384906") {
      resetForm();
      dispatch(checkLoginAction(true));
      navigate("/home");
    } else {
      alert("Đăng nhập không thành công");
    }
  };

  const validate = (values: TLoginType) => {
    const errors: TLoginType = {};

    if (!values.username) {
      errors.username = "Vui lòng nhập tên đăng nhập";
    }

    if (!values.password) {
      errors.password = "Vui lòng nhập mật khẩu";
    }

    return errors;
  };

  const handleForgetPassword = () => {
    alert("Tài khoản: 'admin@todo.vn' \n Mật khẩu: '384906'");
  };

  return (
    <div className={`w-25 ${s.containerLogin} mt-5 mb-5`}>
      <div className="">
        <h1 className="text-center fs-1 pt-5">Đăng nhập</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={validate}
        >
          {() => (
            <Form className={`p-4 text-start ${s.formContainer}`}>
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="username">
                  Tên đăng nhập:
                </label>
                <Field
                  className="form-control"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Nhập tài khoản của bạn"
                />
                <ErrorMessage
                  className="text-danger"
                  name="username"
                  component="div"
                />
              </div>

              <div className="mb-1">
                <label className="form-label" htmlFor="password">
                  Mật khẩu:
                </label>
                <Field
                  className="form-control"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Mời bạn nhập mật khẩu"
                />
                <ErrorMessage
                  className="text-danger"
                  name="password"
                  component="div"
                />
              </div>

              <div
                style={{ cursor: "pointer", padding: "4px" }}
                onChange={() => setShowPassword(!showPassword)}
              >
                <input
                  type="checkbox"
                  name="togglePassword"
                  id="togglePassword"
                  className="me-2"
                />
                <label htmlFor="togglePassword" style={{userSelect: "none"}}>
                  Hiện mật khẩu
                </label>
              </div>

              <div style={{ cursor: "pointer" }} onClick={handleForgetPassword}>
                <a className="text-end d-block text-decoration-none text-black">
                  Quên mật khẩu?
                </a>
              </div>
              <div>
                <button type="submit" className="btn btn-primary w-100 mt-3">
                  Đăng nhập
                </button>
              </div>
              <div className="d-flex mt-4 justify-content-center">
                <p className="mb-0 me-1">Bạn là người mới?</p>
                <Link to={"/register"}>Đăng kí tài khoản</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
