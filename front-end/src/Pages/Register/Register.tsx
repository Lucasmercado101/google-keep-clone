import { makeStyles } from "@material-ui/core";
import RegisterForm from "./RegisterForm";

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
  }
}));

function Register() {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <img
        className={classes.img}
        src="https://source.unsplash.com/featured/?animal"
      />
      <RegisterForm />
    </div>
  );
}

export default Register;
