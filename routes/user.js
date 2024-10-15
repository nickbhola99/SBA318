import { Router } from "express";
import { users } from "../data/users.js";
import { error } from "../utils/error.js";
const usersRouter = Router();
// let todo = [];
let Obj = {
  username: "",
};
usersRouter.get("/", (req, res) => {
  res.json(users);
});
usersRouter.get("/:username", (req, res, next) => {
  console.log(req.params);
  const user = users.find((user) => user.username == req.params.username);
  if (user) {
    Obj.username = user.username;
    res.render("todolist", { user });
  } else {
    next(error(404, "Resource not found!"));
  }
});
//Simulates a Patch method to update the list
usersRouter.post("/:username/newitem", (req, res, next) => {
  const user = users.find((user) => user.username == req.params.username);
  if (user) {
    const { titleOfTask, description } = req.body;
    user.todo.push({ titleOfTask, description });
    // res.render('todolist', {Obj: Obj.username}, todo);
    res.redirect(`/users/${user.username}`);
    // res.redirect("/");
  }
  else{
    next(error(404, "Resource not found!"));
  }
});
//Simulates a Delete method to delete items
usersRouter.post("/:username/deleteitem", (req, res, next) => {
  const user = users.find((user) => user.username == req.params.username);
  if (user) {
    const index = req.body;
    user.todo.splice(index, 1);
    res.redirect(`/users/${user.username}`);
  }
  else{
    next(error(404, "Resource not found!"));
  }
});

//Real Patch and Delete methods, however the Pug files can't use them
usersRouter.patch("/:username/newitem", (req, res, next) => {
  const user = users.find((user) => user.username == req.params.username);
  if (user) {
    const { titleOfTask, description } = req.body;
    user.todo.push({ titleOfTask, description });
    // res.render('todolist', {Obj: Obj.username}, todo);
    res.redirect(`/users/${user.username}`);
    // res.redirect("/");
  }
  else{
    next(error(404, "Resource not found!"));
  }
});
usersRouter.delete("/:username/deleteitem", (req, res, next) => {
  const user = users.find((user) => user.username == req.params.username);
  if (user) {
    const index = req.body;
    user.todo.splice(index, 1);
    res.redirect(`/users/${user.username}`);
  }
  else{
    next(error(404, "Resource not found!"));
  }
});
export default usersRouter;
