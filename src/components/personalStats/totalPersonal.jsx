import React from "react";




const TotalPersonal = ({ details }) => {
  return (
    <div className="col-lg-4 col-11 mt-4 ">
      <div id="card-top">
        <ol className="statsList mb-0">
          <li
            id="gameLi"
            className="statsHero d-flex"
            style={{
              backgroundImage: `url(${
                process.env.PUBLIC_URL + "/icons/stats-card-bg2.svg"
              })`,
            }}
          >
            <div
              className="gameH2h d-flex w-100 justify-content-between"
              id="personalheader"
            >
              <div className="headerDetails ms-2">Date</div>
              <div className="headerDetails">Team Name</div>
              <div className="headerDetails">Cashing</div>
              <div className="headerDetails">Num Of Cashing</div>
              <div className="headerDetails">Game Rank</div>
              <div className="headerDetails">Profit</div>
            </div>
          </li>
          {details.map((d) => (
            <li
              className="statsRow w-100 d-flex justify-content-between"
              id="personalDetails" key={new Date(d.createdAt)}
            >
              <div className="rowPlayerDetails ms-1">
                {new Date(d.createdAt).toLocaleDateString("en-GB")}
              </div>
              <div className="rowPlayerDetails">{d.team_name}</div>
              <div className="rowPlayerDetails">{d.players.cashing}</div>
              <div className="rowPlayerDetails">{d.players.numOfCashing}</div>
              <div className="rowPlayerDetails">{d.players.gameRank}</div>
              <div
                className={
                  d.players.profit > 0
                    ? "rowPlayersDetails text-success"
                    : "rowPlayersDetails text-danger"
                }
              >
                {d.players.profit}
              </div>
            </li>
          ))}
        </ol>
      </div>
    
    </div>
  );
};

export default TotalPersonal;
