const supertest = require("supertest");
const app = require("./../app");
const Genre = require("../models/Genre");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
require("./../models");

const BASE_URL = "/api/v1/movies";
let movieId;

test("POST => 'BASE_URL', should return status 201, and res.body.name = body.name", async () => {
  const body = {
    name: "The Lord of the Rings: The Fellowship of the Ring",
    image:
      "https://i.ytimg.com/vi/V75dMMIW2B4/movieposter_en.jpg",
    synopsis:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    releaseYear: 2001,
  };
  const res = await supertest(app)
    .post(BASE_URL)
    .send(body);
  movieId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(body.name);
});

test("GET ALL => 'BASE_URL', should return status 200 and res.body.lenght = 1", async () => {
  const res = await supertest(app).get(BASE_URL);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("GET ONE => 'BASE_URL/:id', should return 200 and res.body.id = genreId", async () => {
  const res = await supertest(app).get(
    `${BASE_URL}/${movieId}`
  );
  expect(res.status).toBe(200);
  expect(res.body.id).toBe(movieId);
});

test("PUT => 'BASE_URL/:id', should return 200 and res.body.name = body.name", async () => {
  const body = {
    name: "LOTR:The Fellowship of the Ring",
  };
  const res = await supertest(app)
    .put(`${BASE_URL}/${movieId}`)
    .send(body);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(body.name);
});

test("setGenres => 'BASE_URL', should return 200 and res.body[0].name = genre.name", async () => {
  const genreBody = {
    name: "Medieval Fantasy",
  };
  const genre = await Genre.create(genreBody);
  const res = await supertest(app)
    .post(`${BASE_URL}/${movieId}/genres`)
    .send([genre.id]);
  expect(res.status).toBe(200);
  expect(res.body[0].name).toBe(genre.name);
  genre.destroy();
});

test("setActors => 'BASE_URL', should return 200 and res.body[0].name = actor.name", async () => {
  const actorBody = {
    firstName: "Elijah",
    lastName: "Wood",
    nationality: "Estadounidense",
    image: "https://example.com/elijah_wood.jpg",
    birthday: "1981-01-28",
  };
  const actor = await Actor.create(actorBody);
  const res = await supertest(app)
    .post(`${BASE_URL}/${movieId}/actors`)
    .send([actor.id]);
  expect(res.status).toBe(200);
  expect(res.body[0].name).toBe(actor.name);
  actor.destroy();
});

test("setDirectors => 'BASE_URL', should return 200 and res.body[0].name = director.name", async () => {
  const directorBody = {
    firstName: "Peter",
    lastName: "Jackson",
    nationality: "Neozelandés",
    image: "https://example.com/peter_jackson.jpg",
    birthday: "1961-10-31",
  };
  const director = await Director.create(directorBody);
  const res = await supertest(app)
    .post(`${BASE_URL}/${movieId}/directors`)
    .send([director.id]);
  expect(res.status).toBe(200);
  expect(res.body[0].name).toBe(director.name);
  director.destroy();
});
