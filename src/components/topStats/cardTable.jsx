import React, {useEffect, useState}from "react";
import gameService from "../../services/gameService";


const CardTable = ( props) => {
  const [data, setData] = useState([]);
  const [hero,setHero]=useState([]);
  const [headerTitle, setHeaderTitle]=useState("");
  const teamId=props.match.params.teamId;
  const cardName=props.match.params.cardName;




  
   console.log(headerTitle);
  useEffect(() => {
    const getTable = async () => {
      let table = await gameService.cardsData(teamId, cardName);
      table = table.data;
      let myHero=table.shift();
      // if(cardName==="avgProfit"){setHeaderTitle("Average Profit")};
      switch (cardName){
        case "avgProfit":
          setHeaderTitle("Average Profit");
          break;
          case "numOfGames":
            setHeaderTitle("Total Games");
          break;
          case "avgCashing":
            setHeaderTitle("Average  Cashing");
          break;
          case "gamesWithProfit":
            setHeaderTitle("Games With Profit");
            break;
        default:
          setHeaderTitle("Total Profit");
      }
      setHero(myHero);
      setData(table);
    };
  
    getTable();
  }, [setData, teamId, cardName]);

  return (
    <div className="container-fluid">
       <h1>{headerTitle}</h1> 
      <div className="col-lg-3 col-10" id="cardTop">
            <ul className="statsList ">
                <li className="statsHero d-flex"
                  style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/icons/stats-card-bg2.svg'})`  }} >
                    <div className="statsInfo flex-fill">
                      <div className="pos">1.</div>
                      <a href="#/" id="heroName">{data.length>0?hero._id.name:""}</a>
                    <div id="amount" className="flex-fill">{data.length>0?hero.cardTitle:""}</div>
                    </div>
                <div className="heroImage ">
                  <img src={data.length>0?hero._id.image:""} alt="" />
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
                  <div className="rowProfit">{data.length>0?player.cardTitle:""}</div>
                </li>
              
                  ))}
                </React.Fragment>
           
            </ul>
        
        </div>
      </div>
  
  );
};

export default CardTable;
