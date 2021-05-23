const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Student = require("../../models/Student");
const Prof = require("../../models/Prof");

const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.get("/", auth, async (req, res) => {
  try {
    let error = null;
    if (req.student !== undefined)
      await Student.findOne({ _id: req.student.id }, (err, data) => {
        if (err) {
          err = error;
          return;
        }
        if (data) res.send(data);
      });
    else
      await Prof.findOne({ _id: req.prof.id }, (err, data) => {
        if (err) {
          err = error;
          return;
        }
        if (data) res.send(data);
      });
    if (error) throw error;
  } catch (e) {
    console.log(e);
    res.status(500).send("erreur de serveur");
  }
});
router.post(
  "/",
  check("email", "email non valide")
    .isEmail()
    .custom((value) => {
      if (
        value.split("@")[1] === "um5.ac.ma" ||
        value.split("@")[1] === "um5r.ac.ma" ||
        value.split("@")[1] === "ensias.um5.ma"
      )
        return true;
      throw new Error("Email non valide : email doit etre @um5 ... ");
    })
    .custom(async (value, { req }) => {
      let e = false;
      console.log("wslna hna b3da");
      await Student.findOne(
        {
          email: value,
        },
        async (err, data) => {
          if (data === null) {
            console.log("\n\n\n" + data + "\n\n\n");
            e = true;
            return;
          }
          let bool = await bcrypt.compare(req.body.password, data.password);
          console.log("\n\n\n" + bool + "\n\n\n");

          if (err || !bool) {
            e = true;
          }
        }
      );
      await Prof.findOne(
        {
          email: value,
        },
        async (err, data) => {
          if (data == null) {
            e = true;
            return;
          }
          let bool = await bcrypt.compare(req.body.password, data.password);
          console.log(bool + "\n\n\n\n\n");
          if (err || !bool) {
            e = true;
          }
        }
      );
      if (e) throw new Error("erreur dans les credentielles");
      return true;
    }),
  check("password", "le mot de passe est trop court (<6)").isLength({
    min: 6,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(410).json({
        errors: errors.array(),
      });
    }
    const { email, password, isStudent } = req.body;
    try {
      if (isStudent) {
        const student = await Student.findOne({ email });
        const payload = {
          student: {
            id: student.id,
          },
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 50400 },
          (err, token) => {
            if (err) throw err;
            else {
              res.status(200).send({ token: token });
            }
          }
        );
      } /////////////
      else {
        const prof = await Prof.findOne({ email });
        const payload = {
          prof: {
            id: prof.id,
          },
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 50400 },
          (err, token) => {
            if (err) throw err;
            else {
              res.status(200).send({ token: token });
            }
          }
        );
      }
    } catch (e) {
      console.log("un erreur : ", e.message);

      res.status(500).send("erreur de serveur");
    }
  }
);
module.exports = router;
