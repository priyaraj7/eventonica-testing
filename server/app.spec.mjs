import app from "./app.mjs";
//import supertest from "supertest";
import request from "supertest";
import pgPromise from "pg-promise";
import db from "./db/db-connection.js";
import router from "./routes";
import { application } from "express";

describe("Test the root path of index.mjs", () => {
  // called before each of these tests (before every test function).
  beforeEach(async () => {
    await db.none("CREATE TEMPORARY TABLE users (LIKE users INCLUDING ALL)"); // This will copy constraints also
    await await db.one(
      "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *",
      ["Ramesh", "ramesh@ramesh.com"]
    );
  });
  // called after each of these tests (after every test function).
  afterEach(async function () {
    await db.none("DROP TABLE IF EXISTS pg_temp.users");
  });
  // called once after all tests.
  afterAll(async () => {
    return db.$pool.end();
  });

  it("should return a 200", () => {
    return request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  it("should list user", async () => {
    const response = await request(app)
      .get("/users")
      .set("Accept", "application/json");

    // console.log(response.headers);
    expect(response.headers["content-type"]).toEqual(
      expect.stringMatching("application/json")
    );
    expect(response.status).toEqual(200);
    expect(response.body[0].email).toEqual("ramesh@ramesh.com");
    expect(response.body[0].name).toEqual("Ramesh");
  });

  it("should able add new user", async () => {
    const req = {
      name: "josh",
      email: "josh@gmail.com",
    };
    // await postUser(req);

    // const { rows } = await db.one(
    //   "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *",
    //   ["josh", "josh@gmail.com"]
    // );
    // expect(rows).lengthOf(1);
    // const response = await request(app)
    //   .post("/users")
    //   .set({ name: "josh", email: "josh@gmail.com" });
    // console.log(response);
    // expect(response.status).toEqual(200);

    // async function postUser(req, status = 200) {
    //   const { body } = await request(app).post("/").send(req).expect(status);
    //   return body;
    // }

    const newStudent = await request(app).post("/").send(req);
    console.log(newStudent);

    // make sure we add it correctly
    //expect(newStudent.body).toHaveProperty("id");
    expect(newStudent.body.name).toEqual("josh");
    expect(newStudent.statusCode).toEqual(200);

    // make sure we have 3 students now
    const response = await request(app).get("/");
    expect(response.body.length).toBe(3);
  });
});

// https://medium.com/geoblinktech/postgres-and-integration-testing-in-node-js-apps-2e1b52af7ffc
