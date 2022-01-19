const mongoose = require("mongoose");
const { User } = require("./models/user");
const {Game}=require('./models/games');
const {Team}=require('./models/teams');
const {H2h}=require ('./models/h2h');
const fs = require('fs');
const AdmZip = require("adm-zip");



mongoose
  .connect("mongodb://localhost/backend", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error(err, "Could not connect to MongoDB..."));

const  getData=async()=>{
  let user=await User.find({});
  user=JSON.stringify(user);
  fs.writeFile('./test/users.json',user,function(err){
    if(err){
        console.log("err",err);
    }else{
        console.log('users.json was saved')
    }
})

  let teams=await Team.find({});
  teams=JSON.stringify(teams);
  fs.writeFile('./test/teams.json',teams,function(err){
    if(err){
        console.log("err",err);
    }else{
        console.log('teams.json was saved')
    }
})

  let games=await Game.find({});
  games=JSON.stringify(games);
  fs.writeFile('./test/games.json',games,function(err){
    if(err){
        console.log("err",err);
    }else{
        console.log('games.json was saved')
    }
})

  let h2h=await H2h.find({});
  h2h=JSON.stringify(h2h);
  fs.writeFile('./test/h2h.json',h2h,function(err){
    if(err){
        console.log("err",err);
    }else{
        console.log('h2h.json was saved')
    }
})
}
getData();

async function createZipArchive() {
  try {
    const zip = new AdmZip();
    const outputFile = "./test/test.zip";
    // zip.addLocalFolder("./test");
   zip.addLocalFile('./test/games.json');
   zip.addLocalFile('./test/teams.json');
   zip.addLocalFile('./test/users.json');
   zip.addLocalFile('./test/h2h.json');
   

   zip.writeZip(outputFile);
    console.log(`Created ${outputFile} successfully`);
  } catch (e) {
    console.log(`Something went wrong. ${e}`);
  }
}

createZipArchive();
