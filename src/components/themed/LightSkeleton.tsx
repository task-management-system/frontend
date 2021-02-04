import { withStyles, fade } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const LightSkeleton = withStyles(theme => ({
  root: {
    backgroundColor: fade(theme.palette.common.white, theme.palette.type === 'light' ? 0.11 : 0.13),
  },
}))(Skeleton);

export default LightSkeleton;
