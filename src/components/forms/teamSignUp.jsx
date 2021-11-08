import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PageHeader from "../common/pageHeader";
import * as Yup from "yup";
import http from "../../services/httpService";
import { apiUrl } from "../../config.json";
import { toast } from "react-toastify";
import userService from "../../services/userService";
// import { toast } from "react-toastify";
 import { Link } from "react-router-dom";
import teamService from "../../services/teamService";
// import teamService from "../services/teamService";

const initialValues = {
  teamName: "",
  teamImage: "",
};

const validationSchema=Yup.object({
    teamName:Yup.string().min(2, "name must be min 2 chars").required("required"),
    teamImage:Yup.string()
})
const TeamSignUp = () => {
    const [errors, setErrors] = useState({ image: "" });
    const [teamDetails, setTeamDetails]=useState({name:"",players:[], teamImage:"" })

    useEffect(()=>{
        const player=async()=>{
            let user=await userService.getUserDetails();
            delete user.data.password;
            let details={...teamDetails}
            details.players.push(user.data);
            setTeamDetails(details)
        };
        player()
    }, [])
    const onSubmit=async(values, onSubmitProps)=>{
        onSubmitProps.setSubmitting(false);
        
        let data= new FormData();
        data.append("name", values.teamName);
        if(values.image){
            data.append("image", values.image)
        }
        // data.append("players",JSON.stringify(teamDetails.players))
         data.players=teamDetails.players;
        //  if (!data.image) delete data.image;
          await teamService.createTeam(data );
    }

  return (
    <div className="container">
      <PageHeader titleText="Team Registration Form" />
      <p className="start">Start a new team</p>
      <div className="row">
        <div className="col-lg-6 col-12">
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
                        <label htmlFor="Team Name">Team Name</label>
                        <Field type="text" id="teamName" name="teamName" />
                        <ErrorMessage
                          name="teamName"
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
                            formik.setFieldValue(
                              "image",
                              event.target.files[0]
                            );
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
                  <Link
                className="btn btn-info ms-3"
                type="button"
                to="/my-teams"
              >
                Do it later
              </Link>
                    </Form>
                  </div>
                </div>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default TeamSignUp;
