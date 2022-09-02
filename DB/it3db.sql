-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema it3db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `it3db` ;

-- -----------------------------------------------------
-- Schema it3db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `it3db` DEFAULT CHARACTER SET utf8 ;
USE `it3db` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL,
  `date_created` DATETIME NULL,
  `update_date` DATETIME NULL,
  `active` TINYINT NULL DEFAULT 1,
  `admin` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `usernamee_UNIQUE` (`username` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `game`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `game` ;

CREATE TABLE IF NOT EXISTS `game` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `description` VARCHAR(200) NULL,
  `date_created` DATETIME NULL,
  `update_date` DATETIME NULL,
  `category` VARCHAR(100) NULL,
  `active` TINYINT NOT NULL DEFAULT 1,
  `posted` TINYINT NOT NULL DEFAULT 0,
  `user_id` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_game_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_game_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rule`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rule` ;

CREATE TABLE IF NOT EXISTS `rule` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `condition_if` VARCHAR(100) NULL,
  `reward_then` VARCHAR(100) NULL,
  `date_created` DATETIME NULL,
  `update_date` DATETIME NULL,
  `in_use` TINYINT NULL DEFAULT 1,
  `active` TINYINT NULL DEFAULT 1,
  `game_id` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `fk_rules_game_idx` (`game_id` ASC),
  CONSTRAINT `fk_rules_game`
    FOREIGN KEY (`game_id`)
    REFERENCES `game` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS it3user@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'it3user'@'localhost' IDENTIFIED BY 'it3user';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'it3user'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `it3db`;
INSERT INTO `user` (`id`, `first_name`, `last_name`, `username`, `password`, `email`, `date_created`, `update_date`, `active`, `admin`) VALUES (1, 'James', 'Ferro', 'jferro', '123', 'jferro@gmail.com', NULL, NULL, 1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `game`
-- -----------------------------------------------------
START TRANSACTION;
USE `it3db`;
INSERT INTO `game` (`id`, `title`, `description`, `date_created`, `update_date`, `category`, `active`, `posted`, `user_id`) VALUES (1, 'Chores', 'Everyones gotta do them', NULL, NULL, 'household', 1, 0, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `rule`
-- -----------------------------------------------------
START TRANSACTION;
USE `it3db`;
INSERT INTO `rule` (`id`, `condition_if`, `reward_then`, `date_created`, `update_date`, `in_use`, `active`, `game_id`) VALUES (1, 'You do the dishes', 'You get a cookie', NULL, NULL, 1, 1, 1);

COMMIT;

