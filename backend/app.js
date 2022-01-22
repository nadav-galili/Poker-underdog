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
const nodemailer = require("nodemailer");
const exphbs = require("express-handlebars");
const hbs = require("nodemailer-express-handlebars");
//  const hbs = require("hbs")
const { engine } = require("express-handlebars");

// const config = require("./config");
// mongoose
//   .connect(
//     `mongodb+srv://${config.production.database.user_name}:` +
//       `${config.production.database.pass}@${config.production.server.cluster}/${config.production.database.db}?retryWrites=true&w=majority`,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     }
//   )
//   .then(() => console.log("Connected to MongoDB remote..."))
//   .catch((err) => console.error(err, "Could not connect to MongoDB..."));

mongoose
  .connect("mongodb://localhost/backend", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error(err, "Could not connect to MongoDB..."));

let corsOptions = {
  origin: "https://poker-underdog.com",
};

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//static folder
app.use(express.static(path.join(__dirname, "public")));
// app.engine('.hbs', exphbs({extname: '.hbs'}));
// app.set('view engine', '.hbs');
// app.engine('handlebars', exphbs());
app.engine("handlebars", engine());
app.set("view engine", "hbs");
app.set("views", "./views/");

app.get("/test", (req, res) => {
  const date = new Date(req.body.updatedAt).toLocaleDateString("en-GB");
  res.render("email", {
    createdAt: date,
    _id: req.body._id,
    players: req.body.players,
  });
});

const options = {
  viewEngine: {
    partialsDir: __dirname + "/views/partials",
    layoutsDir: __dirname + "/views/layouts",
    extname: ".hbs",
  },
  extName: ".hbs",
  viewPath: "views",
};


let transporter = nodemailer.createTransport({
  host: "mail.poker-underdog.com",
  port: 465,
  secure: true,
  auth: {
    user: "info@poker-underdog.com",
    pass: "Emmush2016",
  },
});

app.get("/info", async (req, res) => {
  try {
    transporter.use("compile", hbs(options));
    const mailInfo = {
      from: "info@poker-underdog.com",
      to: "nadavg1000@gmail.com",
      subject: `Game number ${req.body._id} has ended`,
      template: "gameEnd",
      context: req.body,
    };
    await transporter.sendMail(mailInfo);
    res.send("email sent");
  } catch (e) {
    console.log(e);
    res.status(500).send("Something broke!");
  }
});

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