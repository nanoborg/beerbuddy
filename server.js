console.log("server");

const express = require("express");
const app = express();
const db = require("./db/config.js");

const port = 8080;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/pubs", (req, res) => {
    db.query('select * from pub;', (err, dbRes) => {
        
        res.json(dbRes.rows)
        
    })
});

app.get("/beers/:id", (req, res) => {
    //res.send("Beer info here");
    console.log(req.params.id)
    var all_records = null;
    db.query("select avg(rating), beertype.beertype, beerbrand.beerbrand from rating, pub,beertype,beerbrand where rating.pub_id = pub.id and pub.id=2 and beertype.id = rating.beertype and beerbrand.id = rating.beerbrand_id group by beertype.beertype,beerbrand.beerbrand;", (err, dbres) => {
    all_records = dbres.rows;
    //res.json(dbres.rows);
    //console.log("Hello");
    res.render("show", { beerTypes: all_records });
    });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
