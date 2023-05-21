const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
const multer = require("multer");
const Joi = require("joi");
const { isLoggedIn } = require("../middlewares");

router = express.Router();

// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/uploads");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

//Create Memo (Main Detail)
router.post("/memoes/main", isLoggedIn,  upload.array("imageMemo", 5), async function (req, res, next) {
  const file = req.files;
  let pathArray = [];
  console.log(req.body);
  // if (!file) {
  //   return res.status(400).json({ message: "Please upload a file" });
  // }
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    let location = await conn.query(
      "INSERT INTO `location`(`street_address`, `city`, `state_province`, `country`) \
      VALUES(?, ?, ?, ?);",
      [req.body.st_address, req.body.city, req.body.province, req.body.country]
    );

    let jours = await conn.query(
      "INSERT INTO `JOURNEY`(`jour_title`, `jour_script`, `jour_start`, `jour_end`, `co_traveller`, `total_price`, `location_id`)\
      VALUES(?, ?, ?, ?, ?, ?, ?);",
      [
        req.body.title,
        req.body.descript,
        req.body.start,
        req.body.end,
        req.body.co_travel,
        req.body.price,
        location[0].insertId
      ]
    );
    console.log(jours[0])
    req.files.forEach((file, index) => {
      let path = [file.path.substring(6), jours[0].insertId, index == 0 ? 1 : 0];
      pathArray.push(path);
    });

    await conn.query("INSERT INTO `DETAIL_IMAGE`(`image_file`, `jour_id`, `main`) VALUES ?;", [
      pathArray,
    ]);

    console.log("Hello Worllddd", req.user);
    let log = await conn.query(
      "INSERT INTO `LOG`(`user_id`, `jour_id`, `log_time`, `log_action`)\
      VALUES(?, ?, CURRENT_TIMESTAMP, 'Add Journi');",
      [
        req.user.user_id,     
        jours[0].insertId,
      ]
    );
    console.log(log, jours[0].insertId);

    await conn.commit();
    res.status(200).json({jour_id : jours[0].insertId});
  } catch (err) {
    await conn.rollback();
    console.log(err)
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
})

//Create Memo (Optional Detail)
router.post("/memoes/optional", upload.array("imageMemo", 5), async function (req, res, next) {
  try {

    return res.status(201).json({
      msg: "Create Memo! (Optional Detail)",
    });
  } catch (error) {
    return res.status(400).json(err);
  }
})

//Get Memo detail
router.get("/memoes/:id", async function (req, res, next) {
  const get_blog = await pool.query("SELECT *,DATE_FORMAT(`jour_start`, '%Y/%m/%d') `date_s` , DATE_FORMAT(`jour_end`, '%Y/%m/%d') `date_e` FROM journey JOIN location USING (location_id) WHERE jour_id=?", [
    req.params.id,
  ]);

  // console.log(get_blog[0][0])
  res.send(get_blog[0][0])

})

//Edit Memo
router.put("/memoes/edit/:id", async function (req, res, next) {
  try {

    return res.status(200).json({
      msg: `Edit Memo ${req.params.id}!`,
    });
  } catch (error) {
    return res.status(400).json(err);
  }
});

//Add like Memo
router.put("/memoes/add/like/:id", async function (req, res, next) {
  try {

    return res.status(200).json({
      msg: `Add Like Memo ${req.params.id}!`,
    });
  } catch (error) {
    return res.status(400).json(err);
  }
});

//Add Fav Memo
router.put("/memoes/add/fav/:id", async function (req, res, next) {
  try {

    return res.status(200).json({
      msg: `Add Fav Memo ${req.params.id}!`,
    });
  } catch (error) {
    return res.status(400).json(err);
  }
});

//Delete Memo
router.delete("/memoes/:id", function (req, res, next) {
  try {

    return res.status(200).json({
      msg: `Delete Memo ${req.params.id}!`,
    });
  } catch (error) {
    return res.status(400).json(err);
  }
})

exports.router = router;