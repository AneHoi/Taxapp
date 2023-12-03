DROP TABLE IF EXISTS TaxApp.TaxiCompanies;
DROP TABLE IF EXISTS TaxApp.password_hash;
DROP TABLE IF EXISTS TaxApp.users;

DROP SCHEMA IF EXISTS TaxApp;

CREATE SCHEMA TaxApp;
CREATE TABLE TaxApp.TaxiCompanies
(
    taxiID        SERIAL PRIMARY KEY,
    companyName   varchar(20) NOT NULL,
    startPrice    float       NOT NULL,
    kmPrice       float       NOT NULL,
    minPrice      float       NOT NULL,
    companyImgUrl varchar(1000)
);

INSERT INTO TaxApp.TaxiCompanies (companyName, startPrice, kmPrice, minPrice) VALUES ('FalseTaxi', 25, 13, 7);
INSERT INTO TaxApp.TaxiCompanies (companyName, startPrice, kmPrice, minPrice) VALUES ('MockTaxi', 15, 15, 9);
INSERT INTO TaxApp.TaxiCompanies (companyName, startPrice, kmPrice, minPrice) VALUES ('DefinitelyNotATaxi', 25, 15 ,9);


create table TaxApp.users (
    id          SERIAL          PRIMARY KEY,
    full_name   VARCHAR(50)     NOT NULL,
    tlfnumber   INT,
    email       VARCHAR(50)     NOT NULL UNIQUE
);

create table TaxApp.password_hash (
    user_id         integer,                            
    hash            VARCHAR(350)    NOT NULL,
    salt            VARCHAR(180)    NOT NULL,
    algorithm       VARCHAR(12)     NOT NULL,
    FOREIGN KEY(user_id) REFERENCES TaxApp.users(id)
);

SELECT * FROM TaxApp.users;
SELECT * FROM TaxApp.password_hash;
SELECT * FROM TaxApp.TaxiCompanies;