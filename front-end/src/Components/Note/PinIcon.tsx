import React from "react";
import Icon from "@mdi/react";
import { IconButton, IconButtonProps } from "@material-ui/core";
import { mdiPinOutline as MDIPinIcon, mdiPin as UnpinIcon } from "@mdi/js";

type props = {
  pinned: boolean;
} & IconButtonProps;

const PinIcon: React.FC<props> = ({ pinned, ...otherProps }) => {
  return (
    <IconButton {...otherProps}>
      <Icon path={pinned ? UnpinIcon : MDIPinIcon} size={1} />
    </IconButton>
  );
};

export default PinIcon;
