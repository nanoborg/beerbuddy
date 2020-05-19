console.log("server");

const express = require("express");
const app = express();
const db = require("./db/config.js");

const port = 8080;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/api", (req, res) => {
    db.query('select * from pub;', (err, dbRes) => {
        
        res.json(dbRes.rows)
        
    })
});

app.get("/beers", (req, res) => {
    //res.send("Beer info here");
    var all_records = null;
    db.query("SELECT * from beertype;", (err, dbres) => {
        all_records = dbres.rows;
        //res.json(dbres.rows);
        //console.log("Hello");
        res.render("show", { beerTypes: all_records });
    });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
