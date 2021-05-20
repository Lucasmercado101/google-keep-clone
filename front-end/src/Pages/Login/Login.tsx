import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  makeStyles,
  TextField,
  Typography,
  Button,
  Collapse,
  CircularProgress
} from "@material-ui/core";
import { Link, useRouter } from "react-router5";
import { Alert, AlertTitle } from "@material-ui/lab";
import { loginMachine, sendTypes } from "./loginMachine";
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
  },
  page: {
    height: "100vh",
    display: "flex"
  },
  img: {
    display: "none",
    height: "100%",
    objectFit: "cover",
    filter: "grayscale(0.4) contrast(110%)",
    [theme.breakpoints.up("md")]: {
      display: "block",
      width: "50%"
    }
  }
}));

function Login() {
  const classes = useStyles();
  const { handleSubmit, register } = useForm();
  const [state, send] = useMachine(loginMachine);
  const router = useRouter();

  useEffect(() => {
    state.done && router.navigate("notes.home", {}, { replace: true });
  }, [state.done, router]);

  return (
    <div className={classes.page}>
      <img
        className={classes.img}
        src="https://source.unsplash.com/featured/?bird"
        alt="A bird"
      />

      <div className={classes.container}>
        <form
          className={classes.form}
          onSubmit={handleSubmit((data) => send(sendTypes.SUBMIT, data))}
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
            Don't have an account? <Link routeName="register">Sign up</Link>
          </Typography>
        </form>
      </div>
    </div>
  );
}

export default Login;
