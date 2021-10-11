import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
  image:""
};




const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  nickName: Yup.string().required("Required"),
  email: Yup.string().email("Invaild email format").required("Required"),
  password: Yup.string()
    .min(6, "Password must be min 6 chars")
    .required("Required"),
});

const SignUp = (props) => {
    const [formData, setFormData]=useState({});
    const onSubmit =async (values, onSubmitProps) => {
        console.log("form f", values);
        onSubmitProps.setSubmitting(false);
        setFormData(values);
        console.log("ffff", formData);
      //   let data=new FormData();
      //   data.append('image', values.image);
      //   console.log("D", data);
      //   return fetch(url, {method, headers, body})
   
   
        try {
          if (!values.image) delete values.image;
          await http.post(`${apiUrl}/users`, values);
          await userService.login(values.email, values.password);
          window.location = "/";
          toast("A new acoount is opened");
        } catch (ex) {
          if (ex.response && ex.response.status === 400) {
            // this.setState({ errors: { email: "Email is taken" } });
            console.error(ex)
          }
        }
      };
      
  return (
    <div className="container-fluid">
      <h1>Sign Up Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => {
          return (
         <div className="row">
             <div className="col-10 col-lg-4">
             <Form >
                <div className="form-control row">
                  <label htmlFor="First Name">First Name</label>
                  <Field type="text" id="firstName" name="firstName"  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-control row">
                  <label htmlFor="Last Name">Last Name</label>
                  <Field type="text" id="lastName" name="lastName"  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-control row">
                  <label htmlFor="Nick Name">Nick Name</label>
                  <Field type="text" id="nickName" name="nickName" />
                  <ErrorMessage
                    name="nickName"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-control row">
                  <label htmlFor="email">E-mail</label>
                  <Field type="email" id="email" name="email" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-control row mb-4">
                  <label htmlFor="password">Password</label>
                  <Field type="password" id="password" name="password" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>

                <input
                className="row ps-2 mb-4"
                type="file"
                name="image"
                onChange={(event)=>{
                    formik.setFieldValue("image", event.target.files[0])
                }}
                ></input>

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
