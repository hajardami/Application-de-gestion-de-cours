import React from "react";
import MyButton from "../usedComponents/MyButton";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import axios from "axios";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles({
  root: {
    float: "left",
    position: "absolute",
    marginLeft: "12%",
    fontFamily: "Cascadia Code",
  },
  secondary: {
    float: "left",
    position: "absolute",
    marginLeft: "12%",
    fontFamily: "Cascadia Code",
    paddingRight: "2%",
  },
  third: {
    float: "left",
    position: "absolute",
    fontFamily: "Cascadia Code",
    paddingRight: "2%",
  },
});

async function deleteAccount() {
  try {
    let a = localStorage.getItem("currentUser");
    if (a !== null && a !== undefined) {
      axios.defaults.headers.common["x-auth-token"] = a;
    } else {
      alert("token problem :)");
      return;
    }
    await axios.delete(`http://localhost:5000/deleteAccount`).then(
      (res) => {
        alert("clicked");
        alert(res.status);
        console.log(res);
        localStorage.setItem("currentUser", null);
        window.location.reload(false);
      },
      (err) => {
        alert("clicked err");

        console.log(err);
      }
    );
  } catch (error) {
    console.error("l9it error\n\n\n\n");
  }
}
function SignUp(props) {
  let style = useStyles();
  return (
    <MyButton
      bgColor="#FBEEC1"
      fgColor="black"
      className={style.root}
      value="Mes Formations et Cours"
      url="/mycourses" //using parameters to lock the choice of prof
      //                        or student in inscription form
    />
  );
}

function StartedButton(props) {
  let style = useStyles();
  if (localStorage.getItem("isStudent") !== "true") return <div></div>;
  return (
    <MyButton
      bgColor="#FBEEC1"
      fgColor="black"
      className={style.secondary}
      value="Mes Formations/Cours commencées"
      url="/mystartedcourses"
    />
  );
}
function DoneButton(props) {
  let style = useStyles();
  if (localStorage.getItem("isStudent") !== "true") return <div></div>;

  return (
    <MyButton
      bgColor="#FBEEC1"
      fgColor="black"
      className={style.secondary}
      value="Mes Formations/Cours terminées"
      url="/myfinishedcourses"
    />
  );
}
function Del() {
  return (
    <div>
      <DeleteForeverIcon /> Supprimer mon Compte
    </div>
  );
}
function DeleteButton(props) {
  let style = useStyles();
  return (
    <MyButton
      bgColor="red"
      fgColor="white"
      className={style.fifth}
      value="Supprimer mon Compte"
      startIcon={<DeleteForeverIcon />}
      onClick={deleteAccount}
      size="13px"
    />
  );
}
function ChangePassword(props) {
  let style = useStyles();
  return (
    <MyButton
      bgColor="#7e7e7e"
      fgColor="white"
      className={style.fifth}
      startIcon={<SettingsIcon />}
      value="changer le mot de passe"
      url="/changePassword"
      size="13px"
    />
  );
}
export default SignUp;
export { StartedButton, DoneButton, DeleteButton, ChangePassword };
