import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormLabel, FormControl, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { apiImage } from "../../config.json";
import Avatar from "@material-ui/core/Avatar";
import scheduleGameService from "../../services/scheduleGameService";
import userService from "../../services/userService";
import SchedulaGame from "./ScheduledGame";

const JoinScheduledGame = (props) => {
  const gameid = props.match.params.teamId;
  const [game, setGame] = useState({});
  console.log(
    "🚀 ~ file: JoinScheduledGame.jsx:14 ~ JoinScheduledGame ~ game:",
    game
  );
  const [user, setUser] = useState({});
  const [guest, setGuest] = useState("");

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
  useEffect(() => {
    if (game && game.guests) {
      game.guests.forEach((guest) => {
        if (guest.guestId === user._id) {
          //populate the radio button with the guest answer
          setGuest(guest);
        } else {
          setGuest([{ guestAnswer: "" }]);
        }
      });
    }
  }, [game, user]);

  return (
    <div className="container">
      {game.teamId && <SchedulaGame teamId={game.teamId} />}
      {guest && (
        <Formik
          initialValues={{
            //check the radio button with the guest answer
            guest: guest ? guest.guestAnswer : undefined,
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
              guestAnswer: values.guest,
              guestId: user._id,
              gameId: game._id,
            };

            const { data } = await scheduleGameService.updateScheduledGame(
              answer
            );

            if (data) {
              toast.success("Your answer was saved successfully");
              props.history.push(`/scheduledGame/${game.teamId}`);
            } else {
              toast.error("Something went wrong");
            }
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
                      <Avatar
                        src={`${apiImage}${user.image}`}
                        alt={user.name}
                      />
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
                    </div>
                    <Button
                      variant="primary"
                      className="mx-auto d-block px-5 mt-3"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </FormGroup>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default JoinScheduledGame;
