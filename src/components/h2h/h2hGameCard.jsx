import React, { useState, useEffect } from "react";
import h2hService from "../../services/h2hService";
import _ from "lodash";
import PageHeader from "../common/pageHeader";
import { apiImage } from "../../config.json";
import { SpinnerInfinity } from "spinners-react";
import ReactPaginate from "react-paginate";

const H2hGameCard = ({ team }) => {
  const [games, setGames] = useState();
  const [gamesData, setGamesData] = useState();
  const [perPage, setPerPage] = useState(3);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const lastH2h = async () => {
      try {
        let aGames = await h2hService.teamAllGames(team);
        setGamesData(aGames.data);
        let allGames = aGames.data.map((d) => _.flatten(d.players));
        setGames(allGames);
        setLoading(true);
        setPages(Math.floor(games.length / perPage));
      } catch (error) {
        // console.log("error1");
      }
    };
    lastH2h();
  }, [team, perPage, games ? games.length : ""]);

  let created = 0;
  let items = [];
  items = gamesData
    ? gamesData.slice(page * perPage, (page + 1) * perPage)
    : "";

  const handlePageClick = (event) => {
    let pageC = event.selected;
    setPage(pageC);
  };
  return (
    <div>
      {!games && (
        <SpinnerInfinity
          size={130}
          thickness={151}
          speed={70}
          color="rgba(252, 252, 252, 1)"
          secondaryColor="rgba(108, 20, 180, 1)"
          enabled={true}
        />
      )}
      <div className="contain">
        <PageHeader titleText="All Games" />
        <div className="row">
          {loading && (
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              pageCount={items.length % 3 === 0 ? pages + 1 : pages}
              onPageChange={handlePageClick}
              containerClassName={
                "pagination text-white justify-content-center"
              }
              activeClassName={"active"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              marginPagesDisplayed={"4"}
              // renderOnZeroPageCount={null}
            />
          )}
          {gamesData &&
            items.map((g) => (
              <div className="col-12 col-lg-4 pb-4" id="card-top">
                <ol className="statsList">
                  <li
                    id="lastGameHero"
                    className="statsHero d-flex flex-column"
                    style={{
                      backgroundImage: `url(${
                        process.env.PUBLIC_URL + "/icons/stats-card-bg2.svg"
                      })`,
                    }}
                  >
                    <span>
                      {new Date(items[created++].createdAt).toLocaleDateString(
                        "en-GB"
                      )}
                    </span>
                    <div className="stats d-flex w-100 " id="lGameP2P">
                      <p>Player 1</p>
                      <p>profit</p>
                      <p>points</p>
                      <p>points</p>
                      <p>profit</p>
                      <p>Player 2</p>
                    </div>
                  </li>
                  {g.players.map((game) => {
                    return (
                      <li
                        className="statsRow w-100"
                        key={game.name + Date.now()}
                      >
                        <div className="rowImage">
                          <img
                            src={`${apiImage}${game[0].image}`}
                            alt="player list row"
                          />
                        </div>
                        <div className="rowProfit ">{game[0].profit}</div>
                        <div className="rowProfit">{game[0].points}</div>
                        <span className="mt-3 pt-1">VS</span>
                        <div className="rowProfit">{game[1].points}</div>
                        <div className="rowProfit ">{game[1].profit}</div>
                        <div className="rowImage d-flex justify-content-center">
                          <img
                            src={`${apiImage}${game[1].image}`}
                            alt="player list row"
                          />
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default H2hGameCard;
