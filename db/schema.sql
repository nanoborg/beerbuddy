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
    rating TEXT,
    pub_id INTEGER,
    beerbrand_id INTEGER,
    beertype INTEGER,
    FOREIGN KEY (pub_id) REFERENCES pub (id), 
    FOREIGN KEY (beerbrand_id) REFERENCES beerbrand (id),
    FOREIGN KEY (beertype) REFERENCES beertype (id)
);

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

