const assert = require("assert");
const User = require("../src/user");

describe("Deleting a user", () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  // helper function to remove duplicate logic
  const deleteUser = (operation, done) => {
    operation
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  }

  // model instance
  it("model instance remove", (done) => {
    deleteUser(joe.remove(), done);
  });

  // model classes
  it("class method remove", (done) => {
    deleteUser(User.deleteMany({ name: "Joe" }), done)
  });

  it("class method findOneAndRemove", (done) => {
    deleteUser(User.findOneAndRemove({ name: 'Joe' }), done);
  });

  it("class method findByIdAndRemove", (done) => {
    deleteUser(User.findByIdAndRemove(joe._id), done);
  });
});
