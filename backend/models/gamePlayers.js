const Joi = require("@hapi/joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;


const gamePlayersSchema = new mongoose.Schema(
  {
      player_id:{
          type:String,
         
      },
      
    profit: {
      type: Number,
      required: true,
      default:0
    },
    cashing: {
      type: Number,
    //   min: 50,
      required: true,
      default:0
    },
    numOfCashing: { type: Number, required: true,  default:0 },
    cashInHande: {
      type: Number,
      required: true,
      min: 0,
      default:0

    },
    gameRank: { type: Number, min: 1, max: 10 },
    tableRank: {
      type: Number,
    //   min: 1,
    },
    game:{
        type:Schema.Types.ObjectId,
        ref:"Games"
    }
  },
  { timestamps: true }
);

const GamePlayers = mongoose.model("gamePlayers", gamePlayersSchema);
exports.GamePlayers = GamePlayers;
