import { makeStyles, Typography } from "@material-ui/core";

import { Note as NoteIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  logo: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.primary,
    textDecoration: "none",
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
    <div className={classes.logo}>
      <NoteIcon fontSize="large" className={classes.logoIcon} color="inherit" />
      <Typography component="span" color="inherit" variant="h5">
        Meep
      </Typography>
    </div>
  );
}

export default Logo;
