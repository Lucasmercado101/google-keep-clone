import { useEffect } from "react";
import { useMachine } from "@xstate/react";
import { registerMachine, sendTypes } from "./registerMachine";
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

const useStyles = makeStyles((theme) => ({
  page: {
    height: "100vh",
    display: "flex",
    flexDirection: "row-reverse"
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
  },
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

function Register() {
  const classes = useStyles();
  const [state, send] = useMachine(registerMachine);
  const { handleSubmit, register } = useForm();
  const router = useRouter();

  const onSubmit = (data: { userName: string; password: string }) =>
    send(sendTypes.SUBMIT, data);

  useEffect(() => {
    state.done && router.navigate("login");
  }, [state.done]);

  return (
    <div className={classes.page}>
      <img
        className={classes.img}
        src="https://source.unsplash.com/featured/?animal"
      />

      <div className={classes.container}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Collapse in={!!state.context.error}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {state.context.error}
            </Alert>
          </Collapse>
          <div style={{ textAlign: "left" }}>
            <Typography variant="h4" component="h1">
              Create Your Account
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
            />
            <Button
              disabled={state.matches("submitting")}
              type="submit"
              color="primary"
              variant="contained"
            >
              {state.matches("submitting") ? <CircularProgress /> : "Register"}
            </Button>
          </div>
          <Typography variant="body2" className={classes.bottomText}>
            Already have an account? <Link routeName="login">Log in</Link>
          </Typography>
        </form>
      </div>
    </div>
  );
}

export default Register;
