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

INSERT INTO `LOG` (`log_id`, `user_id`, `jour_id`, `log_time`, `log_action`) VALUES
(1, 1, 1, CURRENT_TIMESTAMP, 'Add Journi'),
(2, 2, 2, CURRENT_TIMESTAMP, 'Add Journi'),
(3, 3, 3, CURRENT_TIMESTAMP, 'Add Journi');

-- `jour_id` ,`jour_title`,`jour_script`,`jour_start`,`jour_end`,`jour_fav`,`co_traveller`,`total_price`,`jour_like` ,`location_id`,`jour_status`