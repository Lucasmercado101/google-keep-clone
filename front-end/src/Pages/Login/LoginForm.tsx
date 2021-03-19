import { useForm } from "react-hook-form";
import { makeStyles, TextField, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.background.paper,
    height: "100%",
    flexGrow: 1,
    display: "flex"
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
  }
}));

function LoginForm() {
  const classes = useStyles();
  const { handleSubmit, register } = useForm();

  const onSubmit = (data: { userName: string; password: string }) => {};

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div style={{ textAlign: "left" }}>
          <Typography variant="h4" component="h1">
            Welcome Back.
          </Typography>
          <Typography variant="subtitle1" component="h2">
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
          <Button color="primary" variant="contained">
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
