const pg = require("pg");

const pool = new pg.Pool({
    database: "beerbuddy",
    // for Shallesh....
    // password: ''
});

module.exports = {
    query: (sql, params, callback) => {
        return pool.query(sql, params, callback);
    },
};
