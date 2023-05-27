"use strict";

const db = require("../db");
const { NotFoundError, BadRequestError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Byway {

    static async findAll(searchFilters = {}) {
        let query = 'SELECT name, state, length, designation, fees, image, description, geographic_features AS "geographicFeatures" FROM byways';
    
        let whereExpressions = [];
        let queryValues = [];
        console.log(searchFilters)
        const { name, minLength, maxLength, geoFeaturesSelect} = searchFilters;

        if (name) {
            queryValues.push(`%${name}%`);
            whereExpressions.push(`name ILIKE $${queryValues.length}`);
        }

        if (maxLength > 0 && minLength > maxLength) {
            throw new BadRequestError("Minimum Length can't be greater than Maximum Length");
        }
        // want to be sure that a user can enter a number in minLength and not maxLength without causing an error

        if (parseInt(minLength) > 0) {
            queryValues.push(minLength);
            whereExpressions.push(`length >= $${queryValues.length}`);
        }
        // length in the byways table was created as text, need to turn that string into an int with parseInt

        if (parseInt(maxLength) > 0) {
            queryValues.push(maxLength);
            whereExpressions.push(`length <= $${queryValues.length}`);
        }

        const orExpressions = [];

        if(geoFeaturesSelect && geoFeaturesSelect.length > 0) {
            console.log(geoFeaturesSelect)
            geoFeaturesSelect.forEach(i => {
                queryValues.push(`%${i}%`);
                whereExpressions.push(`geographic_features ILIKE $${queryValues.length}`)
                // pushes each selected geo feature to the where expressions array
                // ILIKE is same as 'like' but doesn't pay attention to letter case
            })
            // this is a lot simpler than doing individual if statements for each geo feature, like if (urban != undefined) push urban to queryValues
        }

        // console.log(orExpressions, geoFeaturesSelect,geoFeaturesSelect.length > 0)

        if (orExpressions.length > 0) {
           whereExpressions.push('(' + orExpressions.join(' OR ') + ')');
        }
        if (whereExpressions.length > 0) {
            query += " WHERE " + whereExpressions.join(" AND ");
            }

        query += " ORDER BY name";
        console.log(query);
        const bywaysRes = await db.query(query, queryValues);
        return bywaysRes.rows;

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

    static async getByway(name) {
        let query = 'SELECT id, name, state, length, designation, fees, image, description, geographic_features AS "geographicFeatures" FROM byways WHERE name = $1';
        
        const response = await db.query(query, [name])        
        if (!response) {
            throw new NotFoundError("There is no byway by that name")
        }
        return response.rows[0]

    }

    static async getAllByways() {
        let query = 'SELECT id, name, state, length, designation, fees, image, description, geographic_features AS "geographicFeatures" FROM byways';

        const response = await db.query(query)
        return response.rows

    }

    static async getCommentsByByway(byway_id) {
        // get all comments by byway
        let query = 'SELECT comment, username, byway_id, create_at FROM comments JOIN byways ON comments.byway_id = byways.id WHERE byway_id = $1';

        const response = await db.query(query, [byway_id])
        return response.rows
    }

    static async makeComment(byway_id, comment, username) {
        console.log(username)
        const result = await db.query(
            `INSERT INTO comments(comment, username, byway_id, create_at)
            VALUES ($1, $2, $3, now())
            RETURNING comment, username, byway_id, create_at`,
            [
                comment,
                username,
                byway_id,
            ],
        );

        return result.rows[0];
    }

    static async getRandomByway() {
        const query = 'SELECT name, state, length, designation, fees, image, description, geographic_features AS "geographicFeatures" FROM byways ORDER BY random() LIMIT 1';

        const response = await db.query(query);        

        // return response.rows[0];
        return response.rows[0];
    }



}

module.exports = Byway;