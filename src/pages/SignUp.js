import React, { useContext } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { NavLink } from "react-router-dom";
import { IMaskInput } from "react-imask";
import { Context } from "../context/stateContext";

export default function SignUp() {
  const state = useContext(Context);

  const validationSchema = yup.object().shape({
    name: yup.string().typeError("Должно быть строкой").required("Обязательно"),
    nickName: yup
      .string()
      .typeError("Должно быть строкой")
      .required("Обязательно"),
    password: yup
      .string()
      .typeError("Должно быть строкой")
      .min(6, "Пароль должен содержать не менее 6 мимволов")
      .max(20, "Пароль должен содержать не более 20 символов")
      .matches(
        `((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{6,20})`,
        "Пароль должен содержать большие и маленькие буквы латинского алфавита, цифры и спец символы"
      )
      .required(
        "Пароль должен содержать большие и маленькие буквы латинского алфавита, цифры и спец символы"
      ),
    email: yup.string().email("Введите верный email").required("Обязательно"),
    phone: yup.string().required("Обязательно").min(16),
    agreement: yup
      .boolean()
      .required("Обязательно")
      .oneOf([true], "Требуется подтверждение"),
  });

  return (
    <div className={"sign-up-container"}>
      <h1>Регистрация</h1>
      <p>Введите свои данные</p>
      <Formik
        initialValues={{
          name: "",
          nickName: "",
          email: "",
          phone: "",
          password: "",
          agreement: false,
        }}
        validateOnBlur
        onSubmit={(values) => {
          state.signUp(values).then(
            () => {
              state.showSignUpMessage();
              window.setTimeout(() => {
                window.location.assign("/");
              }, 2000);
            },
            (e) => {
              const emailErrorMessage = document.querySelector(
                ".input-error-message--email"
              );
              emailErrorMessage.style.display = "block";
              window.setTimeout(() => {
                emailErrorMessage.style.display = "none";
              }, 2000);
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
                name="name"
                id="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className={
                  "form-input" +
                  (errors.name && touched.name ? " form-input--invalid" : "")
                }
              />
              <span className="input-placeholder">Имя</span>
            </div>

            <div className="input-container">
              <input
                name="nickName"
                id="nickname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nickName}
                className={
                  "form-input" +
                  (errors.nickName && touched.nickName
                    ? " form-input--invalid"
                    : "")
                }
              />
              <span className="input-placeholder">Никнейм</span>
            </div>

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

            <div className="input-error-message input-error-message--email">
              Такой email уже существует
            </div>

            <div className="input-container">
              <IMaskInput
                value={values.phone}
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                onAccept={(value, mask) => {
                  values.phone = value;
                }}
                mask={"+{7}(000)000-00-00"}
                placeholderChar={"_"}
                className={
                  "form-input" +
                  (errors.phone && touched.phone ? " form-input--invalid" : "")
                }
              />
              <span className="input-placeholder">Телефон</span>
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

            {touched.password && errors.password && (
              <p className={"input-error-message"}>{errors.password}</p>
            )}
            <label
              className={
                "checkbox-container " +
                "container" +
                (errors.agreement && touched.agreement
                  ? " form-input--invalid"
                  : "")
              }
            >
              <input
                placeholder="Пароль"
                name="agreement"
                id="agreement"
                type="checkbox"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.agreement}
              />
              <span className="checkmark"></span>Я даю свое согласие на
              обработку персональных данных
            </label>
            <button
              type="submit"
              className="form-button"
              disabled={!isValid && !dirty}
              onClick={handleSubmit}
            >
              Зарегистрироваться
            </button>
            <div className="link-container">
              <p className="form-text">Есть аккаунт?</p>
              <NavLink className="form-link" to="/" exact>
                Войти
              </NavLink>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
