const express = require("express");
const pool = require("../config");
const { isLoggedIn } = require("../middlewares");

router = express.Router();

//Get All Users for Admin Page
router.get("/admin/allUser", async function (req, res, next) {
   try {
     
     //  AND `role` = 'Normal'  <<< IF WANNA SEE ONLY NORMAL USER (NOT CONTAIN ADMIN) USE THIS
     const [rows] = await pool.query(
       "SELECT `user_id`,`username`, `first_name`, `last_name`, `email`, `gender`, COUNT(`jour_id`) `numLogs`, SUM(`jour_like`) `total_like`\
           FROM `USER` \
           LEFT OUTER JOIN `LOG` USING (`user_id`) \
           LEFT OUTER JOIN `JOURNEY` USING (`jour_id`)\
           WHERE (`log_action` = 'Add Journi' OR `log_action` IS NULL)\
           GROUP BY `user_id` ORDER BY `user_id`"
     );
     console.log(rows.length);
     return res.status(200).json(rows);
   } catch (error) {
        return res.status(404).send(error)
   } 

});

//Get All Admins for Admin Page
router.get("/admin/allAdmin", async function (req, res, next) {
    return res.status(200).json({
      msg: `Get All User ${req.params.id}!`,
    });
});

//Get All Logs for Admin Page
router.get("/admin/allLogs", async function (req, res, next) {
  return res.status(200).json({
    msg: `Get All User ${req.params.id}!`,
  });
});

//Get All Reports for Admin Page
router.get("/admin/allReports", async function (req, res, next) {
  return res.status(200).json({
    msg: `Get All User ${req.params.id}!`,
  });
});

exports.router = router;
