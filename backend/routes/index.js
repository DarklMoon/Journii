const express = require("express");
const pool = require("../config");

router = express.Router();


router.get("/", async function (req, res, next) {
    try {
        // const search = req.query.search || ''
        let sql = "SELECT *, DATE_FORMAT(`jour_start`, '%Y/%m/%d') `date_s` , DATE_FORMAT(`jour_end`, '%Y/%m/%d') `date_e`  FROM journey JOIN location USING (location_id) join detail_image using(jour_id)"
        

        const [rows] = await pool.query(sql);
        return res.json(rows);
      } catch (err) {
        return res.status(500).json(err)
      }
});

exports.router = router;
