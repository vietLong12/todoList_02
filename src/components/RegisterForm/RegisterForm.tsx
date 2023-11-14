import { Formik, Field, Form, ErrorMessage } from "formik";
import s from "./regForm.module.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLoginAction } from "../../redux/action";

interface TLoginType {
  username?: string;
  password?: string;
  rePassword?: string;
}
interface TResetForm {
  resetForm: () => void;
}

const LoginForm = () => {
  const initialValues = {
    username: "",
    password: "",
    rePassword: "",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (values: TLoginType) => {
    console.log(
      `Đăng ký thành công!!! \n username: ${values.username} \n mật khẩu: ${values.password}`
    );
  };

  const validate = (values: TLoginType) => {
    const errors: TLoginType = {};

    if (!values.username) {
      errors.username = "Vui lòng nhập tên đăng nhập";
    }

    if (!values.password) {
      errors.password = "Vui lòng nhập mật khẩu";
    }
    if (values.password.length < 4 || values.password.length > 8) {
      errors.password = "Vui lòng nhập mật khẩu có độ dài từ 4 đến 8 kí tự!";
    }
    if(values.rePassword !=  values.password) {
      errors.rePassword = "Mật khẩu không khớp!"
    }

    return errors;
  };

  return (
    <div className={`w-lg-25 ${s.containerLogin} mt-5 mb-5`}>
      <div className="">
        <h1 className="text-center fs-1 pt-5">Đăng ký</h1>
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

              <div className="mb-3">
                <label className="form-label" htmlFor="password">
                  Mật khẩu:
                </label>
                <Field
                  className="form-control"
                  type="password"
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

              <div className="form-group mb-1">
                <label className="form-label" htmlFor="rePassword">
                  Nhập lại mật khẩu:
                </label>
                <Field
                  className="form-control"
                  type="password"
                  id="rePassword"
                  name="rePassword"
                  placeholder="Nhập lại mật khẩu của bạn"
                />
                <ErrorMessage
                  className="text-danger"
                  name="rePassword"
                  component="div"
                />
              </div>

              <div>
                <button type="submit" className="btn btn-warning w-100 mt-3">
                  Đăng ký
                </button>
              </div>
              <div className="d-flex mt-4 justify-content-center">
                <p className="mb-0 me-1">Bạn đã có tài khoản?</p>
                <Link to={"/"}>Đăng nhập</Link>
              </div>
              <div className="d-flex mt-4 justify-content-center">
                <p className="mb-0 me-1">Bạn muốn trải nghiệm thử?</p>
                <Link to={"/trial"}>Bấm để thử</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
