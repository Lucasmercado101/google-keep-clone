import { makeStyles } from "@material-ui/core";
import LoginForm from "./LoginForm";

const useStyles = makeStyles((theme) => ({
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
  //
  return (
    <div className={classes.page}>
      <img
        className={classes.img}
        src="https://source.unsplash.com/featured/?bird"
      />
      <LoginForm />
    </div>
  );
}

export default Login;
