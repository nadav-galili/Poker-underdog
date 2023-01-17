import React, { useState, useEffect } from "react";
import gameService from "../../services/gameService";
import SingleGame from "./singleGame";
import ReactPaginate from "react-paginate";

const AllGamesList = ({ teamId }) => {
  const [allGames, setAllGames] = useState([]);
  const [page, setPage] = useState(1);
  console.log("🚀 ~ file: allGamesList.jsx:9 ~ AllGamesList ~ page", page);
  const pagination = 3;
  useEffect(() => {
    async function getAllGames() {
      const { data: allGames } = await gameService.getAllGamesByTeam(
        teamId,
        pagination,
        page
      );
      setAllGames(allGames);
    }
    getAllGames();
  }, [page]);

  const handlePageClick = (event) => {
    let pageC = event.selected + 1;
    pageC === 0 ? setPage(1) : setPage(pageC);
  };
  return (
    <div className="container">
      <h2 className="allGamesTitle text-center">All Games</h2>
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        pageCount={allGames.length % pagination === 0 ? page + 1 : page}
        onPageChange={handlePageClick}
        containerClassName={"pagination text-white justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
      />
      {allGames.length > 0 &&
        allGames.map((game) => <SingleGame game={game} key={game._id} />)}
    </div>
  );
};

export default AllGamesList;
