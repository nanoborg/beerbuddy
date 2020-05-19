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
    res.send("Beef info here");
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
