const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const h2hSchema=new mongoose.Schema(
{
    gameId:{
        type:String,
        minlength:12
    },
    team_name:{
        type:String
    },
    team_id:{
        type:String,
        required:true,
    },
    players:{
        type:Array,
        required:true
    },
    isOpen:{
type:Boolean
    }

},
{timestamps:true}
)

const H2h=mongoose.model("H2h",h2hSchema );

function validateH2h(h2h){
    const schema=Joi.object({
        isOpen:Joi.boolean(),
        team_id:Joi.string().required(),
        team_name:Joi.string().required(),
        players:Joi.array().required(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        gameId:Joi.string()
    });
    return schema.validate(h2h);
}

exports.H2h=H2h;
exports.validate=validateH2h;