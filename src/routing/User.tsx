import React from 'react';
import Container from 'components/common/Container';
import { makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  profile: {
    gap: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: 'max-content 1fr',
  },
  columns: {
    gap: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    alignItems: 'center',
  },
  rows: {
    gap: theme.spacing(2),
    display: 'grid',
    gridAutoRows: 'max-content',
  },
  control: {
    gap: theme.spacing(0.5),
    display: 'grid',
    gridAutoRows: 'max-content',
  },
  actions: {
    gap: theme.spacing(2),
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
    justifyContent: 'end',
    alignItems: 'center',
  },
}));

const User: React.FC = () => {
  const classes = useStyles();

  return (
    <Container>
      {/* <div className={classes.rows}>
        <div className={classes.profile}>
          <Skeleton variant="rect" width={128} height={128} />
          <div className={classes.columns}>
            <div className={classes.rows}>
              <Skeleton variant="rect" height={48} />
              <Skeleton variant="rect" height={48} />
            </div>
            <div className={classes.rows}>
              <Skeleton variant="rect" height={48} />
              <Skeleton variant="rect" height={48} />
            </div>
          </div>
        </div>
        <div className={classes.columns}>
          <div className={classes.control}>
            <Skeleton width={128} />
            <Skeleton variant="rect" height={48} />
          </div>
          <div className={classes.control}>
            <Skeleton width={128} />
            <Skeleton variant="rect" height={48} />
          </div>
        </div>
        <div className={classes.actions}>
          <Skeleton variant="rect" width={256} height={48} />
        </div>
      </div> */}
      <div className={classes.profile}>
        <Skeleton variant="rect" width={128} height={128} />
        <div className={classes.rows}>
          <div className={classes.columns}>
            <div className={classes.rows}>
              <Skeleton variant="rect" height={48} />
              <Skeleton variant="rect" height={48} />
            </div>
            <div className={classes.rows}>
              <Skeleton variant="rect" height={48} />
              <Skeleton variant="rect" height={48} />
            </div>
          </div>
          <div className={classes.columns}>
            <div className={classes.control}>
              <Skeleton width={128} />
              <Skeleton variant="rect" height={48} />
            </div>
            <div className={classes.control}>
              <Skeleton width={128} />
              <Skeleton variant="rect" height={48} />
            </div>
          </div>
          <div className={classes.actions}>
            <Skeleton variant="rect" width={256} height={48} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default User;
