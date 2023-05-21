INSERT INTO `USER` (`user_id`, `username`, `password`, `first_name`, `last_name`, `email`, `gender`, `role`) VALUES
(1,'username001', 'password001', 'Violet', 'Mccoy', 'violet123@gmail.com', 'female', 'normal' ),
(2,'username002', 'password002', 'Sam', 'Grimes', 'sam123@gmail.com', 'male', 'admin' ),
(3,'username003', 'password003', 'Logan', 'Lindsey', 'logan123@gmail.com', 'male', 'normal' );

INSERT INTO `location` (`location_id` ,`street_address`,`city`,`state_province`,`country`) VALUES
(1,'123/321 ลาดกระบัง', 'BangKok', 'BangKok', 'Thailand' ),
(2,'321/123 Lat Krabang', 'Bangkok', 'BangKok', 'Thailand'),
(3,'20 W 34th St.', 'New York', 'New York', 'United states');


INSERT INTO `JOURNEY` (`jour_id` ,`jour_title`,`jour_script`,`jour_start`,`jour_end`,`jour_fav`,`co_traveller`,`total_price`,`jour_like` ,`location_id`) VALUES
(1,'มาเที่ยวลาดกระบัง', 'ขึ้นรถไฟมาลงตรงสถานีพระจอมเกล้าได้เลยครับ', '2023-04-20', '2023-04-20', 0, 0, 150.0, 30, 1 ),
(2,'Travel in Bangkok!', 'My friend and I stayed in Thailand for 3 days. Everything was great!', '2023-03-12', '2023-03-14', 1, 1, 185.0, 213, 2),
(3,'Empire States Building!', 'New York City is so lively, there are many people in the city. What a bustling!', '2016-12-20', '2017-01-06', 1, 4, 2302.5, 4356, 3);

-- THIS IS FOR report_id COLUMN IF IT HASN'T CHANGED FROM NOT NULL TO NULL CONSTRINT. --
ALTER TABLE `LOG` MODIFY `report_id` INT UNSIGNED NULL;

-- ADD NORMAL JOURNEY LOG
INSERT INTO `LOG` (`log_id`, `user_id`, `jour_id`, `log_time`, `log_action`) VALUES
(1, 1, 1, CURRENT_TIMESTAMP, 'Add Journi'),
(2, 2, 2, CURRENT_TIMESTAMP, 'Add Journi'),
(3, 3, 3, CURRENT_TIMESTAMP, 'Add Journi');

-- ADD REPORT JOURNEY LOG
INSERT INTO `USER` (`user_id`, `username`, `password`, `first_name`, `last_name`, `email`, `gender`, `role`) VALUES
(4,'username004', 'password004', 'Hello', 'World', 'HelloWolrd123@gmail.com', 'male', 'normal' ),
(5,'username005', 'password005', 'John', 'Nathan', 'john123@gmail.com', 'male', 'normal' );

INSERT INTO `location` (`location_id` ,`street_address`,`city`,`state_province`,`country`) VALUES
(4,'IT LATKRABANG', 'Lat Krabang', 'Bangkok', 'Thailand' ),
(5,'BKK', 'Bangkok', 'BangKok', 'Thailand');

INSERT INTO `JOURNEY` (`jour_id` ,`jour_title`,`jour_script`,`jour_start`,`jour_end`,`jour_fav`,`co_traveller`,`total_price`,`jour_like` ,`location_id`) VALUES
(4,'HelloWorld-WEBPRO', 'Print(1234)', '1998-12-01', '2013-03-15', 0, 100000, 999999.0, 0, 4 ),
(5,'Thailand Is Very BAD!', "My friend and I stayed in Thailand for 3 days. Everything was bad! (BUT IDK WHAT'S BAD LOL) HAHAA", '2023-01-31', '2023-02-11', 1, 1, 0.0, 0, 5);


INSERT INTO `REPORT` (`report_id`, `report_type`, `report_info`, `report_status`, `admin_id`) VALUES
(1, 'Spam', 'Spam For Sure', 'Done', 2),
(2, 'Fake Information', 'Fake For Sure', 'Pending', NULL),
(3, 'Fake Information', 'Fakeee He did not know anything but he posted WHATTT?', 'Pending', NULL),
(4, 'Fake Information', 'Is he OKAY?', 'Pending', NULL);

INSERT INTO `LOG` (`log_id`, `user_id`, `jour_id`, `report_id`, `log_time`, `log_action`) VALUES
(4, 4, 4, NULL, CURRENT_TIMESTAMP, 'Add Journi'),
(5, 4, 5, NULL, CURRENT_TIMESTAMP, 'Add Journi'),
(6, 1, 4, 1, CURRENT_TIMESTAMP, 'Add Report'),
(7, 1, 5, 2, CURRENT_TIMESTAMP, 'Add Report'),
(8, 3, 5, 3, CURRENT_TIMESTAMP, 'Add Report'),
(9, 5, 5, 4, CURRENT_TIMESTAMP, 'Add Report');

ALTER TABLE `DETAIL_IMAGE` ADD `main` TINYINT NOT NULL DEFAULT 0;
-- `jour_id` ,`jour_title`,`jour_script`,`jour_start`,`jour_end`,`jour_fav`,`co_traveller`,`total_price`,`jour_like` ,`location_id`,`jour_status`