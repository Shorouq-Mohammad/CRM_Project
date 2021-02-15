USE crmproject;

CREATE TABLE owner (
    id INT AUTO_INCREMENT PRIMARY KEY,
    owner VARCHAR(40)
);

CREATE TABLE country (
    id INT AUTO_INCREMENT PRIMARY KEY,
    country VARCHAR(40)
);

CREATE TABLE email_type(
    id INT AUTO_INCREMENT PRIMARY KEY,
    email_type VARCHAR(1)
);

CREATE TABLE client(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    last VARCHAR(40),
    first VARCHAR(40),
    email VARCHAR(40),
    sold BOOLEAN,
    date VARCHAR(40),
    email_type_id INT,
    owner_id INT,
    country_id INT,

    FOREIGN KEY(email_type_id) REFERENCES email_type(id),
    FOREIGN KEY(owner_id) REFERENCES owner(id),
    FOREIGN KEY(country_id) REFERENCES country(id)
);

