const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of the database", () => {
  let joe, graham, taylor, scott;

  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    graham = new User({ name: "Graham" });
    taylor = new User({ name: "Taylor" });
    scott = new User({ name: "Scott" });

    Promise.all([joe.save(), graham.save(), taylor.save(), scott.save()])
      .then(() => done());
  });

  it("finds all users a name of joe", (done) => {
    User.find({ name: "Joe" }).then((users) => {
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });

  it("finds a user with a particular id", (done) => {
    User.findOne({ _id: joe._id }).then((user) => {
      assert(user.name === "Joe");
      done();
    });
  });

  it("can skip and limit the result set", (done) => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === "Graham");
        assert(users[1].name === "Taylor");
        done();
      });
  });
});