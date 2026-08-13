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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `account_status` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type_account` varchar(20) NOT NULL,
  `vip_level_id` char(36) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  KEY `fk_vip_level` (`vip_level_id`),
  CONSTRAINT `fk_vip_level` FOREIGN KEY (`vip_level_id`) REFERENCES `vip_levels` (`id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('001','Super Admin','admin@system.com','$2b$10$fQ8oRkuwNy5ztBHEw063e.Ont7g/kVXYRTn2pwNMOKLWbwfNYZOfC',2,'active','2026-05-15 09:54:10','2026-05-19 08:26:57','credentials',NULL,NULL),('1eb400c8-909c-4e28-bd3f-958da22316f8','Daddy','nguyphuc400@gmail.com','$2b$10$A2z9IVxourSDXWPh1dM2MeyNQMsB4Bq4VwZ7DGCHyA9QY7rpJeks.',1,'active','2026-05-19 07:09:00','2026-05-19 07:56:11','credentials','dc8e35af-e17d-11ef-b20c-cecd02c24f22','/images/avatar.jpg'),('3be1fafc-d07c-41fc-ab62-386e54b0931a','ADMIN','nuyhu.phuc@gmail.com','$2b$10$7sPg5uqmFrBRGUcRHwqGxOAHEbbnbdE3eajuPDme2LlRzN1KHA1nm',2,'active','2026-05-19 08:24:10','2026-05-20 10:12:14','credentials','dc8e362a-e17d-11ef-b20c-cecd02c24f20','/images/avatar.jpg'),('4465630d-2fbb-4801-b6fe-47fea5fba525','Huu Phuc','nguyhuuphuc@gmail.com','$2b$10$SQFELOP1Nf3nxYUT98awOuqeSDC8CB.oggtw/8FmI28vV8ocOl48i',1,'active','2025-11-21 08:32:51','2026-05-19 07:56:09','credentials','dc8e349e-e17d-11ef-b20c-cecd02c24f21','/images/avatar.jpg'),('f33fe6c9-cdd4-4c61-8f5e-6fc42c6e9d94','phuc','phuksuhuynh@gmail.com','$2b$10$vc6lsuFYF4JAnzNXRpD8He/O5RbA04L7C.tYB4RHcgV27zcec4xny',1,'active','2026-05-15 09:23:45','2026-05-20 10:12:18','credentials','dc8e35f6-e17d-11ef-b20c-cecd02c24f23','/images/avatar.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
