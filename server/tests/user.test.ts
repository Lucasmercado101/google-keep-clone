import request from "supertest";
import server from "../dev/server";
import db from "../dev/db";

const app = request(server);

beforeAll(() => {
  return db.sync({ force: true });
});

describe("/auth", () => {
  describe("/register", () => {
    describe("POST", () => {
      it("Should return 400 if nothing was sent", (done) => {
        app.post("/auth/register").expect(400).end(done);
      });

      it("Should return 400 if only 'userName' was sent", (done) => {
        app
          .post("/auth/register")
          .send({ userName: "john" })
          .expect(400)
          .end(done);
      });

      it("Should return 400 if only 'password' was sent", (done) => {
        app
          .post("/auth/register")
          .send({ password: "superSafePasswordISwear" })
          .expect(400)
          .end(done);
      });
    });
  });
});

afterAll(() => {
  return db.close();
});
