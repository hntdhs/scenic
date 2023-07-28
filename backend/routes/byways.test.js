const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testJobIds,
  u1Token,
  adminToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("GET /byways", function() {
    test("get all works", async function() {
        expect(resp.body).toEqual({
            byways:
                [
                    {
                        name: "b1",
                        state: "s1",
                        length: "1",
                        designation: "desig1",
                        fees: "1",
                        image: "http://b1.img",
                        description: "desc1",
                        geographic_features: "geo1",
                      },
                      {
                        name: "b2",
                        state: "s2",
                        length: "2",
                        designation: "desig2",
                        fees: "2",
                        image: "http://b2.img",
                        description: "desc2",
                        geographic_features: "geo2",
                      },
                      {
                        name: "b3",
                        state: "s3",
                        length: "3",
                        designation: "desig3",
                        fees: "3",
                        image: "http://b3.img",
                        description: "desc3",
                        geographic_features: "geo3",
                      },
                ],
        });
    })

    test("works: filtering", async function () {
        const resp = await request(app)
            .get("/byways")
            .query({ minLength: 3 });
        expect(resp.body).toEqual({
            byways: [
                {
                    name: "b3",
                    state: "s3",
                    length: "3",
                    designation: "desig3",
                    fees: "3",
                    image: "http://b3.img",
                    description: "desc3",
                    geographic_features: "geo3",
                  },
            ],
        });
    });

    test("not found for no such byway", async function () {
        const resp = await request(app).get(`/byways/nope`);
        expect(resp.statusCode).toEqual(404);
      });

})