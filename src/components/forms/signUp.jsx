import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  fname: "",
  lname: "",
  nname: "",
  email: "",
  password: "",
};

const onSubmit = (values, onSubmitProps) => {
  console.log("form f", values);
  onSubmitProps.setSubmitting(false);
};

const validationSchema = Yup.object({
  fname: Yup.string().required("Required"),
  lname: Yup.string().required("Required"),
  nname: Yup.string().required("Required"),
  email: Yup.string().email("Invaild email format").required("Required"),
  password: Yup.string()
    .min(6, "Password must be min 6 chars")
    .required("Required"),
});

const SignUp = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount
    >
      {(formik) => {
        return (
          <Form>
            <div className="form-control">
              <label htmlFor="First Name">First Name</label>
              <Field type="text" id="fname" name="fname" />
              <ErrorMessage name="fname" component="div" className="error" />
            </div>

            <div className="form-control">
              <label htmlFor="Last Name">Last Name</label>
              <Field type="text" id="lname" name="lname" />
              <ErrorMessage name="lname" component="div" className="error" />
            </div>

            <div className="form-control">
              <label htmlFor="Nick Name">Nick Name</label>
              <Field type="text" id="nname" name="nname" />
              <ErrorMessage name="nname" component="div" className="error" />
            </div>

            <div className="form-control">
              <label htmlFor="email">E-mail</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-control">
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={!formik.isValid || formik.isSubmitting }
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignUp;
