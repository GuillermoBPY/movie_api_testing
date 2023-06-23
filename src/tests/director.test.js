const supertest = require("supertest");
const app = require("./../app");

const BASE_URL = "/api/v1/directors";
let directorId;

test("POST => 'BASE_URL', should return 201 and res.body.firstName = body.firstName", async () => {
  const body = {
    firstName: "Christopher",
    lastName: "Nolan",
    nationality: "British",
    image: "https://example.com/christopher-nolan.jpg",
    birthday: "1970-07-30",
  };
  const res = await supertest(app)
    .post(BASE_URL)
    .send(body);
  directorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(body.firstName);
});

test("GET ALL => 'BASE_URL', should return 200 and res.body.length = 1", async () => {
  const res = await supertest(app).get(BASE_URL);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("GET ONE => 'BASE_URL:id', should return 200 and res.body.id to be directorId", async () => {
  const res = await supertest(app).get(
    `${BASE_URL}/${directorId}`
  );
  expect(res.status).toBe(200);
  expect(res.body.id).toBe(directorId);
});

test("PUT => 'BASE_URL:id', should return 200 and res.body.nationality = UK", async () => {
  const body = {
    nationality: "UK",
  };
  const res = await supertest(app)
    .put(`${BASE_URL}/${directorId}`)
    .send(body);
  expect(res.status).toBe(200);
  expect(res.body.nationality).toBe(body.nationality);
});

test("DELETE => 'BASE_URL:id', should return 204", async () => {
  const res = await supertest(app).delete(
    `${BASE_URL}/${directorId}`
  );
  expect(res.status).toBe(204);
});

test("GET ONE DELETED => 'BASE_URL:id', should return 404", async () => {
  const res = await supertest(app).get(
    `${BASE_URL}/${directorId}`
  );
  expect(res.status).toBe(404);
});
