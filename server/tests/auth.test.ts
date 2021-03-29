import request from "supertest";
import server from "../dev/server";
import db from "../dev/db";
import User from "../dev/db/models/User";

const app = request(server);

const newUser = {
  userName: "john",
  password: "superSafePasswordISwear"
};

beforeAll(() => {
  return db.sync({ force: true });
});

describe("/auth", () => {
  describe("/register", () => {
    describe("POST", () => {
      describe("Should return ", () => {
        describe("400 if", () => {
          it("nothing was sent", (done) =>
            app
              .post("/auth/register")
              .send({ password: "superSafePasswordISwear" })
              .expect(400)
              .end(done));

          it("only 'userName' was sent", (done) =>
            app
              .post("/auth/register")
              .send({ password: "superSafePasswordISwear" })
              .expect(400)
              .end(done));

          it("only 'password' was sent", (done) =>
            app
              .post("/auth/register")
              .send({ password: "superSafePasswordISwear" })
              .expect(400)
              .end(done));
        });

        describe("an error message if", () => {
          it("nothing was sent", (done) =>
            app
              .post("/auth/register")
              .expect(400)
              .then((resp) => {
                expect(resp.body).toBe(
                  "You need to provide both a 'userName' and 'password'"
                );
                done();
              }));
          it("only 'password' was sent", (done) =>
            app
              .post("/auth/register")
              .send({ password: "superSafePasswordISwear" })
              .expect(400)
              .then((resp) => {
                expect(resp.body).toBe(
                  "You need to provide both a 'userName' and 'password'"
                );
                done();
              }));
          it("only 'userName' was sent", (done) =>
            app
              .post("/auth/register")
              .send({ userName: "john" })
              .expect(400)
              .then((resp) => {
                expect(resp.body).toBe(
                  "You need to provide both a 'userName' and 'password'"
                );
                done();
              }));
        });

        describe("if both 'userName' and 'password' were sent", () => {
          beforeEach(async () => await User.sync({ force: true }));

          it("200", (done) =>
            app.post("/auth/register").send(newUser).expect(200).end(done));

          it("an object that contains the user's userName and encrypted password", (done) =>
            app
              .post("/auth/register")
              .send(newUser)
              .expect(200)
              .then((resp) => {
                const { body } = resp;
                expect(body).toEqual(
                  expect.objectContaining({
                    userName: newUser.userName,
                    password: expect.not.stringMatching(newUser.password)
                  })
                );
                done();
              }));
        });

        describe("if user already exists", () => {
          beforeAll(async () => {
            await User.sync({ force: true });
            await User.create({ userName: newUser.userName });
          });

          it("409", (done) => {
            app.post("/auth/register").send(newUser).expect(409).end(done);
          });
          it("an error message", (done) => {
            app
              .post("/auth/register")
              .send(newUser)
              .expect(409)
              .then((resp) => {
                expect(resp.body).toBe("User already exists");
                done();
              });
          });
        });
      });
    });
  });
});

afterAll(() => {
  return db.close();
});
