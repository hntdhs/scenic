if (typeof global.TextEncoder === 'undefined') {
    const { TextEncoder } = require('util');
    global.TextEncoder = TextEncoder;
}

const Byway = require("./byway.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


// want to test findAll with a minimumLength and other filters, find byways by state, find single byway, making a comment, get all states
// INSERT INTO byways(name, state, length, designation, fees, image, description, geographic_features)
// VALUES (byway1, state1, 1, desig1, fees1, 'http://byway1.img', desc1, features1), (byway2, state2, 2, desig2, fees2, 'http://byway2.img', desc2, features2), (byway3, state3, 3, desig1, fees3, 'http://byway3.img', desc3, features3) 

describe("findAll", function() {
    test("getting all byways works", async function () {
        let byways = await Byway.findAll();
        expect(byways).toEqual([
            {
                name: "byway1",
                state: "state1",
                length: 1,
                designation: "desig1",
                fees: "fees1",
                image: "http://byway1.img",
                description: "desc1",
                geographic_features: "features1",
            },
            {
                name: "byway2",
                state: "state2",
                length: 2,
                designation: "desig2",
                fees: "fees2",
                image: "http://byway2.img",
                description: "desc2",
                geographic_features: "features2",
            },
            {
                name: "byway3",
                state: "state3",
                length: 3,
                designation: "desig1",
                fees: "fees3",
                image: "http://byway3.img",
                description: "desc3",
                geographic_features: "features3",
            },
        ]);
    });

    test("searching by min length works", async function() {
        let byways = await Byway.findAll({ minLength: 3 });
        delete byways[0].id
        expect(byways).toEqual([
            {
                name: "byway3",
                state: "state3",
                length: 3,
                designation: "desig1",
                fees: "fees3",
                image: "http://byway3.img",
                description: "desc3",
                geographic_features: "features3",
            },
        ]);
    })

    test("searching by name works", async function() {
        let byways = await Byway.findAll({ name: 'byway1' });
        delete byways[0].id
        expect(byways).toEqual([
            {
                name: "byway1",
                state: "state1",
                length: 1,
                designation: "desig1",
                fees: "fees1",
                image: "http://byway1.img",
                description: "desc1",
                geographic_features: "features1",
            },
        ]);
    });
});

describe("getByway", function() {
    test("getting single byway works", async function () {
        let byway = await Byway.getByway("byway1");
        delete byway.id
        expect(byway).toEqual(
            {
                name: "byway1",
                state: "state1",
                length: 1,
                designation: "desig1",
                fees: "fees1",
                image: "http://byway1.img",
                description: "desc1",
                geographic_features: "features1",
            },
        );
    });
});

describe("findBywaysByState", function() {
    test("getting byways by state works", async function () {
        let byway = await Byway.findBywaysByState("state2");
        expect(byway).toEqual([
            {
                name: "byway2",
                state: "state2",
                length: 2,
                "fees": "fees2",
                designation: "desig2",
                image: "http://byway2.img",
                description: "desc2",
                geographic_features: "features2",
            },
        ]);
    });
});

// {
//     name: "",
//     state: "",
//     length: "",
//     designation: "",
//     fees: "",
//     image: "",
//     description: "",
//     geographic_features: "",
// }