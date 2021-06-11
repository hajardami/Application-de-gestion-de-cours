const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Student = require("../../../models/Student");
const Formation = require("../../../models/Formation");
let done = false;
let error;
let formationsIds = [];
let formations = [];
router.post("/", auth, async (req, res) => {
  try {
    let error1 = null,
      error2 = null;
    error = null;
    console.log(req.user + req.student + req.prof);
    if (req.student) {
      if (!error1 && !error2 && !error)
        await Student.findById(req.student.id, (err, data) => {
          formationsIds = [];
          formations = [];
          if (err || !data) {
            error1 = err + "erreur dans l'etudiant ";
            return;
          }
          for (let i of data.enrolledFormations) {
            formationsIds.push(i.formation);
          }
        });
      if (!error1 && !error2 && !error) {
        console.log(formationsIds);
        if (formationsIds.length === 0) res.status(200).send("[]");
        else
          formationsIds.forEach(async (i, index) => {
            await Formation.findById(i, (err, data) => {
              if (err || !data) {
                error1 = err || "probleme dans les cours de cet etudiant";
                return;
              }
              formations.push(data);
            });
            if (index === formationsIds.length - 1) {
              console.log("formations lasr ");
              console.log(formations);
              done = true;
              res.status(200).json(formations);
            }
          });
      }
      console.log("--\n--\n--\n--\n--\n--\n");
    } else if (req.prof) throw new Error("prof cant enroll formations");
    error1 === null ? (error = error2) : (error = error1);
    if (error) throw error;
  } catch (e) {
    console.log(e);
    done = true;
    res.status(500).send("erreur de serveur : " + error);
  }
});
module.exports = router;
