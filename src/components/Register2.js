import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";

const RegisterFormSchema = Yup.object().shape({
  username: Yup.string()
    .required("Please Enter a Username")
    .min(3, "Username is too short")
    .max(20, "Username is too long"),
  email: Yup.string().email().required("Please Enter an email"),
  password: Yup.string().required("Please Enter a Password").min(6).max(40),
});

const Register = (props) => {
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        email: "",
      }}
      validationSchema={RegisterFormSchema}
      onSubmit={(values) => {
        setMessage("");
        setSuccessful(false);
        AuthService.register(
          values.username,
          values.email,
          values.password
        ).then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setMessage(resMessage);
            setSuccessful(false);
          }
        );
      }}
      render={({ errors, status, touched }) => (
        <Form className="text-center">
          <div className="col-md-12">
            <div className="card card-container">
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
              />

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field
                  type="text"
                  className="form-control w-75 mx-auto"
                  name="username"
                />
                {errors.username && touched.username ? (
                  <div className="alert alert-danger w-75 mx-auto">
                    {errors.username}
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  type="text"
                  className="form-control w-75 mx-auto"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <div className="alert alert-danger w-75 mx-auto">
                    {errors.email}
                  </div>
                ) : null}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  className="form-control w-75 mx-auto"
                  name="password"
                />
                {errors.password && touched.password ? (
                  <div className="alert alert-danger w-75 mx-auto">
                    {errors.password}
                  </div>
                ) : null}
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block" type="submit">
                  <span>Register</span>
                </button>
              </div>

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Form>
      )}
    />
  );
};

export default Register;
