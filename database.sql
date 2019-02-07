/* create database JSPROJECT */
CREATE TABLE usuario (
  idusuario SERIAL PRIMARY KEY,
  usuario VARCHAR(45) NOT NULL,
  pass VARCHAR(255) NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  rol VARCHAR(45) NOT NULL,
  celular VARCHAR(45) NOT NULL);

CREATE TABLE equipos (
  idequipo SERIAL PRIMARY KEY,
  identrenador INTEGER NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  detalle VARCHAR(255) NOT NULL);

CREATE TABLE usuariosxequipo (
  idusuariosxequipo SERIAL PRIMARY KEY,
  idequipo INTEGER NOT NULL,
  idusuario INTEGER NOT NULL);

CREATE TABLE recorridos (
  idrecorrido SERIAL PRIMARY KEY,
  idusuario INTEGER NOT NULL,
  fecha VARCHAR(255) NOT NULL,
  tiempo VARCHAR(255) NOT NULL,
  distancia VARCHAR(255) NOT NULL);



INSERT INTO  usuario  (mail ,  pass ,  nombre ) VALUES ('deathpaul', 'paul', 'Paul Valle');











