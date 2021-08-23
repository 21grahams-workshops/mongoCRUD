//======================
//===MONGO CONNECTION===
//======================

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongoCRUD_test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once("open", () => console.log("Good to go!"))
  .on("error", (error) => {
    console.warn("Warning", error);
  });