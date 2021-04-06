-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 22-03-2021 a las 10:20:27
-- Versión del servidor: 5.7.33
-- Versión de PHP: 7.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `zende_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados`
--

CREATE TABLE `estados` (
  `idEstado` bigint(20) UNSIGNED NOT NULL,
  `idPais` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `estados`
--

INSERT INTO `estados` (`idEstado`, `idPais`, `nombre`) VALUES
(1, 146, 'Aguascalientes'),
(2, 146, 'Baja California'),
(3, 146, 'Baja California Sur'),
(4, 146, 'Campeche'),
(5, 146, 'Coahuila de Zaragoza'),
(6, 146, 'Colima'),
(7, 146, 'Chiapas'),
(8, 146, 'Chihuahua'),
(9, 146, 'Ciudad de México'),
(10, 146, 'Durango'),
(11, 146, 'Guanajuato'),
(12, 146, 'Guerrero'),
(13, 146, 'Hidalgo'),
(14, 146, 'Jalisco'),
(15, 146, 'México'),
(16, 146, 'Michoacán de Ocampo'),
(17, 146, 'Morelos'),
(18, 146, 'Nayarit'),
(19, 146, 'Nuevo León'),
(20, 146, 'Oaxaca'),
(21, 146, 'Puebla'),
(22, 146, 'Querétaro'),
(23, 146, 'Quintana Roo'),
(24, 146, 'San Luis Potosí'),
(25, 146, 'Sinaloa'),
(26, 146, 'Sonora'),
(27, 146, 'Tabasco'),
(28, 146, 'Tamaulipas'),
(29, 146, 'Tlaxcala'),
(30, 146, 'Veracruz de Ignacio de la Llave'),
(31, 146, 'Yucatán'),
(32, 146, 'Zacatecas');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`idEstado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estados`
--
ALTER TABLE `estados`
  MODIFY `idEstado` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
