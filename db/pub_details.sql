
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

insert into pub (pubname, LAT, Long) values ('Players On Lygon', -37.80246412, 144.9670937);

insert into pub (pubname, LAT, Long, is_pub_ratedB) values ('Bar Centrale', -37.80344128, 144.9667701, true);

insert into pub (pubname, LAT, Long) values ('Percys Bar & Bistro', -37.79694543, 144.9678124);

insert into pub (pubname, LAT, Long) values ('Court House Hotel', -37.80287774, 144.9499555);

insert into pub (pubname, LAT, Long) values ('Clare Castle Hotel', -37.79652019, 144.9704269);