
CREATE DATABASE proyecto

USE proyecto;
CREATE TABLE vehiculo(
    id INT IDENTITY(1,1) primary key,
    capacidad INT, 
    combustible INT,
    recorrido INT,
    inicio  char(10),
    final  char(10),
    )
CREATE TABLE piloto(
    id int  IDENTITY(1,1) PRIMARY key,
    nombre char(20),
    viaticos  char(10),
    gastos_adicionales  char(10),
    inicio  char(10),
    final  char(10),
    
)
CREATE TABLE viaje(
     tipo_carga  char(20),
     encargado char(20),
     carro char(20),
    inicio  char(10),
    final  char(10),
)

DROP TABLE viaje

DROP TABLE vehiculo
DROP TABLE piloto
