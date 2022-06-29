-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-06-2022 a las 08:53:55
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
  `usuario` varchar(30) NOT NULL,
  `contrasena` varchar(4) NOT NULL,
  `tipo de cuenta` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`usuario`, `contrasena`, `tipo de cuenta`) VALUES
('alfonso', '3242', 'cuenta normal, no puede no puede borrar ni agregar cuentas'),
('root', '9043', 'cuenta de superusuario tiene acceso a eliminar y agregar cuentas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_clientes` varchar(10) NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `direccion` varchar(120) NOT NULL,
  `id_mascota` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

CREATE TABLE `mascotas` (
  `id_mascotas` varchar(10) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `raza` varchar(20) NOT NULL,
  `edad` varchar(80) NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `informacion_adicional` varchar(120) NOT NULL,
  `nombre_cliente` varchar(80) NOT NULL,
  `id_cliente` varchar(10) NOT NULL,
  `hora_ingreso` date NOT NULL,
  `dias_estancia` int(11) NOT NULL,
  `hora_salida` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`usuario`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_clientes`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
