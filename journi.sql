-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema journii
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema journii
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `journii` DEFAULT CHARACTER SET utf8 ;
USE `journii` ;

-- -----------------------------------------------------
-- Table `journii`.`USER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `journii`.`USER` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `first_name` VARCHAR(150) NOT NULL,
  `last_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `gender` ENUM('Female', 'Male') NOT NULL,
  `role` ENUM('Normal', 'Admin') NOT NULL DEFAULT 'Normal',
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `journii`.`location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `journii`.`location` (
  `location_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `street_address` VARCHAR(200) NULL,
  `city` VARCHAR(150) NULL,
  `state_province` VARCHAR(150) NULL,
  `country` VARCHAR(100) NULL,
  PRIMARY KEY (`location_id`),
  UNIQUE INDEX `location_id_UNIQUE` (`location_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `journii`.`JOURNEY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `journii`.`JOURNEY` (
  `jour_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `jour_title` VARCHAR(200) NOT NULL,
  `jour_script` TEXT NULL,
  `jour_start` DATE NULL,
  `jour_end` DATE NULL,
  `jour_fav` TINYINT NOT NULL DEFAULT 0,
  `co_traveller` INT NOT NULL DEFAULT 0,
  `total_price` FLOAT NOT NULL DEFAULT 0.0,
  `jour_like` INT NOT NULL DEFAULT 0,
  `location_id` INT UNSIGNED NULL,
  `jour_status` ENUM('Normal', 'Block') NOT NULL DEFAULT 'Normal',
  PRIMARY KEY (`jour_id`),
  UNIQUE INDEX `jour_id_UNIQUE` (`jour_id` ASC) VISIBLE,
  INDEX `location_id_idx` (`location_id` ASC) VISIBLE,
  CONSTRAINT `location_id`
    FOREIGN KEY (`location_id`)
    REFERENCES `journii`.`location` (`location_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `journii`.`REPORT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `journii`.`REPORT` (
  `report_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `report_type` ENUM('Fake Information', 'Spam', 'Abusive Content', 'Other') NOT NULL,
  `report_info` TEXT NULL,
  `report_status` ENUM('Pending', 'Done') NOT NULL DEFAULT 'Pending',
  `admin_id` INT UNSIGNED NULL,
  PRIMARY KEY (`report_id`),
  UNIQUE INDEX `report_id_UNIQUE` (`report_id` ASC) VISIBLE,
  INDEX `admin_id_idx` (`admin_id` ASC) VISIBLE,
  CONSTRAINT `admin_id`
    FOREIGN KEY (`admin_id`)
    REFERENCES `journii`.`USER` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `journii`.`LOG`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `journii`.`LOG` (
  `log_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `jour_id` INT UNSIGNED NOT NULL,
  `report_id` INT UNSIGNED NOT NULL,
  `log_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `log_action` ENUM('Add Journi', 'Delete Journi', 'Update Journi', 'Add Report', 'Update Report') NOT NULL,
  PRIMARY KEY (`log_id`),
  UNIQUE INDEX `log_id_UNIQUE` (`log_id` ASC) VISIBLE,
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `jour_id_idx` (`jour_id` ASC) VISIBLE,
  INDEX `report_id_idx` (`report_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `journii`.`USER` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `jour_id`
    FOREIGN KEY (`jour_id`)
    REFERENCES `journii`.`JOURNEY` (`jour_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `report_id`
    FOREIGN KEY (`report_id`)
    REFERENCES `journii`.`REPORT` (`report_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `journii`.`DETAIL`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `journii`.`DETAIL` (
  `detail_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `detail_title` VARCHAR(200) NOT NULL,
  `detail_info` TEXT NULL,
  `detail_start` DATETIME NULL,
  `detail_end` DATETIME NULL,
  `sub_price` FLOAT NULL DEFAULT 0,
  `location_id` INT UNSIGNED NULL,
  `jour_id` INT UNSIGNED NULL,
  PRIMARY KEY (`detail_id`),
  UNIQUE INDEX `detail_id_UNIQUE` (`detail_id` ASC) VISIBLE,
  INDEX `location_id_idx` (`location_id` ASC) VISIBLE,
  INDEX `jour_id_idx` (`jour_id` ASC) VISIBLE,
  CONSTRAINT `d_location_id_fk`
    FOREIGN KEY (`location_id`)
    REFERENCES `journii`.`location` (`location_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `d_jour_id_fk`
    FOREIGN KEY (`jour_id`)
    REFERENCES `journii`.`JOURNEY` (`jour_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `journii`.`DETAIL_IMAGE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `journii`.`DETAIL_IMAGE` (
  `image_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `image_file` VARCHAR(200) NULL,
  `detail_id` INT UNSIGNED NULL,
  `jour_id` INT UNSIGNED NULL,
  PRIMARY KEY (`image_id`),
  UNIQUE INDEX `image_id_UNIQUE` (`image_id` ASC) VISIBLE,
  INDEX `jour_id_idx` (`jour_id` ASC) VISIBLE,
  INDEX `detail_id_idx` (`detail_id` ASC) VISIBLE,
  CONSTRAINT `di_jour_id_fk`
    FOREIGN KEY (`jour_id`)
    REFERENCES `journii`.`JOURNEY` (`jour_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `di_detail_id_fk`
    FOREIGN KEY (`detail_id`)
    REFERENCES `journii`.`DETAIL` (`detail_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `journii`.`TOKEN`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `journii`.`TOKEN` (
  `token_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `token` VARCHAR(100) NULL,
  PRIMARY KEY (`token_id`),
  UNIQUE INDEX `token_id_UNIQUE` (`token_id` ASC) VISIBLE,
  UNIQUE INDEX `token_UNIQUE` (`token` ASC) VISIBLE,
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `t_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `journii`.`USER` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
