import supertest, { agent } from "supertest";
import server from "../server";
import db from "../db";
import User from "../db/models/User";
import { CookieAccessInfo } from "cookiejar";

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

let app: supertest.SuperAgentTest;

function getConnectSidCookie() {
  const access_info = new CookieAccessInfo("");
  const cookie = app.jar.getCookie("connect.sid", access_info);
  return cookie ? cookie : null;
}

beforeEach(() => {
  // so cookies don't persist among all tests
  app = agent(server);
});

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

      it("set session cookie", async (done) => {
        await app.post("/auth/login").send(newUser).expect(200);

        expect(getConnectSidCookie()).not.toBeNull();
        done();
      });
    });
  });

  describe("GET /me", () => {
    beforeAll(async () => {
      await User.sync({ force: true });
      await User.create(newUser);
    });

    it("should return 401 if logged out", (done) =>
      app.get("/auth/me").expect(401).end(done));

    describe("if logged in should return", () => {
      beforeEach(
        async () => await app.post("/auth/login").send(newUser).expect(200)
      );

      it("200 if logged in", async (done) => {
        app.get("/auth/me").expect(200).end(done);
      });

      it("an object with the user's username", async (done) => {
        app
          .get("/auth/me")
          .expect(200)
          .then((resp) => {
            expect(resp.body.userName).toBe(newUser.userName);
            done();
          });
      });
    });
  });

  describe("GET /logout", () => {
    beforeAll(async () => {
      await User.sync({ force: true });
      await User.create(newUser);
    });

    beforeEach(
      async () => await app.post("/auth/login").send(newUser).expect(200)
    );

    it("should return a 200", (done) =>
      app.get("/auth/logout").expect(200).end(done));

    it("should clear session cookies", async (done) =>
      app
        .get("/auth/logout")
        .expect(200)
        .then(async () => {
          expect(getConnectSidCookie()).toBeNull();
          done();
        }));
  });
});

afterAll(() => {
  return db.close();
});
