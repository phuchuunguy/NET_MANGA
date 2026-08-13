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
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` varchar(100) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `content` text NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` varchar(20) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES ('02e16fe1-4dc0-4f6b-88ee-93dc9fd62c1e','mark-comment-spam','\n      Bình luận \"yêu\" tại truyện\n      \"Toàn Cầu Ngự Thú: Ta Có Thể Thấy Lộ Tuyến Tiến Hoá\" của bạn đã bị Admin đánh dấu là spam.\n    ','f33fe6c9-cdd4-4c61-8f5e-6fc42c6e9d94','2026-05-19 08:18:19','2026-05-19 08:18:19','user',0),('1e3ef980-d82b-45dc-8c81-d4b93e70782e','Chào mừng khai trương NETMANGA','Nhân dịp NETMANGA ra đời thì bọn mình sẽ khuyến mãi 50% cho cấp độ vip nha cả nhà.','3be1fafc-d07c-41fc-ab62-386e54b0931a','2026-05-20 10:14:07','2026-05-20 10:14:07','system',0),('464a0d54-f2ef-41a4-8141-1cb7f4b9279c','like-comment','Daddy đã thích bình luận \"ố ồ \nwoww nhenn kakaa\" của bạn','f33fe6c9-cdd4-4c61-8f5e-6fc42c6e9d94','2026-05-20 08:16:16','2026-05-20 08:16:16','user',0),('6e104e9b-5ba9-4d44-b240-88af687df7c0','update-vip-level','Cấp độ VIP của bạn vừa được cập nhật.','1eb400c8-909c-4e28-bd3f-958da22316f8','2026-05-19 07:56:12','2026-05-19 07:56:12','user',0),('758ce16f-459c-47f6-b135-b330186859ea','update-vip-level','Cấp độ VIP của bạn vừa được cập nhật.','4465630d-2fbb-4801-b6fe-47fea5fba525','2026-05-19 07:56:09','2026-05-19 07:56:09','user',0),('972b37b1-4f74-44f1-8304-de4ec1286958','update-vip-level','Cấp độ VIP của bạn vừa được cập nhật.','f33fe6c9-cdd4-4c61-8f5e-6fc42c6e9d94','2026-05-20 10:12:18','2026-05-20 10:12:18','user',0),('aab97030-78b0-4a50-8614-853914140202','update-vip-level','Cấp độ VIP của bạn vừa được cập nhật.','f33fe6c9-cdd4-4c61-8f5e-6fc42c6e9d94','2026-05-19 07:56:05','2026-05-19 07:56:05','user',0),('cd9f13ae-caeb-4c90-ad9b-b2fb787034c1','mark-comment-spam','\n      Bình luận \"yêu\" tại truyện\n      \"Toàn Cầu Ngự Thú: Ta Có Thể Thấy Lộ Tuyến Tiến Hoá\" của bạn đã bị Admin đánh dấu là spam.\n    ','f33fe6c9-cdd4-4c61-8f5e-6fc42c6e9d94','2026-05-19 08:18:26','2026-05-19 08:18:26','user',0),('d7582d18-c7fb-455b-9ce8-af4012f0c565','update-vip-level','Cấp độ VIP của bạn vừa được cập nhật.','3be1fafc-d07c-41fc-ab62-386e54b0931a','2026-05-20 10:12:14','2026-05-20 10:12:14','user',0),('edb8b32a-3e45-48f7-8aca-5d92419dae05','mark-comment-spam','\n      Bình luận \"húuuuuuuuuuuuuuuuuuuuuuu kẹc kẹc\" tại truyện\n      \"Trận Chiến Cuối Cùng Của Eden\" của bạn đã bị Admin đánh dấu là spam.\n    ','f33fe6c9-cdd4-4c61-8f5e-6fc42c6e9d94','2026-05-19 08:18:09','2026-05-19 08:18:09','user',0);
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
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
