console.log("server");

const express = require("express");
const app = express();
const db = require("./db/config.js");
const escape = require("pg-escape");
var bodyParser = require("body-parser");
app.use(bodyParser());
// app.use(bodyParser.urlencoded());

const port = process.env.PORT || 8080;

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

app.get("/beerBrands", (req, res) => {
    db.query("select * from beerbrand;", (err, dbRes) => {
        res.json(dbRes.rows);
    });
});

app.get("/beerTypes", (req, res) => {
    db.query("select * from beertype;", (err, dbRes) => {
        res.json(dbRes.rows);
    });
});
app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/pubs/beerbrand/:id", (req, res) => {
    var id = Number(req.params.id);
    db.query(
        `select distinct pub.id, pubname,LAT, Long, is_pub_ratedB from pub,rating where rating.beerbrand_id = ${id} and rating.pub_id = pub.id;`,
        (err, dbRes) => {
            res.json(dbRes.rows);
        }
    );
});
///pubs/beertype/
app.get("/pubs/beertype/:id", (req, res) => {
    var id = Number(req.params.id);
    db.query(
        `select distinct pub.id, pubname,LAT, Long, is_pub_ratedB from pub,rating where beertype = ${id} and rating.pub_id = pub.id;
    `,
        (err, dbRes) => {
            res.json(dbRes.rows);
        }
    );
});
app.get("/pubs/new", (req, res) => {
    res.render("pubs/new", {
        address: req.query,
    });
});

app.get("/beers/new/:id", (req, res) => {
    var pubInfo = null;
    var beertype = null;
    var beerbrand = null;
    var pubId = Number(req.params.id);
    console.log(`Pub Id here is ${pubId}`);
    db.query(`select * from pub where id=${pubId};`, function (err, dbres) {
        pubInfo = dbres.rows;
        console.log(pubInfo[0].pubname);
        db.query("Select * from beertype;", function (Err, dbres) {
            beertype = dbres.rows;
            console.log(beertype);
            db.query("select * from beerbrand;", function (Err, dbres) {
                beerbrand = dbres.rows;
                console.log(beerbrand);

                res.render("new", {
                    pubInfo: pubInfo,
                    beertypes: beertype,
                    beerbrands: beerbrand,
                });
            });
        });
    });
});

app.get("/beers/:id", (req, res) => {
    // console.log(req);
    let id = Number(req.params.id);
    var all_records = null;
    var pubInfo = null;
    db.query(
        `select avg(rating), beertype.beertype, beerbrand.beerbrand from rating, pub,beertype,beerbrand where rating.pub_id = pub.id and pub.id=${id} and beertype.id = rating.beertype and beerbrand.id = rating.beerbrand_id group by beertype.beertype,beerbrand.beerbrand;`,
        (err, dbres) => {
            all_records = dbres.rows;
            // console.log(`SELECT * from pub where id = ${id}`);
            db.query(`SELECT * from pub where id = ${id}`, (err, dbres) => {
                pubInfo = dbres.rows;
                console.log(`What do we see for pubinfo ${pubInfo}`);
                res.render("show", {
                    beerTypes: all_records,
                    pubInfo: pubInfo,
                });
            });
        }
    );
});
app.post("/rating/:id", (req, res) => {
    console.log(`HERE I AM within rating : id ${req}`);
    let id = Number(req.body.id);
    let beerType = Number(req.body.beerType);
    let beerbrand = Number(req.body.beerBrand);
    let rating = Number(req.body.rating);
    let today = new Date();
    let date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    db.query(
        `UPDATE pub SET is_pub_ratedB='T', date_last_review='${date}' WHERE pub.id = ${id};`,
        (err, dbres) => {
            all_records = dbres.rows;
            db.query(
                `INSERT INTO rating (rating, pub_id, beerbrand_id, beertype) VALUES (${rating},${id},${beerbrand},${beerType});`,
                (err, dbres) => {
                    all_records = dbres.rows;
                    res.redirect("/");
                }
            );
        }
    );
});

app.post("/pubs/new", (req, res) => {
    // let id = Number(req.body.id);
    let pubName = req.body.pubName;
    let street = req.body.streetAddress;
    let postCode = req.body.postCode;
    let suburb = req.body.suburb;
    let lat = Number(req.body.lat);
    let long = Number(req.body.long);

    let pubID = null;
    let sql = escape(`INSERT INTO pub (pubname,address,postcode,Suburb,is_pub_ratedB, LAT,Long) VALUES (%L,'${street}', ${postCode},'${suburb}',${false}, ${lat}, ${long});`, `${pubName}`);
    console.log(sql);
    db.query(
        sql,
        (err, dbRes) => {
            db.query(
                escape(`SELECT * from pub where pubname = (%L);`, `${pubName}`),
                (err, dbres) => {
                    pubID = dbres.rows[0].id;
                    res.redirect(`/beers/new/${pubID}`);
                }
            );
        }
    );
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
