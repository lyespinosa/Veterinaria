-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-07-2022 a las 15:35:08
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `veterinaria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `id` int(11) NOT NULL,
  `usuario` varchar(30) NOT NULL,
  `contrasena` varchar(4) NOT NULL,
  `administrador` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`id`, `usuario`, `contrasena`, `administrador`) VALUES
(0, 'root', '9043', 'si'),
(1, 'alfonso', '3242', 'no'),
(23, 'leo', '1234', 'no'),
(24, 'javier', '1234', 'no'),
(25, 'diego', '1234', 'no');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `direccion` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `nombre`, `telefono`, `direccion`) VALUES
(20, 'Leonardo', '9612428401', 'Lado oriente'),
(21, 'Javier', '9615440033', 'Lado sur'),
(22, 'Diego Perez', '9616362344', 'Lado Norte'),
(23, 'Diego', '961248743', 'Zona centro'),
(24, 'Diego', '961248743', 'Zona centro'),
(25, 'Diego', '961248743', 'Zona centro'),
(26, 'Diego', '961248743', 'Zona centro'),
(27, 'Diego', '961248743', 'Zona centro'),
(28, 'Diego', '961248743', 'Zona centro'),
(29, 'Raul ', '9613563465', 'Lado central'),
(30, 'Diego Perez', '9613456322', 'Centro'),
(31, 'Diana', '9615463366', 'Poniente'),
(32, 'Edgar', '9614639495', 'Oriente'),
(33, 'Aaron', '9614454334', 'Centro sur'),
(35, 'Fernando', '9614838321', 'Lado sur'),
(36, 'Javier', '9614346933', 'Lado sur Oriente'),
(37, 'Abram', '961479444', 'Centro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

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

--
-- Volcado de datos para la tabla `mascotas`
--

INSERT INTO `mascotas` (`id_mascota`, `especie`, `raza`, `edad`, `nombre`, `informacion_adicional`, `nombre_cliente`, `id_cliente`, `fecha_entrada`, `fecha_salida`, `costo`) VALUES
(20, 'Perro', 'Husky', '5 meses', 'Laila', 'Lomo cafe con negro', 'Leonardo', 20, '2022-07-19', '2022-07-20', 250),
(21, 'Gato', 'Angora', '8 meses', 'Cati', 'Pata derecha blanca', 'Javier', 21, '2022-07-19', '2022-07-20', 250),
(22, 'Hamster', 'No aplica', '1 año', 'Cacho', 'Color cafe oscuro', 'Diego Perez', 22, '2022-07-19', '2022-07-21', 500),
(23, 'Gato', 'Egipcia', '3 años', 'Rex', 'No', 'Diego', 28, '2022-07-20', '2022-07-22', 500),
(24, 'Conejo', 'No aplica', '9 meses', 'Mora', 'Blanco con negro', 'Raul ', 29, '2022-07-20', '2022-07-21', 250),
(25, 'Gato', 'Persa', '1 año', 'Rey', 'Grande y gordo', 'Diego Perez', 30, '2022-07-20', '2022-07-21', 250),
(26, 'Conejo', 'No aplica', '10 meses', 'Paco', 'blanco', 'Diana', 31, '2022-07-20', '2022-07-22', 500),
(27, 'perro', 'labrador', '2 años', 'checo', 'Delgado', 'Edgar', 32, '2022-07-20', '2022-07-22', 500),
(30, 'Perro', 'Beagle', '2 años', 'Conie', 'Es pequeña', 'Fernando', 35, '2022-07-23', '2022-07-24', 250),
(31, 'Iguana', 'No aplica', '1 año', 'Luigi', 'Es pequeño', 'Javier', 36, '2022-07-24', '2022-07-25', 250),
(32, 'Gato', 'Siberiano', '18 meses', 'Malina', 'Pelaje esponjado manchas grises', 'Abram', 37, '2022-07-24', '2022-07-28', 1000);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD PRIMARY KEY (`id_mascota`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administradores`
--
ALTER TABLE `administradores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `id_mascota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
