const users = require("./routes/users");
const auth = require("./routes/auth");
const games = require("./routes/games");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/backend", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/games", games);
const port = 3900;
http.listen(port, () => console.log(`Listening on port ${port}...`));
