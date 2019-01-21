/* create database JSPROJECT */
CREATE TABLE usuario (
  idusuario SERIAL PRIMARY KEY,
  usuario VARCHAR(45) NOT NULL,
  pass VARCHAR(255) NOT NULL,
  nombre VARCHAR(45) NOT NULL);

INSERT INTO  usuario  (usuario ,  pass ,  nombre ) VALUES ('deathpaul', 'paul', 'Paul Valle');











