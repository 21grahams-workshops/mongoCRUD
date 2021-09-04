//======================
//===MONGO CONNECTION===
//======================

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect("mongodb://localhost/mongoCRUD_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection
    .once("open", () => { done(); })
    .on("error", (error) => {
      console.warn("Warning", error);
    });
});

// hook - function that gets executed before any testing function gets executed inside test suite

beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  // Ready to run the next test
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
