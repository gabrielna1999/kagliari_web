-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2020 at 12:46 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `broken`
--

-- --------------------------------------------------------

--
-- Table structure for table `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`) VALUES
(1, 'Buzos'),
(2, 'Remeras'),
(3, 'Camperas');

-- --------------------------------------------------------

--
-- Table structure for table `compras`
--

CREATE TABLE `compras` (
  `fecha_inicio` date NOT NULL DEFAULT current_timestamp(),
  `precio_total` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `finalizada` int(11) NOT NULL DEFAULT 0,
  `fecha_finalizacion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `compras_productos`
--

CREATE TABLE `compras_productos` (
  `id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `compra_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `talle_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `imagenes`
--

CREATE TABLE `imagenes` (
  `id` int(11) NOT NULL,
  `ruta` varchar(255) NOT NULL,
  `producto_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `imagenes`
--

INSERT INTO `imagenes` (`id`, `ruta`, `producto_id`) VALUES
(1, 'inheritance_main.png', 1),
(2, 'time_main.png', 2),
(3, 'inter_main.png', 3),
(4, 'juguito_main.png', 4),
(5, 'illicit_main.png', 5),
(6, 'advTech_main.png', 6),
(7, 'broken_main.png', 7),
(8, 'grandma_main.png', 8),
(9, 'outsider_main.png', 9);

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `precio` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `stock` int(11) DEFAULT NULL,
  `imagen_ruta` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `precio`, `descripcion`, `categoria_id`, `stock`, `imagen_ruta`) VALUES
(1, 'INHERITANCE', 2000, 'Exclusively made for the broken ones.', 1, 10, 'inheritance_main.png'),
(2, 'TIME IS $$$', 2700, 'Exclusively made for the broken ones.', 1, 10, 'time_main.png'),
(3, 'INTERFERENCIA COMUNICATIVA', 1900, 'Exclusively made for the broken ones.', 1, 10, 'inter_main.png'),
(4, 'JUGUITO', 1400, 'Exclusively made for the broken ones.', 2, 10, 'juguito_main.png'),
(5, 'ILLICIT', 1300, 'Exclusively made for the broken ones.', 2, 10, 'illicit_main.png'),
(6, 'ADVANCED TECH', 1200, 'Exclusively made for the broken ones.', 2, 10, 'advTech_main.png'),
(7, 'BROKEN YTH', 1500, 'Exclusively made for the broken ones.', 1, 10, 'broken_main.png'),
(8, 'FUCKIN GRANDMA', 1500, 'Exclusively made for the broken ones.', 1, 10, 'grandma_main.png'),
(9, 'OUTSIDER', 1800, 'Exclusively made for the broken ones.', 1, 10, 'outsider_main.png');

-- --------------------------------------------------------

--
-- Table structure for table `producto_talle`
--

CREATE TABLE `producto_talle` (
  `id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `talle_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `producto_talle`
--

INSERT INTO `producto_talle` (`id`, `producto_id`, `talle_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 2, 1),
(5, 2, 2),
(6, 2, 3),
(7, 3, 1),
(8, 3, 2),
(9, 3, 3),
(10, 4, 1),
(11, 4, 2),
(12, 4, 3),
(13, 5, 1),
(14, 5, 2),
(15, 5, 3),
(16, 6, 1),
(17, 6, 2),
(18, 6, 3),
(19, 7, 1),
(20, 7, 2),
(21, 7, 3),
(22, 8, 1),
(23, 8, 2),
(24, 8, 3),
(25, 9, 1),
(26, 9, 2),
(27, 9, 3);

-- --------------------------------------------------------

--
-- Table structure for table `talles`
--

CREATE TABLE `talles` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `talles`
--

INSERT INTO `talles` (`id`, `nombre`) VALUES
(1, 'S/M'),
(2, 'L'),
(3, 'XXXL');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `admin` tinyint(4) NOT NULL,
  `fecha_creacion` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `fecha_nacimiento`, `admin`, `fecha_creacion`) VALUES
(2, 'admin', 'brokenyouth.sw@gmail.com', '8r0k3n7t4', '2020-12-01', 1, '2020-12-01'),
(17, 'Gabriel', 'gabrieln1999@gmail.com', '$2b$10$fk2xQUkOCwq/JHSVjpEsm.FKPNXsHHG3qNdyw72Rnji9cQXthjoD.', '1999-10-07', 1, '2020-12-09'),
(18, 'Demo', 'demo@demo.com', '$2b$10$5gv.ADFd1P09YaE5g/8zyuV7/lYyZEiCBrShUxLZPeqvoLNS0Ohqu', '2020-12-12', 0, '2020-12-10'),
(19, 'a', 'a@gmail.com', '$2b$10$TpXQfKHYeu02Z9DUBEjnxePH5XtzHxuodqh6AZ6brulcw25cgaMWS', '2020-12-01', 0, '2020-12-10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `compras_productos`
--
ALTER TABLE `compras_productos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `producto_id_UNIQUE` (`producto_id`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id_idx` (`categoria_id`);

--
-- Indexes for table `producto_talle`
--
ALTER TABLE `producto_talle`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `talles`
--
ALTER TABLE `talles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `compras`
--
ALTER TABLE `compras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `compras_productos`
--
ALTER TABLE `compras_productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `producto_talle`
--
ALTER TABLE `producto_talle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `imagen_producto` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

--
-- Constraints for table `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
