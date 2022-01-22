const mongoose = require("mongoose");
const { User } = require("./models/user");
const { Game } = require("./models/games");
const { Team } = require("./models/teams");
const { H2h } = require("./models/h2h");
const fs = require("fs");
const AdmZip = require("adm-zip");
const nodemailer = require("nodemailer");
const config = require("./config");
const cron = require('node-cron');



// mongoose
//   .connect("mongodb://localhost/backend", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(() => console.log("Connected to MongoDB..."))
//   .catch((err) => console.error(err, "Could not connect to MongoDB..."));

// ...

// Schedule tasks to be run on the server.
cron.schedule('* * * * *', function() {

mongoose
  .connect(
    `mongodb+srv://${config.production.database.user_name}:` +
      `${config.production.database.pass}@${config.production.server.cluster}/${config.production.database.db}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("Connected to MongoDB remote..."))
  .catch((err) => console.error(err, "Could not connect to MongoDB..."));

const getData = async () => {
  let user = await User.find({});
  user = JSON.stringify(user);
  fs.writeFile("./backup/users.json", user, function (err) {
    if (err) {
      console.log("err", err);
    } else {
      console.log("users.json was saved");
    }
  });

  let teams = await Team.find({});
  teams = JSON.stringify(teams);
  fs.writeFile("./backup/teams.json", teams, function (err) {
    if (err) {
      console.log("err", err);
    } else {
      console.log("teams.json was saved");
    }
  });

  let games = await Game.find({});
  games = JSON.stringify(games);
  fs.writeFile("./backup/games.json", games, function (err) {
    if (err) {
      console.log("err", err);
    } else {
      console.log("games.json was saved");
    }
  });

  let h2h = await H2h.find({});
  h2h = JSON.stringify(h2h);
  fs.writeFile("./backup/h2h.json", h2h, function (err) {
    if (err) {
      console.log("err", err);
    } else {
      console.log("h2h.json was saved");
    }
  });
};
getData();

async function createZipArchive() {
  try {
    const zip = new AdmZip();
    const outputFile = `./backup/backup.zip`;
    zip.addLocalFile("./backup/games.json");
    zip.addLocalFile("./backup/teams.json");
    zip.addLocalFile("./backup/users.json");
    zip.addLocalFile("./backup/h2h.json");

    zip.writeZip(outputFile);
    console.log(`Created ${outputFile} successfully`);
  } catch (e) {
    console.log(`Something went wrong. ${e}`);
  }
}
createZipArchive();

async function main() {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.poker-underdog.com",
    port: 465,
    secure: true,
    auth: {
      user: "info@poker-underdog.com",
      pass: config.production.emailPass.pass,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "info@poker-underdog.com",
    to: "nadavg1000@gmail.com",
    subject: `Backup ${new Date().toLocaleDateString("en-GB")}`,
    text: "Back up for today",
    html: "<b>Poker Underdog Backup</b>",
    attachments: [
      {
        path: "./backup/backup.zip",
      },
    ],
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);

});