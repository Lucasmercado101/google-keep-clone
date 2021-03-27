import { useState } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  ListItemProps
} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  listItem: {
    maxHeight: 48,
    minHeight: 48,
    borderRadius: "50%",
    padding: 0,
    margin: 0,
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
    color: theme.palette.text.primary
  },
  listHighlight: {
    opacity: 0.2,
    borderRadius: "0 24px 24px 0",
    position: "absolute",
    minHeight: 48,
    maxHeight: 48,
    top: 0,
    left: "-100%",
    right: 0,
    zIndex: 1,
    transition: "clip-path 850ms",
    clipPath: "circle(100% at 61% 50%)"
  },
  listHighlight__closed: {
    transition: "clip-path 150ms",
    clipPath: "circle(28% at 61% 50%)"
  },
  listHighlight__hover: {
    background: theme.palette.text.disabled,
    transition: "clip-path 150ms"
  },
  listHighlight__selected: {
    background: theme.palette.primary.light
  },
  overHighlight: {
    zIndex: 2,
    position: "relative"
  },
  listText: {
    whiteSpace: "nowrap",
    fontSize: ".9rem"
  },
  iconColor: (isSelected) => ({
    color: isSelected ? theme.palette.text.primary : theme.palette.text.disabled
  })
}));

type props = {
  icon: any;
  primary: string;
  isListOpen: boolean;
  isSelected?: boolean;
} & ListItemProps;

const Item: React.FC<props> = ({
  icon,
  primary,
  isListOpen,
  isSelected = false,
  onMouseEnter,
  onMouseLeave,
  className,
  button,
  ...otherProps
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const classes = useStyles(isSelected);
  return (
    <ListItem
      {...otherProps}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={classes.listItem}
    >
      <div
        className={clsx(
          classes.listHighlight,
          !isListOpen && classes.listHighlight__closed,
          isSelected && classes.listHighlight__selected,
          isHovered && !isSelected && classes.listHighlight__hover
        )}
      />
      <ListItemIcon className={clsx(classes.overHighlight, classes.iconColor)}>
        {icon}
      </ListItemIcon>
      <ListItemText
        classes={{ primary: classes.listText }}
        className={classes.overHighlight}
        primary={primary}
      />
    </ListItem>
  );
};

export default Item;
