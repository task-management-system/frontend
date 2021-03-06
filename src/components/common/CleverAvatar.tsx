import React from 'react';
import clsx from 'clsx';
import { Avatar, makeStyles, AvatarProps } from '@material-ui/core';
import colors from 'constants/avatar-colors';

const availableColors = Object.keys(colors);

interface CleverAvatarProps {
  children?: string;
}

const useStyles = makeStyles(theme =>
  Object.fromEntries(
    availableColors.map(key => [
      key,
      {
        color: theme.palette.getContrastText(colors[key][500]),
        backgroundColor: colors[key][500],
      },
    ])
  )
);

const CleverAvatar: React.FC<CleverAvatarProps & AvatarProps> = props => {
  const classes = useStyles();
  const power = props.children?.charCodeAt(0) ?? -1;
  const className =
    power > 0 ? classes[availableColors[power % availableColors.length]] : undefined;

  return <Avatar {...props} className={clsx(props.className, className)} />;
};

export default CleverAvatar;
