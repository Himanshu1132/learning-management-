const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const pathname = path.join(__dirname + "/public");
const mongoose = require("mongoose");
let b =
  "mongodb+srv://himanshukathane:test1234@cluster0.ex4nl.mongodb.net/blogs?retryWrites=true&w=majority";
mongoose.connect(b);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error : "));
db.once("open", function () {
  console.log(" ");
});
const kittySchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  img: String,
});
const kittySchema1 = new mongoose.Schema({
  task: String,
  completed: Boolean,
  duedate: String,
});

app.use(express.static(pathname));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(pathname + "/index.html"));
  res.status(500);
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(pathname + "/login.html"));
  res.status(500);
});
app.post("/signup", (req, res) => {
  res.sendFile(path.join(pathname + "/courses.html"));
  console.log(req.body.name);
  console.log(req.body.email);
  console.log(req.body.password);
  console.log(req.body.pic);

  const Kitten = mongoose.model("dd", kittySchema);
  const fluffy = new Kitten({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    img: req.body.pic,
  });
  fluffy.save();
  console.log(fluffy);
  res.status(500);
});
app.get("/task", (req, res) => {
  res.send("Entry Restricted Please login");
  res.status(500);
});
app.get("/logout", (req, res) => {
  res.sendFile(path.join(pathname + "/login.html"));
  res.status(500);
});

app.post("/log", (req, res) => {
  try {
    const na = req.body.email;
    const Kitten = mongoose.model("dd", kittySchema);
    Kitten.find({ email: na }, (err, reso) => {
      if (reso[0].password === req.body.password) {
        loged = true;

        res.sendFile(path.join(pathname + "/courses.html"));
      } else {
        res.sendFile(path.join(pathname + "/index.html"));
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/get", async (req, res) => {
  const Kitten = mongoose.model("lms", kittySchema1);
  const a = await Kitten.find();
  res.send(a);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
