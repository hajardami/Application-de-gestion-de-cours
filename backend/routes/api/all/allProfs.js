const express = require("express");
const router = express.Router();
const Prof = require("../../../models/Prof");

router.get("/", async (req, res) => {
  console.log("hello");
  await Prof.find({}, (err, rst) => {
    console.log(rst);
    if (err || rst === null || rst === undefined) {
      console.log("erreur 410 : ", err);
      return res.status(410).json({
        errors: err || "no result found",
      });
    } else {
      let data = rst;
      res.status(200).json(data);
    }
  });
});
module.exports = router;
