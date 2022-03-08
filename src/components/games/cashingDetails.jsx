import React, { useEffect, useState } from "react";
import gameService from "../../services/gameService";
import PageHeader from "../common/pageHeader";

const CashingDetails = ({ gameId, updated }) => {
  const [cashing, setCashing] = useState([]);

  useEffect(() => {
    const getCashingDetails = async () => {
      const fetchDetails = await gameService.fetchCashingDetails(gameId);
      console.log(fetchDetails.data);
      setCashing(fetchDetails.data);
    };
    getCashingDetails();
  }, [updated]);

  return (
    <div className="row">
      <PageHeader titleText="Cashing Details" />
      <div className="col-12 mt-0 mb-0 text-white">gggg</div>
    </div>
  );
};

export default CashingDetails;
