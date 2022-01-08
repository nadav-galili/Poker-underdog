const _ = require("lodash");
const express = require("express");
const { User, validate } = require("../models/user");
const { Game } = require("../models/games");
const {Team}= require('../models/teams');
const mongoose = require("mongoose");
const { H2h } = require("../models/h2h");

exports.editUser=async function(req,res){
    let user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
      });
     
       user= _.pick(user, ["_id", "nickName", "image","teams"])

       let team=await Team.updateMany(
           {"players._id":req.params.id},
           {$set:{"players.$.nickName":req.body.nickName}},
           {new:true, timestamps:false}
       )
   

     let games = await Game.updateMany(
       { "players.id": req.params.id},
       { $set: { "players.$.name": user.nickName } },
       { new: true , timestamps:false}
    );

   let h2h=await H2h.aggregate([
       {$unwind:{
           path:'$players'
       }},
       {$unwind:{
           path:'$players'
       }},
       {
        $match:{
            'players.id':req.params.id
        }
       }
   ])
       await  h2h.forEach(p=>{
            p.players.name=user.nickName
        })
 
    
    res.send({h2h:h2h,games:games,team:team})
}


    // const { error } = validateUserforUpdate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    // if (error) console.log(error.details[0].message);
  

 
  
  