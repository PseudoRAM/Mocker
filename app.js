const Mocker = require("./bin/Mocker");
const mocker = new Mocker();
mocker.init(4000, {
  users: {
    123: {
      account: ["Ben", "student"]
    }
  }
})

mocker.post("/change-name/:id", (body, res) => {
  mocker.data.users[res.params.id].account[0] = body.name
  return { status: "success", name: mocker.data.users[res.params.id].account[0]}
});

mocker.get("/name", (body, res) => ({ profile: mocker.data.users[res.query.uid].account}));

mocker.start();