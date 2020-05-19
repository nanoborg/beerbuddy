console.log("server");

const express = require("express");
const app = express();
const db = require("./db/config.js");

const port = 8080;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/pubs", (req, res) => {
    db.query("select * from pub;", (err, dbRes) => {
        res.json(dbRes.rows);
    });
});

app.get("/beers/:id", (req, res) => {
    //res.send("Beer info here");
    console.log(req.params.id);
    var all_records = null;
    db.query(
        "select avg(rating), beertype.beertype, beerbrand.beerbrand from rating, pub,beertype,beerbrand where rating.pub_id = pub.id and pub.id=2 and beertype.id = rating.beertype and beerbrand.id = rating.beerbrand_id group by beertype.beertype,beerbrand.beerbrand;",
        (err, dbres) => {
            all_records = dbres.rows;
            //res.json(dbres.rows);
            //console.log("Hello");
            res.render("show", { beerTypes: all_records });
        }
    );
});

app.get("/beers/new", (req, res) => {
    // obtain the correct pub
    var pubInfo = null;
    db.query("select * from pub where id=1;", (err, dbres) => {
        pubInfo = dbres.rows;
        //return dbres.rows;

        // obtain all beer types
        // var allBeerTypes = null;
        // db.query("SELECT * from beertype;", (err, dbres) => {
        //     allBeerTypes = dbres.rows;
        // });
        // // obtain all beer brands
        // var allBeerBrands = null;
        // db.query("SELECT * from beerbrand;", (err, dbres) => {
        //     allBeerBrands = dbres.rows;
        // });

        // console.log(allBeerTypes);
        // console.log(allBeerBrands);
        res.render("new", {
            // allBeerBrands: allBeerBrands,
            // allBeerTypes: allBeerTypes,
            pubInfo: pubInfo,
        });
    });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
