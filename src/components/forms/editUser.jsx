import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PageHeader from "../common/pageHeader";
import * as Yup from "yup";
import http from "../../services/httpService";
import { apiUrl } from "../../config.json";
import { toast } from "react-toastify";
import userService from "../../services/userService";




const validationSchema = Yup.object({
  nickName: Yup.string().required("Required"),
  image: Yup.string(),
  email: Yup.string().email("Invaild email format").required("Required"),
});

const EditUser = () => {

  const [me, setMe]=useState({})
  useEffect(()=>{
    const meData=async ()=>{
      let getUser=await userService.getUserDetails();
      console.log(getUser,"sdsd");
      getUser=getUser.data;
      setMe(getUser);
      console.log(me,"pp");

    }
    meData()
  },[])

  const onSubmit = async (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    let data = new FormData();
    data.append("nickName", values.nickName);
    if (values.image) {
      data.append("image", values.image);
    }

    try {
      if (!values.image) delete values.image;
    //   ecter new query
    //   await http.post(`${apiUrl}/users`, data);

        //  await userService.login(values.email, values.password);
      // window.location = "/";
      // toast("A new acoount is opened");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setErrors({ email: "Something went wrong" });
        console.error(ex);
      }
    }
  };

  const initialValues = {
    nickName: me.nickName,
    image: "",
  };
  const [errors, setErrors] = useState({ email: "", image: "" });
  const [fields, setFields] = useState(initialValues);

  return (
    <div className="container">
      <PageHeader titleText="Edit User"/>
      <Formik
        enableReinitialize
        initialValues={fields}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => {
          return (
            <div className="row mt-4">
              <div className="col-10 col-lg-4">
                <Form>
                  <div className="form-control d-flex flex-column  bg-primary">
                    <label htmlFor="Nick Name">Nick Name</label>
                    <Field type="text" id="nickName" name="nickName" />
                    <ErrorMessage
                      name="nickName"
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

export default EditUser;
