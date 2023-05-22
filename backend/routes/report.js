const express = require("express");
const pool = require("../config");
const { isLoggedIn } = require("../middlewares");

router = express.Router();

//Create Reports
router.post("/reports", async function (req, res, next) {

  report_type = req.body.selected
  description = req.body.description
  const conn = await pool.getConnection()
  await conn.beginTransaction()

  try {
    let results = await conn.query(
      "INSERT INTO report(report_type, report_info) \
      VALUES(?, ?);",
      [report_type, description]
    );
    await conn.commit();
    return res.status(201).json({
      msg: "Create report!",
    });
  } catch (error) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
})

//Get Report detail
router.get("/reports/:id", function (req, res, next) {

  return res.status(200).json({
    msg: `Get Report ${req.params.id}!`
  })
})


exports.router = router;