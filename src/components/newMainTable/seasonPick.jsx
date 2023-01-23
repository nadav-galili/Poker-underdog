import React, { useState, useEffect } from "react";
import gameService from "../../services/gameService";
import _ from "lodash";

const SeasonPick = ({ teamId, updateSeasonDates }) => {
    const [seasons, setSeasons] = useState({});
    const [seasonPick, setSeasonPick] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    useEffect(() => {
        async function getSeasons() {
            const { data: seasons } = await gameService.GetSeasonYears(teamId);
            setSeasons(seasons);
        }
        getSeasons();
    }, []);
    const handleSeasonPick = (e) => {
        setSeasonPick(e.target.value);
    };

    const getStartDate = (e) => {
        setStartDate(e.target.value);
    };

    const getEndDate = (e) => {
        setEndDate(e.target.value);
        // console.log("🚀 ~ file: seasonPick.jsx:30 ~ getEndDate ~ startDate", startDate);
        updateSeasonDates(startDate, e.target.value, seasonPick);
    };

    return (
        <div className="container">
            <p className="text-white text-center">Select A Season</p>
            <div className="season d-flex justify-content-center">
                <div className="col-6 mt-2">
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={handleSeasonPick}
                    >
                        {!_.isEmpty(seasons) &&
                            seasons.map((season) => (
                                <option value={season._id} key={season._id}>
                                    {season._id}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
            {seasonPick && (
                <div className="seasonDates d-flex justify-content-around">
                    <div className="seasonStartDate flex-column d-flex">
                        <p className="text-primary">Start Date</p>
                        <input
                            type="date"
                            className="w-100"
                            value={startDate || `${seasonPick}-01-01`}
                            min={`${seasonPick}-01-01`}
                            max={`${seasonPick}-12-31`}
                            onChange={(e) => getStartDate(e)}
                        />
                    </div>
                    <div className="seasonEndDate">
                        <p className="text-primary">End Date</p>
                        <input
                            type="date"
                            className="w-100"
                            value={endDate || `${seasonPick}-12-31`}
                            min={`${seasonPick}-01-01`}
                            max={`${seasonPick}-12-31`}
                            onChange={(e) => getEndDate(e)}
                        />
                        <p className="text-white">pick end date to see stats</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeasonPick;
