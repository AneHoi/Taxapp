DROP TABLE IF EXISTS TaxApp.TaxiCompanies;
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

SELECT * FROM TaxApp.TaxiCompanies;