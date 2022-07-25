

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE veterinaria;

USE veterinaria;


CREATE TABLE `administradores` (
  `id` int(11) NOT NULL,
  `usuario` varchar(30) NOT NULL,
  `contrasena` varchar(4) NOT NULL,
  `administrador` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



INSERT INTO `administradores` (`id`, `usuario`, `contrasena`, `administrador`) VALUES
(0, 'root', '9043', 'si'),
(1, 'alfonso', '3242', 'no'),
(2, 'leo', '1234', 'no'),
(3, 'javier', '1234', 'no'),
(4, 'diego', '1234', 'no');



CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `direccion` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



INSERT INTO `clientes` (`id_cliente`, `nombre`, `telefono`, `direccion`) VALUES
(0, 'Leonardo', '9612428401', 'Lado oriente'),
(1, 'Javier', '9615440033', 'Lado sur'),
(2, 'Diego Perez', '9616362344', 'Lado Norte'),
(3, 'Diego', '961248743', 'Zona centro'),
(4, 'Raul ', '9613563465', 'Lado central'),
(5, 'Diego Perez', '9613456322', 'Centro'),
(6, 'Diana', '9615463366', 'Poniente'),
(7, 'Edgar', '9614639495', 'Oriente'),
(8, 'Fernando', '9614838321', 'Lado sur'),
(9, 'Javier', '9614346933', 'Lado sur Oriente'),
(10, 'Abram', '961479444', 'Centro');


CREATE TABLE `mascotas` (
  `id_mascota` int(11) NOT NULL,
  `especie` varchar(20) NOT NULL,
  `raza` varchar(20) NOT NULL,
  `edad` varchar(80) NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `informacion_adicional` varchar(120) NOT NULL,
  `nombre_cliente` varchar(80) NOT NULL,
  `id_cliente` int(10) NOT NULL,
  `fecha_entrada` date NOT NULL,
  `fecha_salida` date NOT NULL,
  `costo` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



INSERT INTO `mascotas` (`id_mascota`, `especie`, `raza`, `edad`, `nombre`, `informacion_adicional`, `nombre_cliente`, `id_cliente`, `fecha_entrada`, `fecha_salida`, `costo`) VALUES
(0, 'Perro', 'Husky', '5 meses', 'Laila', 'Lomo cafe con negro', 'Leonardo', 0, '2022-07-19', '2022-07-20', 250),
(1, 'Gato', 'Angora', '8 meses', 'Cati', 'Pata derecha blanca', 'Javier', 1, '2022-07-19', '2022-07-20', 250),
(2, 'Hamster', 'No aplica', '1 año', 'Cacho', 'Color cafe oscuro', 'Diego Perez', 2, '2022-07-19', '2022-07-21', 500),
(3, 'Gato', 'Egipcia', '3 años', 'Rex', 'No', 'Diego', 3, '2022-07-20', '2022-07-22', 500),
(4, 'Conejo', 'No aplica', '9 meses', 'Mora', 'Blanco con negro', 'Raul ', 4, '2022-07-20', '2022-07-21', 250),
(5, 'Gato', 'Persa', '1 año', 'Rey', 'Grande y gordo', 'Diego Perez', 5, '2022-07-20', '2022-07-21', 250),
(6, 'Conejo', 'No aplica', '10 meses', 'Paco', 'blanco', 'Diana', 6, '2022-07-20', '2022-07-22', 500),
(7, 'perro', 'labrador', '2 años', 'checo', 'Delgado', 'Edgar', 7, '2022-07-20', '2022-07-22', 500),
(8, 'Perro', 'Beagle', '2 años', 'Conie', 'Es pequeña', 'Fernando', 8, '2022-07-23', '2022-07-24', 250),
(9, 'Iguana', 'No aplica', '1 año', 'Luigi', 'Es pequeño', 'Javier', 9, '2022-07-24', '2022-07-25', 250),
(10, 'Gato', 'Siberiano', '18 meses', 'Malina', 'Pelaje esponjado manchas grises', 'Abram', 10, '2022-07-24', '2022-07-28', 1000);


ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `usuario` (`usuario`);


ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`);


ALTER TABLE `mascotas`
  ADD PRIMARY KEY (`id_mascota`),
  ADD KEY `id_cliente` (`id_cliente`);


ALTER TABLE `administradores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;



ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;



ALTER TABLE `mascotas`
  MODIFY `id_mascota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;
COMMIT;


ALTER TABLE `mascotas`
  ADD CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;