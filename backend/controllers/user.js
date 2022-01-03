const _ = require("lodash");
const { User, validate } = require("../models/user");
const { Game } = require("../models/games");
const {Team}= require('../models/teams');
const mongoose = require("mongoose");

exports.editUser=async function(req,res){
    // console.log(req.params.id);
   
    let user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
      });
     
       user= _.pick(user, ["_id", "nickName", "image","teams"])
      
//  let team=await Team.findByIdAndUpdate(user.teams,{"players":req.body})

    //   res.send({"user":user,"team":team})
       
    let team = await Team.updateMany(
      { _id: user.teams},
      { $set: { "players.$.nickName": user.nickName } },
      {
        new: true,
      }
    );
    // let teamId = await Team.find({ "players._id": req.params.id });
    res.send(team)
}


    // const { error } = validateUserforUpdate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    // if (error) console.log(error.details[0].message);
  
 
 
  
    // let games = await Game.updateMany(
    //   { players: [req.params.id] },
    //   { $set: { "players.$.name": user.nickName } },
    //   { new: true }
    // );
    // let h2h = await H2h.aggregate([
    //   { $unwind: { path: "$players" } },
    //   { $unwind: { path: "$players" } },
    //   { $match: { "players.id": req.params.id } },
    // ]);
  
  
    // let h2hUpdated = await H2h.updateMany(
    //   { team_id: h2h[0].team_id }, {"players":"monkey"},
    //   {$set:{players:"monkey2"}},
      
    // );
    // console.log("sdds",h2hUpdated);
  
//     if (!user)
//       return res.status(404).send("The user with the given ID was not found");
//     res.send(user);
//   });