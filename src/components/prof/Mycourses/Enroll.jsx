import CourseCard from "../usedComponents/Course";
import Grid from "@material-ui/core/Grid";
import Coursedesc from "./Coursedesc";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    left: "70%",
    top: "25%",
    position: "absolute",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    display: "grid",
    placeItems: "center",
    fontSize: "18px",
  },
}));
function Enroll() {
  const [data, setData] = useState(null);
  const dataSent = {
    id: `${useLocation().pathname.split("/")[3]}`,
  };

  async function getCourse() {
    await axios
      .post(
        `http://localhost:5000/${
          document.location.pathname.split("/")[2] === "mycourses"
            ? "getCourse"
            : "getFormation"
        }`,
        dataSent
      )
      .then(
        (res) => {
          console.log("res : : : : ");
          console.log(res);
          setData(res.data);
        },
        (err) => {
          alert("error : " + err.response.data.errors);
          console.log(err.response);
        }
      );
  }
  useEffect(() => {
    if (data === null) {
      getCourse();
    }
  }, [data]);

  //document.body.style.overflow = "hidden";
  const classes = useStyles();
  return (
    <div>
      {data === null ? (
        <div>loading...</div>
      ) : (
        <div>
          <Grid container>
            <Grid item xs={12}>
              <Coursedesc
                title={data.data.title}
                description={data.data.description}
                isFormation={
                  document.location.pathname.split("/")[2] === "mycourses"
                    ? false
                    : true
                }
                //enroll = func
              />
            </Grid>{" "}
            <Grid className={classes.card} item xs={2}>
              <CourseCard
                link="id"
                img={"http://localhost:5000/addPic/" + data.data.image}
                alt="course1"
                title={data.data.title}
                author={data.teacher}
                rating={
                  data.data.numberOfDoneStudents == 0
                    ? data.data.rating
                    : data.data.rating / data.data.numberOfDoneStudents
                }
              />
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}
export default Enroll;
