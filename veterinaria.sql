-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-07-2022 a las 20:34:25
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
(2, 'diego', '1234', 'si'),
(3, 'javier', '1234', 'si'),
(16, 'darinel', '1234', 'si');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
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
  `id_mascota` int(11) NOT NULL,
  `especie` varchar(20) NOT NULL,
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

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `t_vista_a`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `t_vista_a` (
`id` int(11)
,`usuario` varchar(30)
,`administrador` varchar(2)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `t_vista_b`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `t_vista_b` (
`usuario` varchar(30)
,`contrasena` varchar(4)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `t_vista_c`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `t_vista_c` (
`usuario` varchar(30)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `t_vista_a`
--
DROP TABLE IF EXISTS `t_vista_a`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `t_vista_a`  AS SELECT `administradores`.`id` AS `id`, `administradores`.`usuario` AS `usuario`, `administradores`.`administrador` AS `administrador` FROM `administradores``administradores`  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `t_vista_b`
--
DROP TABLE IF EXISTS `t_vista_b`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `t_vista_b`  AS SELECT `administradores`.`usuario` AS `usuario`, `administradores`.`contrasena` AS `contrasena` FROM `administradores``administradores`  ;

-- --------------------------------------------------------

--
-- Estructura para la vista `t_vista_c`
--
DROP TABLE IF EXISTS `t_vista_c`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `t_vista_c`  AS SELECT `administradores`.`usuario` AS `usuario` FROM `administradores``administradores`  ;

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
  ADD PRIMARY KEY (`id_mascota`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administradores`
--
ALTER TABLE `administradores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `id_mascota` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
