/*
 Navicat Premium Data Transfer

 Source Server         : wyt
 Source Server Type    : MySQL
 Source Server Version : 80039
 Source Host           : localhost:3306
 Source Schema         : crowdfunding_db

 Target Server Type    : MySQL
 Target Server Version : 80039
 File Encoding         : 65001

 Date: 13/10/2024 20:49:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `category_id` int(0) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`category_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, 'medical');
INSERT INTO `category` VALUES (2, 'education');
INSERT INTO `category` VALUES (3, 'social impact');
INSERT INTO `category` VALUES (4, 'crisis relief');
INSERT INTO `category` VALUES (5, 'art');

-- ----------------------------
-- Table structure for donation
-- ----------------------------
DROP TABLE IF EXISTS `donation`;
CREATE TABLE `donation`  (
  `donation_id` int(0) NOT NULL AUTO_INCREMENT,
  `date` datetime(0) NOT NULL,
  `amount` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `giver` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `fundraiser_id` int(0) NOT NULL,
  PRIMARY KEY (`donation_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 55 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of donation
-- ----------------------------
INSERT INTO `donation` VALUES (55, '2024-10-13 20:45:06', '4500', 'person1', 1);
INSERT INTO `donation` VALUES (56, '2024-10-13 20:45:21', '100', 'person2', 1);
INSERT INTO `donation` VALUES (57, '2024-10-13 20:45:30', '9000', 'person1', 1);
INSERT INTO `donation` VALUES (58, '2024-10-13 20:45:46', '500', 'person4', 2);
INSERT INTO `donation` VALUES (59, '2024-10-13 20:45:54', '10000', 'person6', 2);
INSERT INTO `donation` VALUES (60, '2024-10-13 20:46:09', '10', 'person10', 2);
INSERT INTO `donation` VALUES (61, '2024-10-13 20:46:25', '900', 'person2', 2);
INSERT INTO `donation` VALUES (62, '2024-10-13 20:46:34', '2323', 'person1', 10);
INSERT INTO `donation` VALUES (63, '2024-10-13 20:46:55', '2000', 'person7', 5);
INSERT INTO `donation` VALUES (64, '2024-10-13 20:47:02', '200', 'person8', 5);
INSERT INTO `donation` VALUES (65, '2024-10-13 20:47:10', '3000', 'person20', 5);

-- ----------------------------
-- Table structure for fundraiser
-- ----------------------------
DROP TABLE IF EXISTS `fundraiser`;
CREATE TABLE `fundraiser`  (
  `fundraiser_id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `organizer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `caption` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `target_funding` decimal(20, 2) NOT NULL,
  `current_funding` decimal(20, 2) NOT NULL,
  `city` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `active` tinyint(1) NOT NULL,
  `category_id` int(0) NOT NULL,
  PRIMARY KEY (`fundraiser_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fundraiser
-- ----------------------------
INSERT INTO `fundraiser` VALUES (1, 'Kevin Harris', 'Create Educational Workshops for Underprivileged Youth!', 10000.00, 13600.00, 'LanZhou', 1, 2);
INSERT INTO `fundraiser` VALUES (2, 'Jessica Taylor', 'Revitalize Our Neighborhood Park: Join Us!', 50000.00, 11410.00, 'LaSa', 1, 3);
INSERT INTO `fundraiser` VALUES (3, 'Thomas Lee', 'Support Our Mission to Rescue Endangered Species!', 20000.00, 0.00, 'HuBei', 1, 4);
INSERT INTO `fundraiser` VALUES (4, 'Emma Wilson', 'Help Us Build an Accessible Community Center!', 20000.00, 0.00, 'BeiJing', 1, 3);
INSERT INTO `fundraiser` VALUES (5, 'Lucas Brown', 'Fund Our Art Therapy Program for Children!', 5000.00, 5200.00, 'GuangZhou', 1, 1);
INSERT INTO `fundraiser` VALUES (10, 'aa', 'The Beauty of Diversity: Embracing Differences', 2323.00, 2323.00, 'LaSa', 1, 1);
INSERT INTO `fundraiser` VALUES (11, 'bb', 'Finding Treasure in the Ordinary: The Joy of Simple Living', 50000.00, 0.00, 'HuBei', 1, 3);
INSERT INTO `fundraiser` VALUES (12, 'Kevin Harris', 'The Transformative Power of Travel: Discovering New Perspectives\"', 20000.00, 0.00, 'BeiJing', 1, 3);
INSERT INTO `fundraiser` VALUES (13, 'Kevin Harris', 'The Joy of Giving Back: The Rewards of Volunteerism', 5556.00, 0.00, 'BeiJing', 1, 2);
INSERT INTO `fundraiser` VALUES (15, 'Jessica Taylor', 'Never Too Late: The Power of Pursuing your Passion', 2323.00, 0.00, 'BeiJing', 1, 1);

SET FOREIGN_KEY_CHECKS = 1;
