const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
const multer = require("multer");
const Joi = require("joi");

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
router.post("/memoes/main", upload.array("imageMemo", 5), async function (req, res, next) {
  try {

    return res.status(201).json({
      msg: 'Create Memo! (Main Detail)'
    })
  } catch (error) {
    return res.status(400).json(err);
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
router.delete("/memoes/:id", async function (req, res, next) {
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