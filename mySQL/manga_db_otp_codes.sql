CREATE DATABASE  IF NOT EXISTS `manga_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `manga_db`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: manga_db
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `otp_codes`
--

DROP TABLE IF EXISTS `otp_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otp_codes` (
  `id` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `otp` varchar(6) NOT NULL,
  `type` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otp_codes`
--

LOCK TABLES `otp_codes` WRITE;
/*!40000 ALTER TABLE `otp_codes` DISABLE KEYS */;
INSERT INTO `otp_codes` VALUES ('0de0b5cf-309b-4b5f-bea0-1e511e123de2','nuyhu.phc@gmail.com','544874','register_account','2026-05-19 08:23:26','2026-05-19 08:23:26'),('13fab91f-fc18-45bc-91ed-54ea0a14208e','nguyhuuphuc@gmail.com','319106','register_account','2025-11-21 08:32:39','2025-11-21 08:32:39'),('39515148-dbd8-405c-bdb5-f39e7c57965d','phuksuhuynh@gmail.com','433400','register_account','2026-05-15 08:55:38','2026-05-15 08:55:38'),('5c15909c-df50-4acd-ba0c-34c0a0bb763e','phuksuhuynh@gmail.com','364623','register_account','2026-05-15 08:56:24','2026-05-15 08:56:24'),('6411c16b-126c-4562-bc11-639d02c57610','nguyhuuphuc@gmail.com','950720','register_account','2025-11-21 08:31:34','2025-11-21 08:31:34'),('66c430c6-2b11-4a12-82f0-eb39a28638e0','nuyhu.phuc@gmail.com','143499','forgot_password','2026-05-20 10:10:13','2026-05-20 10:10:13'),('6a339147-1efc-45db-8dee-e13e32a81c85','nuyhu.phuc@gmail.com','755341','register_account','2026-05-19 08:24:01','2026-05-19 08:24:01'),('6acf8e7a-4459-4d6e-b5a8-81b29b365f1f','nguyphuc400@gmail.com','450253','register_account','2026-05-19 07:08:41','2026-05-19 07:08:41'),('83fa01c4-7e55-4f8d-9528-c48b347ae0a5','nguyphuc400@gmail.com','734081','register_account','2026-05-19 07:07:56','2026-05-19 07:07:56'),('b5182c1e-b099-4c03-89f0-34c44a653db9','nuyhuphc@gmail.com','731764','register_account','2026-05-19 08:22:51','2026-05-19 08:22:51'),('b74886e1-217b-4800-84fe-190a838d5c46','phuksuhuynh@gmail.com','113540','register_account','2026-05-15 09:23:32','2026-05-15 09:23:32');
/*!40000 ALTER TABLE `otp_codes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-13  9:29:25
