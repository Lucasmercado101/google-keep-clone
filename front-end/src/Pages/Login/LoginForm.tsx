import { useContext } from "react";
import { GlobalStateContext } from "../../StateProvider";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { makeStyles, TextField, Typography, Button } from "@material-ui/core";
import { logIn } from "../../api";

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
  }
}));

const LoginForm: React.FC = observer(() => {
  let ctx = useContext(GlobalStateContext);
  const classes = useStyles();
  const { handleSubmit, register } = useForm();

  const onSubmit = (data: { userName: string; password: string }) => {
    logIn(data).then((resp) => {
      ctx.userData = resp;
    });
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
          <Button type="submit" color="primary" variant="contained">
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
});

export default LoginForm;
