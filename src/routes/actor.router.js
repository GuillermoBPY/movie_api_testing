const {
  getAll,
  create,
  getOne,
  remove,
  update,
} = require("../controllers/actor.controllers");
const express = require("express");

const routerActor = express.Router();

routerActor.route("/").get(getAll).post(create);

routerActor.route("/:id").get(getOne).delete(remove).put(update);

module.exports = routerActor;
