const express = require("express");
const routerActor = require("./actor.router");
const routerDirector = require("./director.router");
const routerMovie = require("./movie.router");
const routerGenre = require("./genre.router");
const router = express.Router();

// colocar las rutas aquí

router.use("/actors", routerActor);
router.use("/directors", routerDirector);
router.use("/movies", routerMovie);
router.use("/genres", routerGenre);
module.exports = router;
