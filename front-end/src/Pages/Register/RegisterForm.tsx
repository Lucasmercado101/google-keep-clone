import { useContext, useState } from "react";
import { GlobalStateContext } from "../../StateProvider";
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
import { createAccount } from "../../api";
import { useHistory, Link } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import { AxiosError } from "axios";

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

const RegisterForm: React.FC = observer(() => {
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const history = useHistory();
  let ctx = useContext(GlobalStateContext);
  const classes = useStyles();
  const { handleSubmit, register } = useForm();

  const onSubmit = (data: { userName: string; password: string }) => {
    setError("");
    setIsRegistering(true);
    createAccount(data)
      .then(() => history.replace("/"))
      .catch((err) => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          if ([400, 409].includes(err.response.status))
            setError(`Error: ${err.response.data}`);
          else setError(`Server error: ${err.response.status}`);
        } else if (err.request) {
          // client never received a response, or request never left
          setError("Network error");
        } else {
          setError(`An unknown error ocurred`);
        }
        setIsRegistering(false);
      });
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Collapse in={!!error}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
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
            disabled={isRegistering}
            type="submit"
            color="primary"
            variant="contained"
          >
            {isRegistering ? <CircularProgress /> : "Register"}
          </Button>
        </div>
        <Typography variant="body2" className={classes.bottomText}>
          Already have an account? <Link to="/">Log in</Link>
        </Typography>
      </form>
    </div>
  );
});

export default RegisterForm;
