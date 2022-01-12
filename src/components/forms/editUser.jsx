import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PageHeader from "../common/pageHeader";
import * as Yup from "yup";
// import http from "../../services/httpService";
import { apiUrl } from "../../config.json";
import { toast } from "react-toastify";
import userService from "../../services/userService";
import { apiImage } from "../../config.json";
import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  nickName: Yup.string().required("Required"),
  image: Yup.string(),
});

const EditUser = () => {
  const [me, setMe] = useState({});
  useEffect(() => {
    const meData = async () => {
      let getUser = await userService.getUserDetails();
      getUser = getUser.data;
      setMe(getUser);
    };
    meData();
  }, []);

  const onSubmit = async (values, onSubmitProps) => {
  
    onSubmitProps.setSubmitting(false);
    let data = new FormData();
    data.append("_id", values._id);
    data.append("nickName", values.nickName);
    
    if (values.image) {
      data.append("image", values.image);
    }
    
    try {
      // if (!values.image) delete values.image;
      await userService.editUserForUpdate(values, data)
       window.location = `#/my-stats/${values._id}`;
      toast("The user has been updated!");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setErrors({ email: "Something went wrong" });
        console.error(ex);
      }
    }
  };

  const initialValues = {
    nickName: "",
    image: "",
    _id: "",
  };
  const savedValues = {
    nickName: me.nickName,
    image: me.image,
    _id: me._id,
  };

  const [errors, setErrors] = useState({ nickName: "", image: "" });
  const [fields, setFields] = useState(initialValues);
  const [formValues, setFormValues] = useState(savedValues);

  return (
    <div className="container">
      <PageHeader titleText="Edit User" />
      <Formik
        enableReinitialize
        initialValues={savedValues||fields}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => {
          return (
            <div className="row mt-2">
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
                  <div className="oldImage w-25 mb-2 ">
                    <img
                      src={`${apiImage}${savedValues.image}`}
                      alt="user"
                      className="w-100 h-100"
                    />
                  </div>
                  <div className="form-control d-flex flex-column bg-primary mb-3">
                    <label htmlFor="image">Change Image</label>
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
                  <div className="buttons d-flex justify-content-between">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={!formik.isValid || formik.isSubmitting}
                    >
                      Update Details
                    </button>
                    <Link
                      type="button"
                      className="btn btn-secondary  m-0"
                      to={`/my-stats/${me._id}`}
                    >
                      Not right now
                    </Link>
                  </div>
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
