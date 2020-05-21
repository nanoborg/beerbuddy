const pg = require("pg");

let pool;

if (process.env.PRODUCTION) {
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
    })
} else if (process.env.UBUNTU_DB_PASSWORD) {
    pool = new pg.Pool({
        database: "beerbuddy",
        password: process.env.UBUNTU_DB_PASSWORD,
        multipleStatements: true,
    })
} else {
    pool = new pg.Pool({
        database: "beerbuddy",
    })
}

// original code before heroku test!!!
// if (process.env.UBUNTU_DB_PASSWORD) {
//     pool = new pg.Pool({
//         database: "beerbuddy",
//         password: process.env.UBUNTU_DB_PASSWORD,
//         multipleStatements: true,
//     });
        
// } else {
//     pool = new pg.Pool({
//         database: "beerbuddy",
//         multipleStatements: true,
//     });
// }

module.exports = {
    query: (sql, params, callback) => {
        return pool.query(sql, params, callback);
    },
};
