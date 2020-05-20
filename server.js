console.log("server");

const express = require("express");
const app = express();
const db = require("./db/config.js");

const port = 8080;

app.set("view engine", "ejs");

app.use(express.static("public"));

// app.get("/", (req, res ) => {
//     res.render("filename go here")
// })

app.get("/pubs", (req, res) => {
    db.query("select * from pub;", (err, dbRes) => {
        res.json(dbRes.rows);
    });
});

app.get('/pubs/new', (req, res) => {
    // req.query.currentLocation
    res.render('pubs/new', {
        currentLocation: req.query.currentLocation
    })
})

app.get("/beers/new", (req, res) => {
    // // obtain the correct pub
    var pubInfo = null;
    var beertype = null;
    var beerbrand = null;
    db.query("select * from pub where id=1;", function (err, dbres) {
        pubInfo = dbres.rows;
        console.log(pubInfo[0].pubname);
        db.query("Select * from beertype;", function (Err, dbres) {
            //return dbres.rows;
            beertype = dbres.rows;
            console.log(beertype);
            db.query("select * from beerbrand;", function (Err, dbres) {
                //return dbres.rows;
                beerbrand = dbres.rows;
                console.log(beerbrand);

                res.render("new", {
                    // allBeerBrands: allBeerBrands,
                    // allBeerTypes: allBeerTypes,
                    pubInfo: pubInfo,
                    beertypes: beertype,
                    beerbrands: beerbrand,
                });
            });
        });
    });

    // // obtain all beer types
    // var allBeerTypes = null;
    // db.query("SELECT * from beertype;", (err, dbres) => {
    //     allBeerTypes = dbres.rows;
    //     console.log(allBeerTypes);
    // });
    // // obtain all beer brands
    // var allBeerBrands = null;
    // db.query("SELECT * from beerbrand;", (err, dbres) => {
    //     allBeerBrands = dbres.rows;
    //     console.log(allBeerBrands);
    // });

    // // console.log(allBeerTypes);
    // // console.log(allBeerBrands);
    // res.render("new", {
    //     // allBeerBrands: allBeerBrands,
    //     // allBeerTypes: allBeerTypes,
    //     pubInfo: pubInfo,
    // });
});

app.get("/beers/:id", (req, res) => {
    //res.send("Beer info here");
    console.log(req.params.id);
    var all_records = null;
    db.query(
        "select avg(rating), beertype.beertype, beerbrand.beerbrand from rating, pub,beertype,beerbrand where rating.pub_id = pub.id and pub.id=1 and beertype.id = rating.beertype and beerbrand.id = rating.beerbrand_id group by beertype.beertype,beerbrand.beerbrand;",
        (err, dbres) => {
            all_records = dbres.rows;
            //res.json(dbres.rows);
            //console.log("Hello");
            res.render("show", { beerTypes: all_records });
        }
    );
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
