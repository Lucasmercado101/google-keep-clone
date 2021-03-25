import { makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import { Note as NoteIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  logo: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.primary,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    },
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(0, 10, 0, 0)
    }
  },
  logoIcon: {
    transform: "rotate(-90deg)",
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main
  }
}));

function Logo() {
  const classes = useStyles();
  return (
    <Link to="/notes" className={classes.logo}>
      <NoteIcon fontSize="large" className={classes.logoIcon} color="inherit" />
      <Typography component="span" color="inherit" variant="h5">
        Meep
      </Typography>
    </Link>
  );
}

export default Logo;
