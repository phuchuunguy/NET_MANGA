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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` varchar(100) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `comic_slug` varchar(100) DEFAULT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `chapter` varchar(20) DEFAULT NULL,
  `is_spam` tinyint(1) DEFAULT '0',
  `comic_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES ('110a7abe-c2c1-4a02-9c03-dfabe90c9e06','1eb400c8-909c-4e28-bd3f-958da22316f8','tuyet-sac-dao-lu-deu-noi-ngo-hoang-the-chat-vo-dich','ầuuuu\n','2026-05-19 08:57:00','2026-05-19 08:57:00',0,'',0,'Tuyệt Sắc Đạo Lữ Đều Nói Ngô Hoàng Thể Chất Vô Địch'),('18950f0f-b0d8-4ad3-a614-43d698720747','1eb400c8-909c-4e28-bd3f-958da22316f8','tuyet-sac-dao-lu-deu-noi-ngo-hoang-the-chat-vo-dich','ecchi hử','2026-05-19 08:57:07','2026-05-19 08:57:07',0,'',0,'Tuyệt Sắc Đạo Lữ Đều Nói Ngô Hoàng Thể Chất Vô Địch'),('2258def2-2545-4756-ab1a-a407c3857a67','1eb400c8-909c-4e28-bd3f-958da22316f8','toan-dan-chuyen-chuc-ngu-long-su-la-chuc-nghiep-yeu-nhat','úm ba la xì buòmmmmm\nhéc héc','2026-05-19 08:40:03','2026-05-19 08:40:03',0,'',0,'Toàn Dân Chuyển Chức Ngự Long Sư Là Chức Nghiệp Yếu Nhất'),('2eef54d1-5167-4a62-8839-dc0d6e9f7d8a','1eb400c8-909c-4e28-bd3f-958da22316f8','bac-thay-thiet-ke-dien-trang','hài dónnn vllllll','2026-05-20 08:32:00','2026-05-20 08:32:00',0,'',0,'Bậc Thầy Thiết Kế Điền Trang'),('439e6956-d4c4-421d-824b-c46001b8d509','1eb400c8-909c-4e28-bd3f-958da22316f8','doraemon','tuổi thơ của tuiiiiii','2026-05-19 09:03:41','2026-05-19 09:03:41',0,'',0,'Doraemon'),('52cc69b7-72ba-4923-9feb-02c7e65f9a2b','f33fe6c9-cdd4-4c61-8f5e-6fc42c6e9d94','van-co-chi-ton','âu shiệt','2026-05-19 08:03:30','2026-05-19 08:03:30',0,'',0,'Vạn Cổ Chí Tôn'),('53b78a8c-aa49-4543-84e5-05ad92c802e9','1eb400c8-909c-4e28-bd3f-958da22316f8','doraemon','niceeee\n','2026-05-19 09:03:32','2026-05-19 09:03:32',0,'',0,'Doraemon'),('54d91e82-81f8-41cc-aa3f-671328f125ae','1eb400c8-909c-4e28-bd3f-958da22316f8','toan-dan-chuyen-chuc-ngu-long-su-la-chuc-nghiep-yeu-nhat','hắc hắc hắc \n','2026-05-19 08:40:12','2026-05-19 08:40:12',0,'',0,'Toàn Dân Chuyển Chức Ngự Long Sư Là Chức Nghiệp Yếu Nhất'),('62e51576-fd31-4afd-b70b-2e59d91dcbeb','1eb400c8-909c-4e28-bd3f-958da22316f8','bac-thay-thiet-ke-dien-trang','sieuuuuuu cmn hayyy','2026-05-20 08:31:52','2026-05-20 08:31:52',0,'',0,'Bậc Thầy Thiết Kế Điền Trang'),('79863564-4b8b-4669-ba44-9a5a754b432e','1eb400c8-909c-4e28-bd3f-958da22316f8','toan-tri-doc-gia-omniscient-reader','truyện này có cả phim rồi nha mn, siuuuu hayyy hehe\n','2026-05-20 08:27:40','2026-05-20 08:27:40',0,'',0,'Toàn trí độc giả - Omniscient Reader'),('79f37ab7-b5ba-476c-981a-ab5d89c9a0a8','1eb400c8-909c-4e28-bd3f-958da22316f8','ane-no-yuujin','ầuuu\n','2026-05-20 08:16:10','2026-05-20 08:16:10',0,'',0,'Ane no yuujin'),('7df56dc2-7799-4344-8e5d-763a6681f915','f33fe6c9-cdd4-4c61-8f5e-6fc42c6e9d94','toan-cau-ngu-thu-ta-co-the-thay-lo-tuyen-tien-hoa','truyện khá là ok nhá, tranh thủ sẽ ủng hộ admin heehee\n','2026-05-19 08:00:10','2026-05-19 08:00:10',0,'',0,'Toàn Cầu Ngự Thú: Ta Có Thể Thấy Lộ Tuyến Tiến Hoá'),('8082b28c-8c3a-4638-9b35-670f4ebdea07','3be1fafc-d07c-41fc-ab62-386e54b0931a','ta-se-pha-huy-dat-nuoc-nay','quàooo\n','2026-05-19 08:32:32','2026-05-19 08:32:32',0,'',0,'Ta Sẽ Phá Hủy Đất Nước Này'),('a14c55c4-be02-4750-a347-c798efa6fb30','f33fe6c9-cdd4-4c61-8f5e-6fc42c6e9d94','toan-cau-ngu-thu-ta-co-the-thay-lo-tuyen-tien-hoa','yêu','2026-05-19 08:00:23','2026-05-19 08:18:26',0,'',1,'Toàn Cầu Ngự Thú: Ta Có Thể Thấy Lộ Tuyến Tiến Hoá'),('af46bb8b-2ba5-4ade-a205-776f138b4376','f33fe6c9-cdd4-4c61-8f5e-6fc42c6e9d94','ane-no-yuujin','ố ồ \nwoww nhenn kakaa','2026-05-19 08:05:17','2026-05-19 08:05:17',0,'',0,'Ane no yuujin'),('bf8b3a69-a954-4be7-816b-9f60c240d7cd','f33fe6c9-cdd4-4c61-8f5e-6fc42c6e9d94','tran-chien-cuoi-cung-cua-eden','húuuuuuuuuuuuuuuuuuuuuuu kẹc kẹc','2026-05-19 08:10:27','2026-05-19 08:18:11',0,'',0,'Trận Chiến Cuối Cùng Của Eden'),('dcbb1775-2f58-4684-98ac-fc759dafe190','1eb400c8-909c-4e28-bd3f-958da22316f8','chuyen-sinh-thanh-lieu-dot-bien','niceeee','2026-05-20 08:30:06','2026-05-20 08:30:06',0,'',0,'Chuyển Sinh Thành Liễu Đột Biến');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
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
