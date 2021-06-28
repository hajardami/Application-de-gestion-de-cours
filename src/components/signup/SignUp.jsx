import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockIcon from "@material-ui/icons/Lock";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../usedComponents/Copyright";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "@material-ui/core/Link";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
//style :

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, -4),
  },
  textField: {
    background: "white",
  },
  formControl: {
    margin: theme.spacing(1, 0, 0),
  },
  root: {
    display: "flex",
    justifyContent: "center",
  },
  label: {
    marginTop: "15px",
    marginLeft: "20px",
    marginBottom: "15px",
    fontFamily: "Montserrat",
    fontSize: "17px",
  },
  p: { margin: theme.spacing(3, 2, -4) },
}));

//component :

export default function SignUp() {
  const classes = useStyles();
  //effect-state

  useEffect(() => {
    document.body.style.overflow = "hidden";
  });
  const [sent, setSent] = useState(false);
  const [state, setState] = React.useState({
    prof: false,
    student: false,
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const { prof, student } = state;
  const error = [prof, student].filter((v) => v).length !== 1;
  //react form hook :

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitFunc = async (data) => {
    if (
      !errors.email &&
      !errors.firstName &&
      !errors.lastName &&
      !errors.password &&
      state.prof !== state.student
    ) {
    } else {
      return;
    }
    try {
      data.isStudent = state.student;
      await axios.post(`http://localhost:5000/users`, data).then(
        (res) => {
          setSent(true);
        },
        (err) => {
          let error = "";
          for (let i of err.response.data.errors) {
            error += i.param + " : " + i.msg + "\n\n";
          }
          alert("erreur de code : " + err.response.status + "\n" + error);
          console.log(error);
        }
      );
    } catch (error) {
      console.error("l9it error\n\n\n\n");
    }
  };

  //return

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            S'inscrire
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(submitFunc)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  className={classes.textField}
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="Prénom"
                  autoFocus
                  {...register("firstName", {
                    required: true,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                  helperText={errors.firstName ? "vérifier le prénom svp" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Nom"
                  name="lastName"
                  autoComplete="lname"
                  {...register("lastName", {
                    required: true,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                  helperText={errors.lastName ? "vérifier le nom svp" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Adresse Email"
                  name="email"
                  autoComplete="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                  helperText={errors.email ? "vérifier l'email svp" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  id="password"
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                  })}
                  helperText={errors.password ? "mot de passe trop court" : ""}
                />
              </Grid>
            </Grid>

            <div className={classes.root}>
              <FormControl
                required
                error={error}
                component="fieldset"
                className={classes.formControl}
              >
                <FormLabel component="legend" className={classes.formLabel}>
                  Choisir un choix svp!
                </FormLabel>
                <label className={classes.label}>Vous Êtes ?: </label>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={student}
                        onChange={handleChange}
                        name="student"
                      />
                    }
                    label="Etudiant"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={prof}
                        onChange={handleChange}
                        name="prof"
                      />
                    }
                    label="Professeur"
                  />
                </FormGroup>
              </FormControl>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              S'inscrire
            </Button>
          </form>
          {sent && (
            <Box mt={5}>
              <div
                style={{
                  padding: "10px",
                  marginBottom: "-20px",
                  borderRadius: "3px 3px 3px 3px",
                  color: "#270",
                  backgroundColor: "#DFF2BF",
                }}
              >
                Vérifier votre boite mail
              </div>
            </Box>
          )}
          <Box mt={5} className={classes.p}>
            <Link href="/signin">
              <p>S'authetifier</p>
            </Link>
          </Box>
          <Box mt={5}>
            <Link href="/">
              <Copyright title="Gestion de Cours - ENSIAS" color="black" />
            </Link>
          </Box>
        </div>
      </Container>
    </div>
  );
}
