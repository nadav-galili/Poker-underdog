import React, {useEffect, useState}from "react";
import gameService from "../../services/gameService";




const CardTable = ( props) => {
  const [data, setData] = useState([]);
  const [avgprofit, setAvgprofit]=useState("");
  console.log(data);
  
  //
  const teamId=props.match.params.teamId;
  const cardName=props.match.params.cardName;
  console.log(cardName);

  useEffect(() => {
    const getTable = async () => {
      let table = await gameService.table(teamId);
      table = table.data;
     
      if (table.length > 0) {
        // const profit = await table.sort((a, b) => (a.color > b.color) ? 1 : -1);
        const avgProfit = await table.sort((a, b) => (a.avgProfit > b.avgProfit) ? 1 : -1);
        console.log("uu",avgProfit);
        const totalGames = await table.reduce((prev, current) =>
          +prev.numOfGames > current.numOfGames ? prev : current
        );
        const avgcashing = await table.reduce((prev, current) =>
          +prev.avgCashing < current.avgCashing ? prev : current
        );
  
        const successP = await table.reduce((prev, current) =>
          +prev.successPercentage > current.successPercentage ? prev : current
        );
  
        const gamesProfit = await table.reduce((prev, current) =>
          +prev.gamesWithProfit > current.gamesWithProfit ? prev : current
        );
  
        // setGamesprofit(gamesProfit);
        // setSuccess(successP);
        // setAvgcashing(avgcashing);
        // setTotalgames(totalGames);
        setAvgprofit(avgProfit);
        // setProfit(profit);
        setData(table);
      }
    };
  
    getTable();
  }, [setData, teamId]);
  return (
    <div className="container-fluid">
        <h1>League Table</h1>
      <div className="col-lg-3 col-10" id="cardTop">
            <ul className="statsList ">
                <li className="statsHero d-flex"
                  style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/icons/stats-card-bg2.svg'})`  }} >
                    <div className="statsInfo flex-fill">
                      <div className="pos">1.</div>
                      <a href="#/" id="heroName">{data.length>0?data[0]._id.name:""}</a>
                    <div id="profit" className="flex-fill">{cardName}</div>
                    <div id="amount" className="flex-fill">{data.length>0?data[0].totalProfit:""}</div>
                    </div>
                <div className="heroImage ">
                  <img src={data.length>0?data[0]._id.image:""} alt="" />
                </div>
                </li>
                <React.Fragment>
                  {data.map((player)=>(
                    <li className="statsRow d-flex" key={player._id.name}>
                  <div className="rowPos">1.</div>
                  <div className="rowImage">
                  <img src={data.length>0?player._id.image:""} alt="playr list row" />
                  </div>
                  <div className="rowName">{data.length>0?player._id.name:""}</div>
                  <div className="rowProfit">{data.length>0?player.totalProfit:""}</div>
                </li>
              
                  ))}
                </React.Fragment>
                
               
            
            </ul>
        
        </div>
      </div>
  
  );
};

export default CardTable;
