import React, { useContext } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { NavLink } from "react-router-dom";
import { Context } from "../context/stateContext";

export default function SignIn() {
  const state = useContext(Context);

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .typeError("Должно быть строкой")
      .required("Обязательно"),
    email: yup.string().email("Введите email").required("Обязательно"),
  });

  return (
    <div>
      <h1>Вход</h1>
      <p>Введите свои данные</p>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validateOnBlur
        onSubmit={(values) => {
          const emailInput = document.querySelector("#email");
          const passwordInput = document.querySelector("#password");
          state.signIn(values).then(
            () => {
              state.showSignInMessage();
            },
            (e) => {
              if (e.message.indexOf("password") !== -1) {
                passwordInput.classList.add("form-input--invalid");
                window.setTimeout(() => {
                  passwordInput.classList.remove("form-input--invalid");
                }, 2000);
              } else if (e.message.indexOf("no user") !== -1) {
                emailInput.classList.add("form-input--invalid");
                window.setTimeout(() => {
                  emailInput.classList.remove("form-input--invalid");
                }, 2000);
              }
            }
          );
        }}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          dirty,
        }) => (
          <form>
            <div className="input-container">
              <input
                name="email"
                id="email"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={
                  "form-input" +
                  (errors.email && touched.email ? " form-input--invalid" : "")
                }
              />
              <span className="input-placeholder">Email</span>
            </div>

            <div className="input-container">
              <div className="show-password-container">
                <div
                  className="show-password-button"
                  onClick={(event) =>
                    event.target.nextSibling.type === "password"
                      ? (event.target.nextSibling.type = "text")
                      : (event.target.nextSibling.type = "password")
                  }
                ></div>
                <input
                  name="password"
                  id="password"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={
                    "form-input" +
                    (errors.password && touched.password
                      ? " form-input--invalid"
                      : "")
                  }
                />

                <span className="input-placeholder">Пароль</span>
              </div>
            </div>

            <button
              type="submit"
              className="form-button"
              disabled={!isValid && !dirty}
              onClick={handleSubmit}
            >
              Войти
            </button>
            <div className="link-container">
              <p className="form-text">Нет аккаунта?</p>
              <NavLink className="form-link" to="/signup" exact>
                Зарегистрироваться
              </NavLink>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
