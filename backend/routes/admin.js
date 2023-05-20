const express = require("express");
const pool = require("../config");
const { isLoggedIn } = require("../middlewares");

router = express.Router();

//Get All Users for Admin Page
router.get("/admin/allUser", async function (req, res, next) {
   try {
     //  AND `role` = 'Normal'  <<< IF WANNA SEE ONLY NORMAL USER (NOT CONTAIN ADMIN) USE THIS!
     const [rows] = await pool.query(
       "SELECT `user_id`,`username`, `first_name`, `last_name`, `email`, `gender`, COUNT(`jour_id`) `numLogs`, SUM(`jour_like`) `total_like`\
           FROM `USER` \
           LEFT OUTER JOIN (\
                SELECT `user_id`, `jour_id`, `jour_like`\
                FROM `JOURNEY` JOIN `LOG` USING (`jour_id`)\
                WHERE `log_action` = 'Add Journi') `journi`\
            USING (`user_id`)\
           GROUP BY `user_id` ORDER BY `user_id`"
     );
    //  console.log(rows);
     return res.status(200).json(rows);
   } catch (error) {
        return res.status(404).send(error)
   } 

});

//Get All Admins for Admin Page
router.get("/admin/allAdmin", async function (req, res, next) {
    try {
      const [rows] = await pool.query(
        "SELECT `user_id`,`username`, `first_name`, `last_name`, `email`, `gender`, COUNT(DISTINCT `jour_id`) `numLogs`, COUNT(`report_id`) `total_reports`\
           FROM `USER` \
           LEFT OUTER JOIN (\
                SELECT `user_id`, `jour_id`\
                FROM `JOURNEY` JOIN `LOG` USING (`jour_id`)\
                WHERE `log_action` = 'Add Journi') `journi`\
            USING (`user_id`)\
            LEFT OUTER JOIN (\
                SELECT r.`report_id`, r.`admin_id` 'user_id'\
                FROM `REPORT` r \
                JOIN `LOG` l ON (l.`user_id` = r.`admin_id`)\
                ) `report_tb`\
            USING (`user_id`)\
            WHERE `role` = 'Admin'\
           GROUP BY `user_id` ORDER BY `user_id`"
      );
      
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(404).send(error);
    } 
});

//Get All Logs for Admin Page
router.get("/admin/allLogs", async function (req, res, next) {
  try {
    const [rows] = await pool.query(
      "SELECT `log_id`, `jour_id`, `username`, `first_name`, `last_name`, `role`, `log_action`, DATE_FORMAT(`log_time`, '%Y-%m-%d') `date`, \
       DATE_FORMAT(`log_time`, '%H:%i:%s') `time`\
         FROM `LOG` \
         JOIN `USER` USING (`user_id`) \
         ORDER BY `log_id` DESC"
    );
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(404).send(error);
  }
});

//Get All Reports for Admin Page
router.get("/admin/allReports", async function (req, res, next) {
  try {
    const [rows] = await pool.query(
      "SELECT `report_id`, `jour_id`, `username`, `first_name`, `last_name`, `email`, `report_type`, `report_info`, `report_status`, DATE_FORMAT(`log_time`, '%Y-%m-%d') `date`, \
       DATE_FORMAT(`log_time`, '%H:%i:%s') `time`, `admin_id`\
         FROM `REPORT` \
         LEFT OUTER JOIN `LOG` USING (`report_id`) \
         LEFT OUTER JOIN `USER` USING (`user_id`)\
         ORDER BY `report_id` DESC"
    );
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(404).send(error);
  }
});

exports.router = router;
