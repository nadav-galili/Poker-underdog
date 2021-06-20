const users = require("./routes/users");
const auth = require("./routes/auth");
const games = require("./routes/games");
const teams = require("./routes/teams");
const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");

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
//   .then(() => console.log("Connected to MongoDB..."))
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

// let corsOptions = {
//   origin: "https://poker-underdog.com",
// };
app.use(cors());
// app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/games", games);
app.use("/api/teams", teams);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Poker-Underground application test." });
});
const PORT = process.env.PORT || 3900;
http.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
