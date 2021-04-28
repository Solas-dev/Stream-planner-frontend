import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";

const LoginFormSchema = Yup.object().shape({
  username: Yup.string().required("Please Enter a Username"),
  password: Yup.string().required("Please Enter a Password"),
});

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={LoginFormSchema}
      onSubmit={(values) => {
        setMessage("");
        setLoading(true);
        AuthService.login(values.username, values.password).then(
          () => {
            props.history.push("/");
            window.location.reload();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setLoading(false);
            setMessage(resMessage);
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
                <button
                  className="btn btn-primary btn-block"
                  disabled={loading}
                  type="submit"
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
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

export default Login;
