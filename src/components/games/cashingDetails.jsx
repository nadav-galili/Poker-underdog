import React, { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import PageHeader from "../common/pageHeader";

const CashingDetails = ({ gameId, updated }) => {
  const [cashing, setCashing] = useState([]);
  useEffect(() => {
    const getCashingDetails = async () => {
      const fetchDetails = await gameService.fetchCashingDetails(gameId);
      setCashing(fetchDetails.data);
    };
    getCashingDetails();
  }, [updated.cashing_details.length]);

  return (
    <div className="col-10 col-lg-6 p-2">
      <PageHeader titleText="Cashing Details" />
      {cashing.length > 0 && (
        <ul className=" cashingDetails bg-white p-0">
          {cashing.map((cash) => (
            <li className="d-flex" id="cashingList">
              <p id="cashingName">{cash.playerName}</p>
              <p id="cashingAmmount">{cash.playerCashing}</p>
              <p id="cashingTime">
                {new Date(cash.time).toLocaleString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })}
              </p>
            </li>
          ))}
        </ul>
      )}
      {cashing.length < 1 && <p className="text-primary">No Cashing Yet</p>}
    </div>
  );
};

export default CashingDetails;
