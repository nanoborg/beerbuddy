drop database beerbuddy;

create database beerbuddy;

-- need to connect to database in psql
\c beerbuddy

-- now create the main tables.

CREATE TABLE pub (
    id SERIAL PRIMARY KEY,
    pubname TEXT,
    address TEXT,
    postcode INTEGER,
    Suburb TEXT,
    is_pub_ratedB BOOLEAN DEFAULT 'false',
    date_last_review DATE, 
    LAT DECIMAL,
    Long DECIMAL
    
);

CREATE TABLE beerbrand (
    id SERIAL PRIMARY KEY,
    beerbrand TEXT
);

CREATE TABLE beertype (
    id SERIAL PRIMARY KEY,
    beertype TEXT
);

CREATE TABLE rating (
    id SERIAL PRIMARY KEY,
    rating INTEGER,
    pub_id INTEGER,
    beerbrand_id INTEGER,
    beertype INTEGER,
    FOREIGN KEY (pub_id) REFERENCES pub (id), 
    FOREIGN KEY (beerbrand_id) REFERENCES beerbrand (id),
    FOREIGN KEY (beertype) REFERENCES beertype (id)
);
-- onchange dropdown event
select * from pub,rating,beerbrand where beerbrand = 'James Squire Nine Tales Amber Ake' and pub.id = rating.id and rating.beerbrand_id= beerbrand.id;

-- estblish pubs
INSERT INTO pub (pubname,address,postcode,Suburb,date_last_review, LAT,Long) VALUES ('Players On Lygon','192-202 Lygon Street',3053,'Carlton','2020-05-19',-37.8024641,144.9670937);
INSERT INTO pub (pubname,address,postcode,Suburb,date_last_review, LAT,Long) VALUES ('Bar Centrale','160-162 Lygon Street',3053,'Carlton','2020-05-19',-37.80344128,144.9667701);
INSERT INTO pub (pubname,address,postcode,Suburb,date_last_review, LAT,Long) VALUES ('Percys Bar & Bistro','414-422 Lygon Street',3053,'Carlton','2020-05-19',-37.79694543,144.9678124);
INSERT INTO pub (pubname,address,postcode,Suburb,date_last_review, LAT,Long) VALUES ('Royce On St Kilda Road','375-385 St Kilda Road',3004,'Melbourne','2020-05-19',-37.83508258,144.9754922);

-- establish beer types
INSERT INTO beertype (beertype) VALUES ('Amber Ale');
INSERT INTO beertype (beertype) VALUES ('Dark Beer');
INSERT INTO beertype (beertype) VALUES ('Belgian');
INSERT INTO beertype (beertype) VALUES ('Pale Ale');
INSERT INTO beertype (beertype) VALUES ('Lager');
INSERT INTO beertype (beertype) VALUES ('Stout');
INSERT INTO beertype (beertype) VALUES ('Pilsner');

-- amber ale 
INSERT INTO beerbrand (beerbrand) VALUES ('James Squire Nine Tales Amber Ake');
INSERT INTO beerbrand (beerbrand) VALUES ('Chimay Premier Amber Ale');
INSERT INTO beerbrand (beerbrand) VALUES ('Stoke Amber Ale');
-- dark beer
INSERT INTO beerbrand (beerbrand) VALUES ('White Rabit Dark');
INSERT INTO beerbrand (beerbrand) VALUES ('Cavalier Brown Ale');
-- belgian
INSERT INTO beerbrand (beerbrand) VALUES ('Chimay Blue');
INSERT INTO beerbrand (beerbrand) VALUES ('La Trappe Quadrupel');
-- pale ale
INSERT INTO beerbrand (beerbrand) VALUES ('Colonial');
INSERT INTO beerbrand (beerbrand) VALUES ('Coopers');
INSERT INTO beerbrand (beerbrand) VALUES ('Cricketers Arms');
-- lager
INSERT INTO beerbrand (beerbrand) VALUES ('Fosters');
INSERT INTO beerbrand (beerbrand) VALUES ('Tooheys New');
INSERT INTO beerbrand (beerbrand) VALUES ('XXXX Gold');
INSERT INTO beerbrand (beerbrand) VALUES ('Crown');
INSERT INTO beerbrand (beerbrand) VALUES ('VB');
INSERT INTO beerbrand (beerbrand) VALUES ('Carlton Draught');
INSERT INTO beerbrand (beerbrand) VALUES ('Sapporo');
INSERT INTO beerbrand (beerbrand) VALUES ('Asahi');
INSERT INTO beerbrand (beerbrand) VALUES ('Pure Blonde');
-- stout
INSERT INTO beerbrand (beerbrand) VALUES ('Guiness');
-- pilsner
INSERT INTO beerbrand (beerbrand) VALUES ('Heineken');
INSERT INTO beerbrand (beerbrand) VALUES ('Carlsberg');

-- ratings
INSERT INTO rating (rating,pub_id,beerbrand_id,beertype) VALUES (5,1,1,1);
INSERT INTO rating (rating,pub_id,beerbrand_id,beertype) VALUES (4,2,1,2);
INSERT INTO rating (rating,pub_id,beerbrand_id,beertype) VALUES (3,1,1,1);
INSERT INTO rating (rating,pub_id,beerbrand_id,beertype) VALUES (4,2,1,1);
INSERT INTO rating (rating,pub_id,beerbrand_id,beertype) VALUES (2,2,1,2);
INSERT INTO rating (rating,pub_id,beerbrand_id,beertype) VALUES (3,2,1,2);

-- updates to ratings to test SQL logic for inserting rating and pub update
INSERT INTO rating (rating, pub_id, beerbrand_id, beertype) VALUES (5,1,1,2);
INSERT INTO rating (rating, pub_id, beerbrand_id, beertype) VALUES (4,1,1,3);
INSERT INTO rating (rating, pub_id, beerbrand_id, beertype) VALUES (3,1,1,4);
INSERT INTO rating (rating, pub_id, beerbrand_id, beertype) VALUES (2,1,1,5);
INSERT INTO rating (rating, pub_id, beerbrand_id, beertype) VALUES (1,1,1,6);
INSERT INTO rating (rating, pub_id, beerbrand_id, beertype) VALUES (5,1,1,6);

UPDATE pub SET is_pub_ratedB='T', date_last_review='2020-05-20' WHERE pub.id = 1;