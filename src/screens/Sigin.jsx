import React, { useReducer, useState } from "react";
import { Button, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import ButtonEntrar from "../components/Buttons/ButtonEntrar";
import app from "../services/firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialFormValues = {
  email: "",
  password: "",
};

function formReducer(state, action) {
  if ("reset" in action) return initialFormValues;
  if (!("payload" in action)) return state;
  return { ...state, ...action.payload };
}

export default function Sigin({ history }) {
  const classes = useStyles();
  const [form, setForm] = useReducer(formReducer, initialFormValues);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    let name, value;
    [name, value] = [event.target.name, event.target.value];
    setForm({ payload: { [name]: value } });
    if (error) {
      setError(false);
    }
  }

  const submit = () => {
    if (form.email === "" || form.password === "") {
      setError(true);
    } else {
      setLoading(true);
      app
        .auth()
        .signInWithEmailAndPassword(form.email, form.password)
        .then(function () {
          history.push("/home");
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
        });
    }
  };

  return (
    <div className={classes.paper}>
      <Typography variant="button" display="block" gutterBottom>
        Sistema de ponto eletrônico
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="dense"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={form.email}
          onChange={handleChange}
          error={error && !form.email}
        />
        <TextField
          variant="outlined"
          margin="dense"
          required
          fullWidth
          name="password"
          label="Senha"
          type="password"
          id="password"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          error={error && !form.password}
        />
        <ButtonEntrar onClick={submit} disabled={loading}>
          Entrar
        </ButtonEntrar>
        <Grid container>
          <Grid item xs>
            <Button disabled={loading}>Esqueceu a senha?</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
