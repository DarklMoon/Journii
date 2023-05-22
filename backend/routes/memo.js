const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
const multer = require("multer");
const Joi = require("joi");
const { isLoggedIn } = require("../middlewares");
const { blogOwner } = require("../middlewares");

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
        req.body.start == "" ? null : req.body.start,
        req.body.end == "" ? null : req.body.end,
        req.body.co_travel,
        req.body.price,
        location[0].insertId,
      ]
    );
    if(file.length != 0){
      req.files.forEach((file, index) => {
        let path = [file.path.substring(6), jours[0].insertId, index == 0 ? 1 : 0];
        pathArray.push(path);
      });
  
      await conn.query("INSERT INTO `DETAIL_IMAGE`(`image_file`, `jour_id`, `main`) VALUES ?;", [
        pathArray,
      ]);
    }

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
router.post("/memoes/optional/:jour_id", isLoggedIn, upload.array("imageMemoMore", 5), async function (req, res, next) {
  const file = req.files;
  const jourId = req.params.jour_id;;
  let pathArray = [];
  console.log(req.body);
  console.log(file)

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    let location = await conn.query(
      "INSERT INTO `location`(`street_address`, `city`, `state_province`, `country`) \
      VALUES(?, ?, ?, ?);",
      [req.body.st_address, req.body.city, req.body.province, req.body.country]
    );

    let detail = await conn.query(
      "INSERT INTO `DETAIL`(`detail_title`, `detail_info`, `detail_start`, `detail_end`, `sub_price`, `location_id`, `jour_id`)\
      VALUES(?, ?, ?, ?, ?, ?, ?);",
      [
        req.body.title,
        req.body.descript,
        req.body.start == "" ? null : req.body.start,
        req.body.end == "" ? null : req.body.end,
        req.body.price,
        location[0].insertId,
        jourId,
      ]
    );
    if (file.length != 0) {
      req.files.forEach((file, index) => {
        let path = [file.path.substring(6), detail[0].insertId, jourId,index == 0 ? 1 : 0];
        pathArray.push(path);
      });

      await conn.query(
        "INSERT INTO `DETAIL_IMAGE`(`image_file`, `detail_id`, `jour_id`, `main`) VALUES ?;",
        [pathArray]
      );
    }

    await conn.commit();
    res.status(200).json({ detail: detail[0] });
  } catch (err) {
    await conn.rollback();
    console.log(err);
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
})

//Get Memo detail ต้องเป็นblogownerไหท
router.get("/memoes/:id", async function (req, res, next) {
  const get_blog = await pool.query("SELECT *,DATE_FORMAT(`jour_start`, '%Y/%m/%d') `date_s` , DATE_FORMAT(`jour_end`, '%Y/%m/%d') `date_e` FROM journey JOIN location USING (location_id) join detail_image using(jour_id)  WHERE jour_id=?", [
    req.params.id,
  ]);

  console.log(get_blog[0][0])
  res.send(get_blog[0][0])

})

//Edit Memo
router.put("/memoes/edit/:id", async function (req, res, next) {
  title = req.body.jour_title
  content = req.body.jour_script
  start = req.body.date_s
  end = req.body.date_e
  num = req.body.co_traveller
  price = req.body.total_price

  // title = req.body.
  try {
    let results = await conn.query(
      "UPDATE journey SET jour_title=?, jour_script=?, jour_start=?, jour_end=?, co_traveller=?, total_price=? WHERE jour_id=?",
      [title, content, start, end, num, price, req.params.id]
    )

    return res.status(200).json({
      msg: `Edit Memo ${req.params.id}!`,
    });
  } catch (error) {
    return res.status(400).json(error);
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
router.delete("/memoes/:id", isLoggedIn, async function (req, res, next) {
  const [blog] = await pool.query('select * from journey where jour_id = ?', [req.params.id])
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    await pool.query('delete from journey where jour_id = ?', [req.params.id])
    await conn.commit()
    return res.status(200).send({
      "message": `ลบ ToDo '${blog[0].jour_title}' สำเร็จ`,
    })
  } catch (error) {
    console.log(error)
    await conn.rollback();
    return res.status(404).send({
      "message": "ไม่พบ journey ที่ต้องการลบ"
    })
  } finally {
    conn.release()
    // console.log(req.params.id)
  }
})

exports.router = router;