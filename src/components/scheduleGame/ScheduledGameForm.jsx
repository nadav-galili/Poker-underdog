import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormLabel, FormControl, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import PageHeader from "../common/pageHeader";
import { apiImage } from "../../config.json";
import Avatar from "@material-ui/core/Avatar";
import teamService from "../../services/teamService";
import userService from "../../services/userService";
import scheduleGameService from "../../services/scheduleGameService";

const SchedulaGameForm = (props) => {
  const teamId = props.match.params.teamId;
  const [team, setTeam] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const getTeam = async () => {
      const { data: team } = await teamService.newGetTeam(teamId);
      setTeam(team);
    };
    getTeam();
    const fetchUser = async () => {
      const me = await userService.getUserDetails();
      setUser(me.data);
    };
    fetchUser();
  }, []);
  return (
    //put team image here
    <div className="container pb-3">
      <PageHeader titleText="Schedule Game" />

      <Formik
        initialValues={{
          date: "",
          host: "TBA",
          guest: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.date) {
            errors.date = "Date is required";
          }

          if (!values.guest) {
            errors.guest = "Answer is required";
          }
          return errors;
        }}
        onSubmit={async (values) => {
          // Handle form submission here
          //console.log(values);
          const answer = {};
          answer.gameDate = values.date;
          answer.hostId = values.host ? values.host : "TBA";
          answer.teamId = teamId;
          answer.teamName = team.name;
          answer.teamImage = team.teamImage;
          answer.guests = [];
          const guest1 = {};
          guest1.guestId = user._id;
          guest1.guestAnswer = values.guest;
          answer.guests.push(guest1);

          const { data } = await scheduleGameService.saveNewScheduledGame(
            answer
          );
          if (data._id) {
            toast.success("Game Scheduled Successfully");
            props.history.push(`/scheduledGame/${teamId}`);
          } else {
            toast.error("Something went wrong");
          }
        }}
      >
        <div className="row">
          <div
            className="logoContainer w-50 h-50  d-flex  mx-auto mt-2"
            id="logoContainer"
          >
            <img
              src={`${apiImage}${team.teamImage}`}
              alt="teamLogo"
              className="h-100 w-100 "
            />
          </div>
          <div className="col-12 d-flex justify-content-center">
            <Form>
              <FormGroup className="d-flex flex-column">
                <FormLabel htmlFor="date" className="goldFont">
                  Pick A Date
                </FormLabel>
                <Field
                  type="date"
                  name="date"
                  id="date"
                  className="form-control"
                  min={new Date().toISOString().split("T")[0]}
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-danger"
                />
              </FormGroup>
              <FormGroup className="d-flex flex-column">
                <FormLabel htmlFor="date" className="goldFont">
                  Choose a host
                </FormLabel>
                <Field as="select" name="host" id="host">
                  <option value="">Decide later...</option>
                  {team.players &&
                    team.players.map((player) => (
                      <option key={player._id} value={player._id}>
                        {player.nickName}
                      </option>
                    ))}
                </Field>
                <ErrorMessage
                  name="host"
                  component="div"
                  className="text-danger"
                />
              </FormGroup>
              <FormGroup className="d-flex flex-column my-3">
                <FormLabel htmlFor="guest" className="goldFont">
                  Check the box to register to the game
                </FormLabel>
                <div className="userDetails nav-item nav-link d-flex pb-0">
                  <Avatar src={`${apiImage}${user.image}`} alt={user.name} />
                  <p className="ms-2 text-primary">{user.nickName}</p>
                </div>
                <div className="d-flex justify-content-around col-6 mt-2">
                  <Field
                    type="radio"
                    name="guest"
                    id="guest-yes"
                    className="form-check-input"
                    value="Yes"
                  />
                  <label
                    htmlFor="guest-yes"
                    className="text-success bg-white px-2"
                  >
                    Yes
                  </label>
                  <Field
                    type="radio"
                    name="guest"
                    id="guest-no"
                    className="form-check-input"
                    value="No"
                  />
                  <label
                    htmlFor="guest-no"
                    className="text-danger bg-white px-2"
                  >
                    No
                  </label>
                </div>
                <ErrorMessage
                  name="guest"
                  component="div"
                  className="text-danger"
                />
              </FormGroup>

              <Button type="submit" color="primary">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </Formik>
    </div>
  );
};

export default SchedulaGameForm;
