const { it, describe, expect } = require("@jest/globals");
const app = require("./app.js");
const seed = require("./seed.js");
const request = require("supertest");
const User = require("./models/User.js");
const Show = require("./models/Show.js");

beforeEach(async () => {
  await seed();
});

describe("/users endpoints", () => {
  describe("GET '/'", () => {
    it("successfully responds with list of users.", async function () {
      const response = await request(app)
        .get("/users")
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0]).not.toHaveProperty("password");
      expect(response.body[0]).toHaveProperty("username");
    });
  });
  describe("GET /users/:id", () => {
    it("returns the user matching the provided id", async () => {
      const response = await request(app)
        .get("/users/1")
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(response.body).not.toHaveProperty("password");
      expect(response.body).toHaveProperty("username");
    });
  });
  describe("GET users/:id/shows", () => {
    it("returns 401 user id does not exist", async () => {
      const response = await request(app)
        .get("/users/100/shows")
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(401);
      expect(response.body.message).toBe("Unable to find requested resource.");
    });
    it("returns a list of shows watched by associated user", async () => {
      const user = await User.findByPk(1);
      const show = await Show.findByPk(1);
      await user.addShow(show);

      const response = await request(app)
        .get("/users/1/shows")
        .set("Accept", "application/json");
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0]).toHaveProperty("title");
      expect(response.body[0]).toHaveProperty("genre");
      expect(response.body[0]).toHaveProperty("rating");
      expect(response.body[0]).toHaveProperty("status");
    });
  });
  describe("PUT /:id/shows", () => {
    it("adds a new show to a user's watch list", async () => {
      const response = await request(app)
        .put("/users/1")
        .set("Accept", "application/json")
        .send({ showId: 1 });

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        message: "Show successfully added to user's watch list",
      });
      const show = await Show.findByPk(1);
      expect(show.userId).toBe(1);
    });
  });
});

describe("/shows endpoints", () => {
  describe("GET '/shows'", () => {
    it("returns a list of all shows", async () => {
      const response = await request(app)
        .get("/shows")
        .set("Accept", "Application/json");
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0]).toHaveProperty("title");
      expect(response.body[0]).toHaveProperty("genre");
      expect(response.body[0]).toHaveProperty("rating");
      expect(response.body[0]).toHaveProperty("status");
    });
    it("returns list of shows by genre when given query param", () => {});
  });
  describe("GET '/shows/:id'", () => {});
  describe("PUT '/shows/:id", () => {
    it("updates the rating of a show that has been watched", () => {});
    it("updates the status of a show", () => {});
  });
  describe("DELETE '/shows/:id", () => {});
});
