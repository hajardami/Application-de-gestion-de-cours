const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Student = require("../../../models/Student");
const Course = require("../../../models/Course");
const Prof = require("../../../models/Prof");
const Admin = require("../../../models/Admin");
const bcrypt = require("bcryptjs");
let error;
router.post("/", auth, async (req, res) => {
  try {
    let error1 = null,
      error2 = null;
    error = null;
    let change = false;
    let bool = false;

    if (req.admin) {
      console.log(1);
      Admin.findOne({ _id: req.admin.id }, async (err, data) => {
        if (err || !data) return (error1 = err || "admin not found, token err");
        bool = await bcrypt.compare(req.body.oldPassword, data.password);
        if (!bool) return (error1 = "le mot de passe ancien est eroné");
      }).then(async () => {
        error1 === null ? (error = error2) : (error = error1);
        if (error) return res.status(500).send("erreur de serveur : " + error);

        if (bool) {
          const salt = await bcrypt.genSalt(6);
          let password = await bcrypt.hash(req.body.password, salt);
          Admin.updateOne({ _id: req.admin.id }, { password }, (e, d) => {
            if (e) return (error1 = e);
            return res.status(200).send("all is done");
          });
        }
      });
      //   error1 === null ? (error = error2) : (error = error1);
      //   if (error) throw error;
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("erreur de serveur : " + error);
  }
});
module.exports = router;
