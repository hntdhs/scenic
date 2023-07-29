if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder } = require('util');
  global.TextEncoder = TextEncoder;
}

const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  adminToken,
} = require("./_testCommon");

let token;
beforeAll(async () => {
  const { body } = await request(app)
    .post("/auth/token")
    .send({
      username: "u1",
      password: "password1",
    });
  token = body.token;

  await commonBeforeAll();
});
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("GET /byways", function() {
    test("get all works", async function() {
      const resp = await request(app)
        .get("/byways")
        .set("authorization", `Bearer ${token}`);

        expect(resp.body).toEqual([
                    {
                        id: expect.any(Number),
                        name: "b1",
                        state: "s1",
                        length: 1,
                        designation: "desig1",
                        fees: "1",
                        image: "http://b1.img",
                        description: "desc1",
                        geographic_features: "geo1",
                      },
                      {
                        id: expect.any(Number),
                        name: "b2",
                        state: "s2",
                        length: 2,
                        designation: "desig2",
                        fees: "2",
                        image: "http://b2.img",
                        description: "desc2",
                        geographic_features: "geo2",
                      },
                      {
                        id: expect.any(Number),
                        name: "b3",
                        state: "s3",
                        length: 3,
                        designation: "desig3",
                        fees: "3",
                        image: "http://b3.img",
                        description: "desc3",
                        geographic_features: "geo3",
                      },
                ]);
    })

    test("works: filtering", async function () {
        const resp = await request(app)
            .get("/byways")
            .query({ minLength: 3 })
            .set("authorization", `Bearer ${token}`)
            
        expect(resp.body).toEqual([{
            id: expect.any(Number),
            name: "b3",
            state: "s3",
            length: 3,
            designation: "desig3",
            fees: "3",
            image: "http://b3.img",
            description: "desc3",
            geographic_features: "geo3",
          }]);
    });

    test("not found for no such byway", async function () {
        const resp = await request(app)
          .get(`/byways/nope`)
          .set("authorization", `Bearer ${token}`);
          
        expect(resp.statusCode).toEqual(404);
    });
})