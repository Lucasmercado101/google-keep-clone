import { agent } from "supertest";
import server from "../dev/server";
import db from "../dev/db";
import User from "../dev/db/models/User";

const app = agent(server);

const newUser = {
  userName: "john",
  password: "superSafePasswordISwear"
};

const invalidUser = {
  userName:
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  password:
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
};

beforeAll(() => {
  return db.sync({ force: true });
});

describe("/auth", () => {
  describe("POST /register should return", () => {
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

      describe("and 'username' is too long", () => {
        test("400", (done) => {
          app
            .post("/auth/register")
            .send({
              userName: invalidUser.userName,
              password: newUser.password
            })
            .expect(400)
            .end(done);
        });

        test("an error message", (done) => {
          app
            .post("/auth/register")
            .send({
              userName: invalidUser.userName,
              password: newUser.password
            })
            .expect(400)
            .then((resp) => {
              expect(resp.body).toBe(
                "Username must be smaller or equal than 255 characters"
              );
              done();
            });
        });
      });

      describe("and 'password' is too long", () => {
        test("400", (done) => {
          app
            .post("/auth/register")
            .send({
              userName: newUser.userName,
              password: invalidUser.password
            })
            .expect(400)
            .end(done);
        });

        test("an error message", (done) => {
          app
            .post("/auth/register")
            .send({
              userName: newUser.userName,
              password: invalidUser.password
            })
            .expect(400)
            .then((resp) => {
              expect(resp.body).toBe(
                "Password must be smaller or equal than 255 characters"
              );
              done();
            });
        });
      });
    });

    describe("if user already exists", () => {
      beforeAll(async () => {
        await User.sync({ force: true });
        await User.create({
          userName: newUser.userName,
          password: newUser.password
        });
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

  describe("GET /login", () => {
    beforeAll(async () => {
      await User.sync({ force: true });
      await User.create(newUser);
    });

    describe("should return 404 if", () => {
      it("nothing was sent", (done) => {
        app.post("/auth/login").expect(404).end(done);
      });

      it("only 'userName' was sent", (done) => {
        app.post("/auth/login").send({ userName: "asd" }).expect(404).end(done);
      });

      it("only 'password' was sent", (done) => {
        app.post("/auth/login").send({ password: "asd" }).expect(404).end(done);
      });

      it("invalid 'userName' and 'password' were sent", (done) => {
        app
          .post("/auth/login")
          .send({ userName: "asd", password: "asd" })
          .expect(404)
          .end(done);
      });
    });

    describe("if valid user was sent it should", () => {
      it("return 200", (done) => {
        app.post("/auth/login").send(newUser).expect(200).end(done);
      });
    });
  });
});

afterAll(() => {
  return db.close();
});
