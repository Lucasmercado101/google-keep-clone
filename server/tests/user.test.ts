import request from "supertest";
import server from "../dev/server";
import db from "../dev/db";

const app = request(server);

beforeAll(() => {
  return db.sync({ force: true });
});

describe("/auth", () => {
  describe("GET /register", () => {
    it("add", (done) => {
      app.get("/note").expect(401).end(done);
    });
  });
});

afterAll(() => {
  return db.close();
});
