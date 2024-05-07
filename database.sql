-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.27-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.4.0.6659
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for happyhomes
DROP DATABASE IF EXISTS `happyhomes`;
CREATE DATABASE IF NOT EXISTS `happyhomes` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `happyhomes`;

-- Dumping structure for table happyhomes.kegiatans
DROP TABLE IF EXISTS `kegiatans`;
CREATE TABLE IF NOT EXISTS `kegiatans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `judul_kegiatan` varchar(255) DEFAULT NULL,
  `id_proyek` int(11) NOT NULL,
  `tanggal_mulai` date NOT NULL,
  `tanggal_berakhir` date NOT NULL,
  `waktu_mulai` time NOT NULL DEFAULT '00:00:00',
  `waktu_berakhir` time NOT NULL DEFAULT '00:00:00',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_proyek` (`id_proyek`),
  CONSTRAINT `kegiatans_ibfk_1` FOREIGN KEY (`id_proyek`) REFERENCES `proyeks` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table happyhomes.kegiatans: ~2 rows (approximately)
REPLACE INTO `kegiatans` (`id`, `judul_kegiatan`, `id_proyek`, `tanggal_mulai`, `tanggal_berakhir`, `waktu_mulai`, `waktu_berakhir`, `createdAt`, `updatedAt`) VALUES
	(2, 'development', 1, '2024-05-06', '2024-05-06', '12:14:00', '13:20:00', '2024-05-06 05:15:15', '2024-05-06 05:15:15'),
	(5, 'production', 2, '2024-05-06', '2024-05-06', '12:39:00', '12:41:00', '2024-05-06 05:39:40', '2024-05-06 07:14:07');

-- Dumping structure for table happyhomes.proyeks
DROP TABLE IF EXISTS `proyeks`;
CREATE TABLE IF NOT EXISTS `proyeks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama_proyek` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table happyhomes.proyeks: ~5 rows (approximately)
REPLACE INTO `proyeks` (`id`, `nama_proyek`, `createdAt`, `updatedAt`) VALUES
	(1, 'UI Desain', '2024-05-06 04:57:35', '2024-05-06 04:57:35'),
	(2, 'Dokumentasi', '2024-05-06 04:58:02', '2024-05-06 04:58:02'),
	(3, 'UX Desain', '2024-05-06 17:13:16', '0000-00-00 00:00:00'),
	(4, 'FrontEnd', '2024-05-06 17:13:28', '0000-00-00 00:00:00'),
	(5, 'Backend', '2024-05-06 17:13:29', '0000-00-00 00:00:00');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
