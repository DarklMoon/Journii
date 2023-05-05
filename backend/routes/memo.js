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
router.post("/memoes/main", upload.array("imageMemo", 5), async function (req, res, next){
    try {
        
        return res.status(201).json({
            msg: 'Create Memo! (Main Detail)'
        })
    } catch (error) {
        return res.status(400).json(err);
    }
})

//Create Memo (Optional Detail)
router.post("/memoes/optional", upload.array("imageMemo", 5), async function (req, res, next){
    try {

      return res.status(201).json({
        msg: "Create Memo! (Optional Detail)",
      });
    } catch (error) {
      return res.status(400).json(err);
    }
})

//Get Memo detail
router.get("/memoes/:id", function (req, res, next) {

    return res.status(200).json({
      msg: `Get Memoes ${req.params.id}!`,
    });

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