import app from "./app.mjs";
//import supertest from "supertest";
import request from "supertest";
import pgPromise from "pg-promise";
import db from "./db/db-connection.js";
import router from "./routes";
import { application } from "express";

describe("Test the root path of index.mjs", () => {
  beforeEach(async () => {
    await db.none("CREATE TEMPORARY TABLE users (LIKE users INCLUDING ALL)"); // This will copy constraints also
    await await db.one(
      "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *",
      ["Ramesh", "ramesh@ramesh.com"]
    );
  });

  afterEach(async function () {
    await db.none("DROP TABLE IF EXISTS pg_temp.users");
  });

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

    console.log(response.headers);
    expect(response.headers["content-type"]).toEqual(
      expect.stringMatching("application/json")
    );
    expect(response.status).toEqual(200);
    expect(response.body[0].email).toEqual("ramesh@ramesh.com");
    expect(response.body[0].name).toEqual("Ramesh");
  });
});

// https://medium.com/geoblinktech/postgres-and-integration-testing-in-node-js-apps-2e1b52af7ffc
