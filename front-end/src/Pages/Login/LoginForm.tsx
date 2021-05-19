import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import {
  makeStyles,
  TextField,
  Typography,
  Button,
  Collapse,
  CircularProgress
} from "@material-ui/core";
import { logIn } from "../../api";
import { Alert, AlertTitle } from "@material-ui/lab";
import { loginMachine } from "./loginMachine";
import { AxiosError } from "axios";
import { useMachine } from "@xstate/react";

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.background.paper,
    height: "100%",
    flexGrow: 1,
    display: "flex",
    boxShadow: "0 0 25px rgba(0,0,0,.15)",
    zIndex: 2
  },
  form: {
    margin: "auto 0",
    display: "flex",
    padding: theme.spacing(12),
    flexDirection: "column",
    width: "100%",
    gap: theme.spacing(6)
  },
  formContents: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2)
  },
  subtitle: {
    color: theme.palette.text.secondary
  },
  bottomText: {
    margin: "auto",
    "& a": {
      color: theme.palette.primary.light
    },
    "& a:visited": {
      color: theme.palette.primary.main
    }
  }
}));

const LoginForm: React.FC = observer(() => {
  const classes = useStyles();
  const { handleSubmit, register } = useForm();
  const [state, send] = useMachine(loginMachine);

  return (
    <div className={classes.container}>
      <form
        className={classes.form}
        onSubmit={handleSubmit((data) => send("SUBMIT", data))}
      >
        <Collapse in={!!state.context.error}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {state.context.error}
          </Alert>
        </Collapse>
        <div style={{ textAlign: "left" }}>
          <Typography variant="h4" component="h1">
            Welcome Back.
          </Typography>
          <Typography
            variant="subtitle1"
            className={classes.subtitle}
            component="h2"
          >
            Glad to have you back.
          </Typography>
        </div>
        <div className={classes.formContents}>
          <TextField
            variant="filled"
            inputProps={{ ref: register({ required: true }) }}
            name="userName"
            label="Username"
          />
          <TextField
            variant="filled"
            inputProps={{ ref: register({ required: true }) }}
            name="password"
            label="Password"
            type="password"
          />
          <Button
            disabled={state.matches("submitting")}
            type="submit"
            color="primary"
            variant="contained"
          >
            {state.matches("submitting") ? <CircularProgress /> : "Log In"}
          </Button>
        </div>
        <Typography variant="body2" className={classes.bottomText}>
          {/* Don't have an account? <Link to="/register">Sign up</Link> */}
        </Typography>
      </form>
    </div>
  );
});

export default LoginForm;
