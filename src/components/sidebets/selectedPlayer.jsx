import React, { useState, useEffect } from "react";
import { apiImage } from "../../config.json";
import { toast } from "react-toastify";
import userService from "../../services/userService";
import sideBetsService from "../../services/sideBetsService";
import moment from "moment";
import Swal from "sweetalert2";

const SelectedPlayer = (props) => {
  const choosen = props.player;
  const teamId = props.teamId;

  const [sideBetSum, setSideBetSum] = useState("");
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2023-12-31");
  const [masterPlayer, setMasterPlayer] = useState({});

  useEffect(() => {
    const getMasterPlayer = async () => {
      let me = await userService.getUserDetails();
      delete me.data.password;
      delete me.data.email;
      setMasterPlayer(me.data);
    };

    getMasterPlayer();
  }, []);
  const getSideBetSum = (e) => {
    setSideBetSum(e.target.value);
  };
  const getStartDate = (e) => {
    setStartDate(e.target.value);
  };
  const getEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const validateSideBet = (sideBetSumAmount, startDate, endDate) => {
    if (
      sideBetSumAmount < 1 ||
      !sideBetSumAmount ||
      sideBetSumAmount === NaN ||
      !Number.isInteger(sideBetSumAmount)
    ) {
      toast.error("Side bet sum must be a number greater than 0");
      return;
    }
    if (
      !moment(startDate, "YYYY-MM-DD", true).isValid() ||
      !startDate ||
      moment(startDate).year() !== new Date().getFullYear()
    ) {
      toast.error(
        "Start date must be date in YYYY-MM-DD format and in current year"
      );
      return;
    }
    if (
      !moment(endDate, "YYYY-MM-DD", true).isValid() ||
      !endDate ||
      moment(endDate).year() !== new Date().getFullYear()
    ) {
      toast.error(
        "End date must be date in YYYY-MM-DD format and in current year"
      );
      return;
    }
    if (startDate > endDate) {
      toast.error("Start date must be before end date");
      return;
    }

    const sideBet = {
      sideBetSum: sideBetSumAmount,
      startDate: startDate,
      endDate: endDate,
      masterPlayer: masterPlayer,
      slavePlayer: choosen,
      approvedBySlavePlayer: false,
      teamId: teamId,
    };
    Swal.fire({
      title: `create a side bet with ${choosen.nickName}?`,
      imageUrl: `${apiImage}${choosen.image}`,
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: "Custom image",
      showCancelButton: true,
      confirmButtonColor: "#00a9ff",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        sideBetsService.createSideBet(sideBet);
        toast.success("Side bet created");
        window.location = `/#/main-table/${teamId}`;
      }
    });
  };

  const makeABet = () => {
    const sideBetSumAmount = parseInt(sideBetSum);
    validateSideBet(sideBetSumAmount, startDate, endDate);
  };

  const cancelBet = () => {
    window.location = `/#/side-bets/${teamId}`;
  };

  return (
    <div className="container ">
      <p className="text-center text-primary">Make A Side Bet With player</p>
      <div className="d-flex justify-content-center choosenPlayer mt-3">
        <img src={`${apiImage}${choosen.image}`} alt="" />
      </div>
      <p className="selectedSideBet text-center">{choosen.nickName}</p>
      <div className="sideBetSum d-flex justify-content-center m-2">
        <p className="text-primary pe-2">$ Bet Sum:</p>
        <input
          type="number"
          className="w-25"
          value={sideBetSum}
          placeholder="Enter sum"
          onChange={(e) => getSideBetSum(e)}
        />
      </div>
      <div className="datesSideBets">
        <div className="d-flex flex-column justify-content-center">
          <p className="text-primary pe-2 text-center">Start Date:</p>
          <span className="text-center">Format: 'MM/DD/YYY'</span>
          <div className="startDAte d-flex justify-content-center">
            <input
              type="date"
              className="w-50"
              value={startDate}
              min="2023-01-01"
              onChange={(e) => getStartDate(e)}
            />
          </div>
          <p className="text-primary pe-2 text-center">End Date</p>
          <span className="text-center">Format: 'MM/DD/YYY'</span>

          <div className="endDate d-flex justify-content-center">
            <input
              type="date"
              className="w-50"
              value={endDate}
              max="2023-12-31"
              onChange={(e) => getEndDate(e)}
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-danger" onClick={cancelBet}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={makeABet}>
          Make A Bet
        </button>
      </div>
      <div className="rules py-3">
        <p className="text-center text-primary mt-3 ">
          <b>
            <u>Rules For Side Bets:</u>
          </b>
        </p>
        <ul>
          <li>
            You can choose the sum of side bet and the start and end date of the
            bet (default is january 1st 2023 to december 31st 2023)
          </li>
          <li>
            After you click 'Make A Bet', the second player will see a
            notification about your side bet in the app (in the 'Side Bet'
            section) and will have to accept it. If he accepts, the side bet
            will be created and you will be able to see it in the 'Side Bets'
            section.
          </li>
          <li>
            If the second player doesn't accept the side bet, the side bet is
            cancelled.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SelectedPlayer;
