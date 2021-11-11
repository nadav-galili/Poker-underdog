import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PageHeader from "../common/pageHeader";
import * as Yup from "yup";
import http from "../../services/httpService";
import { apiUrl } from "../../config.json";
import { toast } from "react-toastify";
import userService from "../../services/userService";
import { Redirect } from "react-router-dom";

const initialValues = {
  firstName: "",
  lastName: "",
  nickName: "",
  email: "",
  password: "",
  image: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  nickName: Yup.string().required("Required"),
  image: Yup.string(),
  email: Yup.string().email("Invaild email format").required("Required"),
  password: Yup.string()
    .min(6, "Password must be min 6 chars")
    .required("Required"),
});

const SignUp = (props) => {
  const onSubmit = async (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    let data = new FormData();
    data.append("firstName", values.firstName);
    data.append("lastName", values.lastName);
    data.append("nickName", values.nickName);
    data.append("email", values.email);
    data.append("password", values.password);
    if(values.image){
      data.append("image", values.image);
    }
 

    console.log(data);

    try {
      if (!values.image) delete values.image;
      await http.post(`${apiUrl}/users`, data);
      await userService.login(values.email, values.password);
      window.location = "/my-teams";
      toast("A new acoount is opened");
      console.log("try");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setErrors({ email: "This email is taken" });
        console.error(ex);
      }
    }
  };

  const [errors, setErrors] = useState({ email: "", image: "" });
  if (userService.getCurrentUser()) return <Redirect to="/" />;
  return (
    <div className="container">
      <PageHeader titleText="Sign Up" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => {
          return (
            <div className="row mt-4">
              <div className="col-10 col-lg-4">
                <Form>
                  <div className="form-control d-flex flex-column bg-primary">
                    <label htmlFor="First Name">First Name</label>
                    <Field type="text" id="firstName" name="firstName" />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="form-control d-flex flex-column  bg-primary">
                    <label htmlFor="Last Name">Last Name</label>
                    <Field type="text" id="lastName" name="lastName" />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="form-control d-flex flex-column  bg-primary">
                    <label htmlFor="Nick Name">Nick Name</label>
                    <Field type="text" id="nickName" name="nickName" />
                    <ErrorMessage
                      name="nickName"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="form-control d-flex flex-column  bg-primary">
                    <label htmlFor="email">E-mail</label>
                    <Field type="email" id="email" name="email" />
                    <span className="error">{errors.email}</span>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="form-control d-flex flex-column    bg-primary mb-3">
                    <label htmlFor="password">Password</label>
                    <Field type="password" id="password" name="password" />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="form-control d-flex flex-column bg-primary mb-3">
                    <label htmlFor="image">Image</label>
                    <input
                      className="row mb-4 inputFile"
                      type="file"
                      name="image"
                      onChange={(event) => {
                        formik.setFieldValue("image", event.target.files[0]);
                      }}
                    ></input>
                    <span className="error">{errors.image}</span>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    Submit
                  </button>
                </Form>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default SignUp;
