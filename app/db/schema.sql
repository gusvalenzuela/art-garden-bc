### Schema
DROP DATABASE IF EXISTS artgarden;

CREATE DATABASE artgarden;

USE artgarden;

DROP TABLE if exists users;

DROP TABLE if exists artwork;

DROP TABLE if exists requests;

CREATE TABLE users(
    id int AUTO_INCREMENT NOT NULL,
    `name` varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE requests(
    id int AUTO_INCREMENT NOT NULL,
    title varchar(255) NOT NULL,
    body varchar(255) NOT NULL,
    price DECIMAL (10, 2),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- acceptor_id INT 
    requestor_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (requestor_id) REFERENCES users(id)
);

CREATE TABLE artwork(
    id int AUTO_INCREMENT NOT NULL,
    title varchar(255) NOT NULL,
    `description` TEXT,
    style varchar(255) NULL,
    category varchar(255) NULL,
    artist_id INT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (artist_id) REFERENCES users(id)
);