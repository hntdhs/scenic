"use strict";

const db = require("../db");
const { NotFoundError, BadRequestError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Byway {

    static async findAll(searchFilters = {}) {
        let query = 'SELECT name, state, length, designation, fees, image, description, geographic_features AS "geographicFeatures" FROM byways';
    // from findAll method in jobly company.js model, will need to have a closer look
    // let whereExpressions = [];
    // let queryValues = [];

    // const { minEmployees, maxEmployees, name } = searchFilters;
    }

    static async getAllStates(name) {
        let query = 'SELECT name, nickname, image FROM states';
        const response =  await db.query(query)
        return response.rows
    }

    static async findBywaysByState(state)  {
        let query = 'SELECT name, state, length, designation, fees, image, description, geographic_features AS "geographicFeatures" FROM byways WHERE state like $1';

        const response = await db.query(query, [`%${state}%`])
        return response.rows

        // if (!rows) throw new NotFoundError(`No results`);
    }

    // for individual byway pages
    // static async getByway(name) {
    //     const bywayRes = await db.query(
    //         'SELECT name, state, length, designation, fees, image, description, geographic_features AS "geographicFeatures" FROM byways WHERE name = $1', [name]
    //     );

    //     const byway = bywayRes.rows[0];
    //     return byway.rows;

    //     if (!byway) throw new NotFoundError(`No byway: ${name}`);

    // }

    static async getByway(name) {
        let query = 'SELECT name, state, length, designation, fees, image, description, geographic_features AS "geographicFeatures" FROM byways WHERE name = $1';
        
        const response = await db.query(query, [name])        
        if (!response) {
            throw new NotFoundError("There is no byway by that name")
        }
        return response.rows[0]

    }

    static async getAllByways() {
        let query = 'SELECT name, state, length, designation, fees, image, description, geographic_features AS "geographicFeatures" FROM byways';

        const response = await db.query(query)
        return response.rows

    }

    static async getCommentsByByway(byway) {
        // get all commentsby byway
    }

    static async makeComment(byway, comment, username) {
        console.log(username)
        const result = await db.query(
            `INSERT INTO comments(comment, username, byway, create_at)
            VALUES ($1, $2, $3, now())
            RETURNING comment, username, byway, create_at`,
            [
                comment,
                username,
                byway,
            ],
        );

        return result.rows[0];

    }

    // find by state, create, delete, findAll (search queries), update

}

module.exports = Byway;