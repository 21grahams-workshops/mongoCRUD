const assert = require("assert");
const User = require("../src/user");

describe("Updating Records", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  // helper function to remove duplicate logic
  const assertName = (operation, done) => {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users[0].name === "Alex");
        assert(users.length === 1);
        done();
      });
  };

  // model instance
  it("instance type using set and save", (done) => {
    joe.set("name", "Alex"); // change property on object or model instance. DOESN'T PERSIST
    assertName(joe.save(), done); // PERSISTS
  });

  it("a model instance can update", (done) => {
    assertName(joe.updateOne({ name: "Alex" }), done);
  });

  // model class
  it("a model class can update", (done) => {
    assertName(User.updateMany({ name: "Joe" }, { name: "Alex" }), done);
  });

  it("a model class can update one record", (done) => {
    assertName(User.updateOne({ name: "Joe" }, { name: "Alex" }), done);
  });

  it("a model class can find a record with an ID and update", (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: "Alex" }), done);
  });
});