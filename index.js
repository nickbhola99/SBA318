//todo list project
//Application lets users create an account where they can create their own to do lists
import express from "express";
import bodyParser from "body-parser";
import usersRouter from "./routes/user.js";
import { users } from "./data/users.js";
import { error } from "./utils/error.js";
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('css'));
const PORT = 4000;
app.set("view engine", "pug");
app.set("views", "./views");

//Middlewares
app.use("/users", usersRouter);
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ error: error.message });
});

//Renders the front page
app.get("/", (req, res) => {
  res.render("index");
});

//For signing up new users
app.get("/signup", (req, res) => {
  res.render("signup");
});

//Redirects to the User's page
app.post("/", (req, res) => {
  const username = req.body.username;
  res.redirect(`/users/${username}`);
});

//Creates new user then redirects to their page
app.post("/signup", (req, res, next) => {
  if (req.body.name && req.body.username && req.body.email) {
    if (users.find((u) => u.username == req.body.username)) {
        next(error(400, "Username Already Taken"));
    }
    const user = {
      id: users[users.length - 1].id + 1,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      todo: [],
    };
    users.push(user);
    console.log(users[users.length - 1]);
    res.redirect(`/users/${user.username}`);
  }
});

app.listen(PORT, () => {
  console.log(`${PORT}`);
});
