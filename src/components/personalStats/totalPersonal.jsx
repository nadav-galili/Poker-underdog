import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import PageHeader from "../common/pageHeader";
const TotalPersonal = ({ details }) => {
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    const getGames = () => {
      setPages(Math.floor(details.length / perPage));
    };
    getGames();
  }, [details.length, perPage]);
  let items = [];
  items = details ? details.slice(page * perPage, (page + 1) * perPage) : "";

  const handlePageClick = (event) => {
    let pageC = event.selected;
    setPage(pageC);
  };

  return (
    <div className="allPersonal mt-2">
      <PageHeader titleText="All Games"/>
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        pageCount={items.length%10===0?pages+1:pages}
        onPageChange={handlePageClick}
        containerClassName={"pagination text-white justify-content-center"}
        activeClassName={"active"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
      />
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
            {items.map((d) => (
              <li
                className="statsRow w-100 d-flex justify-content-between"
                id="personalDetails"
                key={new Date(d.createdAt)}
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
    </div>
  );
};

export default TotalPersonal;
