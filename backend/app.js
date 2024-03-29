const users = require("./routes/users");
const auth = require("./routes/auth");
const games = require("./routes/games");
const teams = require("./routes/teams");
const h2h = require("./routes/h2h");
const sideBets = require("./routes/sideBets");
const scheduleGames = require("./routes/scheduleGames");
const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
// const nodemailer = require("nodemailer");
// const exphbs = require("express-handlebars");
// const hbs = require("nodemailer-express-handlebars");
//  const hbs = require("hbs")
// const { engine } = require("express-handlebars");
mongoose
  .connect(
    `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.CLUSTER}/${process.env.DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("Connected to MongoDB remote..."))
  .catch((err) => console.error(err, "Could not connect to MongoDB..."));

// mongoose
//   .connect("mongodb://localhost:27017/myFirstDatabase", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(() => console.log("Connected to MongoDB local..."))
//   .catch((err) => console.error(err, "Could not connect to MongoDB local..."));

// let corsOptions = {
//   origin: "https://poker-underdog.com",
// };

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//static folder
app.use(express.static(path.join(__dirname, "public")));
// app.engine('.hbs', exphbs({extname: '.hbs'}));
// app.set('view engine', '.hbs');
// app.engine('handlebars', exphbs());
// app.engine("handlebars", engine());
// app.set("view engine", "hbs");
// app.set("views", "./views/");

app.use("/api/h2h", h2h);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/games", games);
app.use("/api/teams", teams);
app.use("/api/sideBets", sideBets);
app.use("/api/scheduleGames", scheduleGames);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/israel", express.static(path.join(__dirname, "/israel")));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Poker-Underground application test." });
});
const PORT = process.env.PORT || 3900;
http.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
