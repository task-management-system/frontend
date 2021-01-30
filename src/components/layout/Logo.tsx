import React from 'react';
import { Typography } from '@material-ui/core';
import useScreenWidthCompare from 'hooks/useScreenWidthCompare';

const Logo: React.FC = () => {
  const isSmall = useScreenWidthCompare(width => width <= 840);

  return <Typography variant="h6">{isSmall ? 'TMS' : 'Task Management System'}</Typography>;
};

export default Logo;
