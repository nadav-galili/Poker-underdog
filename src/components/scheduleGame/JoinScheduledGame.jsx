import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormLabel, FormControl, Button } from "react-bootstrap";
import PageHeader from "../common/pageHeader";
import { apiImage } from "../../config.json";
import Avatar from "@material-ui/core/Avatar";
import teamService from "../../services/teamService";
import scheduleGameService from "../../services/scheduleGameService";
import userService from "../../services/userService";
import SchedulaGame from "./ScheduledGame";

const JoinScheduledGame = (props) => {
  const gameid = props.match.params.teamId;
  const [game, setGame] = useState({});
  const [user, setUser] = useState({});
  const [guest, setGuest] = useState("");
  console.log(
    "🚀 ~ file: JoinScheduledGame.jsx:17 ~ JoinScheduledGame ~ guest:",
    guest
  );

  useEffect(() => {
    const fetchGame = async () => {
      const { data: game } = await scheduleGameService.getScheduledGameById(
        gameid
      );
      setGame(game);
    };
    fetchGame();

    const fetchUser = async () => {
      const me = await userService.getUserDetails();
      setUser(me.data);
    };
    fetchUser();
  }, []);
  console.log("game", game);
  useEffect(() => {
    if (game && game.guests) {
      game.guests.forEach((guest) => {
        if (guest.guestId === user._id) {
          console.log("guest", guest);
          //populate the radio button with the guest answer
          setGuest(guest);
        }
      });
    }
  }, [game, user]);

  return (
    <div className="container">
      {game.teamId && <SchedulaGame teamId={game.teamId} />}

      <Formik
        initialValues={{
          //if game.guests array has _id that equals to user._id then set guest to game.guests.guestAnswer
          guest: guest ? guest.guestAnswer : false,
        }}
        validate={(values) => {
          const errors = {};

          if (!values.guest) {
            errors.guest = "Answer is required";
          }
          return errors;
        }}
        onSubmit={async (values) => {
          // Handle form submission here
          //console.log(values);
          const answer = {
            gameDate: game.gameDate,
            hostId: game.hostId,
            teamId: game.teamId,
            teamName: game.teamName,
            guests: [
              {
                guestId: values.guest,
              },
            ],
          };
          console.log(answer);
          // const { data } = await scheduleGameService.joinScheduledGame(answer);
          // console.log(data);
          //window.location = "/scheduleGame/" + game.teamId;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="row">
              <div className="col-12 col-md-6 d-flex justify-content-center">
                <FormGroup className="d-flex flex-column my-3">
                  <FormLabel htmlFor="guest" className="goldFont">
                    Check the box to register to the game
                  </FormLabel>
                  <div className="userDetails nav-item nav-link d-flex pb-0 justify-content-center">
                    <Avatar src={`${apiImage}${user.image}`} alt={user.name} />
                    <p className="ms-2 text-primary">{user.nickName}</p>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div className="d-flex justify-content-around col-6 mt-2">
                      <Field
                        type="radio"
                        name="guest"
                        id="guest-yes"
                        className="form-check-input"
                        value="Yes"
                        checked={guest.guestAnswer === "Yes"}
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
                        checked={guest.guestAnswer === "No"}
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
                  </div>
                </FormGroup>
              </div>
            </div>
            <Button
              variant="primary"
              className="mx-auto d-block px-5"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default JoinScheduledGame;
