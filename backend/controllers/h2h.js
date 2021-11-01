const _ = require("lodash");
const { H2h, validate } = require("../models/h2h");
const { Game } = require("../models/games");

exports.newH2h = async function (req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let players = req.body.players

    if(players.length % 2 !==0){
        players.push({id:'1234' ,name:'monkey', image:'monkey'})
     
    }
  var splitAt = function (i, xs) {
    var a = xs.slice(0, i);
    var b = xs.slice(i, xs.length);
    return [a, b];
  };

  var shuffle = function (xs) {
    return xs.slice(0).sort(function () {
      return 0.5 - Math.random();
    });
  };

  var zip = function (xs) {
    return xs[0].map(function (_, i) {
      return xs.map(function (x) {
        return x[i];
      });
    });
  };

  var result = zip(splitAt(players.length / 2, shuffle(players)));
  let h2h =(_.pick(req.body, ["team_id","gameId"]));
  h2h.players=result;
  let newH2h=new H2h(h2h);
  await newH2h.save();
  res.send(newH2h);
};

exports.getByGameId=async function(req, res){
    const game=await H2h.find({
        gameId:req.params.gameId
    });
    res.send(game)
}
