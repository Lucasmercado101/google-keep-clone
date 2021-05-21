import React from "react";
import { makeStyles, Typography, IconButton } from "@material-ui/core";
import { Icon } from "@mdi/react";
import { mdiPinOutline as PinIcon, mdiPin as UnpinIcon } from "@mdi/js";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  noteContainer: {
    width: 240,
    maxWidth: 240,
    minHeight: 100,
    maxHeight: 450,
    height: "100%",
    border: `thin solid transparent`,
    overflow: "hidden",
    borderRadius: 8
  },
  noteNoColorsContainer: {
    border: `thin solid ${theme.palette.text.disabled}`
  },
  coloredNote: ({ color }: { color?: string }) => ({
    position: "relative",
    "&::after": {
      zIndex: -1,
      content: "''",
      position: "absolute",
      height: "100%",
      top: 0,
      left: 0,
      width: "100%",
      filter: "saturate(350%) opacity(0.25)",
      backgroundImage: color && `linear-gradient(${color}, ${color})`
    }
  }),
  noteContentContainer: {
    padding: theme.spacing(1.5, 2)
  },
  title: {
    fontWeight: 500,
    marginBottom: 5,
    flexGrow: 1,
    lineHeight: 1.7
  },
  pinIcon: {
    float: "right",
    marginBottom: -10,
    marginLeft: -3,
    color: theme.palette.text.secondary
  },
  content: {
    fontSize: "1.05em"
  },
  shortContent: {
    fontWeight: 500,
    fontSize: "initial"
  }
}));

function shorten(str: string | undefined | null, len: number) {
  if (!str) return;
  return str.length > len ? `${str.substr(0, len - 3).trim()}...` : str;
}

const Note: React.FC<any> = ({
  id,
  archived,
  content,
  pinned,
  title,
  color,
  labels
}) => {
  const classes = useStyles({ color });

  return (
    <div
      className={clsx(
        classes.noteContainer,
        color ? classes.coloredNote : classes.noteNoColorsContainer
      )}
    >
      <div className={classes.noteContentContainer}>
        <Typography className={classes.title}>
          <IconButton size="small" className={classes.pinIcon}>
            <Icon path={PinIcon} size={1} />
          </IconButton>
          {shorten(title, 90)}
        </Typography>
        <Typography
          className={clsx(
            classes.content,
            content.length < 20 && classes.shortContent
          )}
        >
          {shorten(content, 235)}
        </Typography>
      </div>
    </div>
  );
};

export default Note;
