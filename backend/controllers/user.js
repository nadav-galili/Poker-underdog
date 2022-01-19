const _ = require("lodash");
const express = require("express");
const { User, validate } = require("../models/user");
const { Game } = require("../models/games");
const {Team}= require('../models/teams');
const mongoose = require("mongoose");
const { H2h } = require("../models/h2h");

exports.editUser=async function(req,res){
  const {file}=req;

    //  const { error } = validateUserforUpdate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    //  if (error) console.log(error.details[0].message);

    //updte user name
    let user = await User.findOneAndUpdate({ _id: req.params.id }, {nickName:req.body.nickName}, {
        new: true,
      });
     
       user= _.pick(user, ["_id", "nickName", "image","teams"])
//update user name in teams model
       let team=await Team.updateMany(
           {"players._id":req.params.id},
           {$set:{"players.$.nickName":req.body.nickName}},
           {new:true, timestamps:false}
       )
   
//update user name in all games
     let games = await Game.updateMany(
       { "players.id": req.params.id},
       { $set: { "players.$.name": user.nickName } },
       { new: true , timestamps:false}
    );
//update user name in all h2h
   let h2h=await H2h.updateMany(
    {"players":{$elemMatch:{$elemMatch:{id:req.params.id}}}},
    { $set: { "players.$[].$[elem].name": user.nickName } },
    {arrayFilters:[{'elem.id':req.params.id}]},
   );

    
    res.send({h2h:h2h,games:games,team:team})
}


  

 
  
  