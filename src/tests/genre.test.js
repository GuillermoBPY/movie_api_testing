const supertest = require("supertest");
const app = require("./../app");
require("./../models");

const BASE_URL = "/api/v1/genres";
let genreId;

test("POST => 'BASE_URL', should return status 201, and res.body.name = body.name", async () => {
  const body = {
    name: "Drama",
  };
  const res = await supertest(app)
    .post(BASE_URL)
    .send(body);
  genreId = res.body.id;
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
    `${BASE_URL}/${genreId}`
  );
  expect(res.status).toBe(200);
  expect(res.body.id).toBe(genreId);
});

test("PUT => 'BASE_URL/:id', should return 200 and res.body.name = body.name", async () => {
  const body = {
    name: "Drama y Suspense",
  };
  const res = await supertest(app)
    .put(`${BASE_URL}/${genreId}`)
    .send(body);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(body.name);
});

test("DELETE => 'BASE_URL/:id', should return 204", async () => {
  const res = await supertest(app).delete(
    `${BASE_URL}/${genreId}`
  );
  expect(res.status).toBe(204);
});

test("GET ONE DELETED 'BASE_URL/:id', should return 404", async () => {
  const res = await supertest(app).get(
    `${BASE_URL}/${genreId}`
  );
  expect(res.status).toBe(404);
});
