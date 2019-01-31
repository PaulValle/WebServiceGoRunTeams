/* create database JSPROJECT */
CREATE TABLE usuario (
  idusuario SERIAL PRIMARY KEY,
  usuario VARCHAR(45) NOT NULL,
  pass VARCHAR(255) NOT NULL,
  nombre VARCHAR(45) NOT NULL);

CREATE TABLE equipos (
  idequipo SERIAL PRIMARY KEY,
  nombre VARCHAR(45) NOT NULL,
  detalle VARCHAR(255) NOT NULL);

CREATE TABLE usuariosxequipo (
  idusuariosxequipo SERIAL PRIMARY KEY,
  idequipo INTEGER NOT NULL,
  idusuario INTEGER NOT NULL);



INSERT INTO  usuario  (mail ,  pass ,  nombre ) VALUES ('deathpaul', 'paul', 'Paul Valle');











