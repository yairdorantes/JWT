import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();

const password = bcrypt.hashSync("xrl8xdgtA", 10);
const passwordValidation = bcrypt.compareSync("xrl8xdgtA", password);
console.log(password);
console.log(passwordValidation);
app.listen(3000, () => {
  console.log("running app");
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello world!" });
});
app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    username: "admin",
  };
  jwt.sign({ user }, "scretkey", { expiresIn: "7d" }, (err, token) => {
    res.json({ token });
  });
  //   res.json(user);
});
app.post("/api/post", verifyToken, (req, res) => {
  jwt.verify(req.token, "scretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({ message: "success created", authData });
    }
  });
});

//Authorization: Bearer <token>
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
