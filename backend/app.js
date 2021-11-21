const users = require("./routes/users");
const auth = require("./routes/auth");
const games = require("./routes/games");
const teams = require("./routes/teams");
const h2h = require("./routes/h2h");
const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const path = require("path");
// const exphbs = require("express-handlebars");
const hbs=require('nodemailer-express-handlebars');
const nodemailer = require("nodemailer");

// mongoose
//   .connect(
//     "mongodb+srv://nadavG:Barbar88@cluster0.kfjyo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     }
//   )
//   .then(() => console.log("Connected to MongoDB remote..."))
//   .catch((err) => console.error("Could not connect to MongoDB..."));
mongoose
  .connect("mongodb://localhost/backend", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

let corsOptions = {
  origin: "https://poker-underdog.com",
};

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
// app.use(cors(corsOptions));
app.post("/info", (req, res) => {
  async function main() {
    const output = `
    <p>a new game has ended${req.body.name}</p>`;
    // let testAccount=await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: "mail.poker-underdog.com",
      port: 465,
      secure: true,
      auth: {
        user: "info@poker-underdog.com",
        pass: "Emmush2016",
      },
    });
    

    // let info = await transporter.sendMail({
    //   from: '"Poker-Underdog"<info@poker-underdog.com>',
    //   to: "nadavg1000@gmail.com",
    //   subject: "hello",
    //   html: output,
    // });
    // console.log("message sent: %s", info.messageId);
    console.log("preview URL :%s", nodemailer.getTestMessageUrl());
    res.send(output);
  }
  main().catch(console.error);

});

//view engine setup
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');

//static folder
app.use("/public", express.static(path.join(__dirname, "public")));
//body parser middelware

app.use("/api/h2h", h2h);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/games", games);
app.use("/api/teams", teams);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Poker-Underground application test." });
});
const PORT = process.env.PORT || 3900;
http.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
