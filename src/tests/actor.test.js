const supertest = require("supertest");
const app = require("./../app");

const BASE_URL = "/api/v1/actors";
let actorId;

test("POST => 'BASE_URL', should return 201 and res.body.firstName = actorBody.firstName", async () => {
  const actorBody = {
    firstName: "Tom",
    lastName: "Hanks",
    nationality: "Estadounidense",
    image: "https://example.com/tom_hanks.jpg",
    birthday: "1956-07-09",
  };
  const res = await supertest(app)
    .post(BASE_URL)
    .send(actorBody);
  actorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe("Tom");
});

test("GET ALL => 'BASE_URL', should return 200 and res.body.length = 1", async () => {
  const res = await supertest(app).get(BASE_URL);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("GET ONE => 'BASE_URL:id', should return 200 and res.body.id to be actorId", async () => {
  const res = await supertest(app).get(
    `${BASE_URL}/${actorId}`
  );
  expect(res.status).toBe(200);
  expect(res.body.id).toBe(actorId);
});

test("PUT => 'BASE_URL:id', should return 200 and res.body.nationality = USA", async () => {
  const body = {
    nationality: "USA",
  };
  const res = await supertest(app)
    .put(`${BASE_URL}/${actorId}`)
    .send(body);
  expect(res.status).toBe(200);
  expect(res.body.nationality).toBe(body.nationality);
});

test("DELETE => 'BASE_URL:id', should return 204", async () => {
  const res = await supertest(app).delete(
    `${BASE_URL}/${actorId}`
  );
  expect(res.status).toBe(204);
});

test("GET ONE DELETED => 'BASE_URL:id', should return 404", async () => {
  const res = await supertest(app).get(
    `${BASE_URL}/${actorId}`
  );
  expect(res.status).toBe(404);
});
