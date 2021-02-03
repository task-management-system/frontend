import React from 'react';
import { connect } from 'react-redux';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core';
import Logo from './Logo';
import Profile from '../profile/Profile';
import NavigationButton from './NavigationButton';
import { haveAnyPermission } from 'utils/permissions';
import { ADMINISTRATION_PERMISSIONS } from 'constants/permissions';
import { TState } from 'types/redux';

interface INavbarProps {
  permissions: {
    administration: boolean;
  };
}

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.appBar + 1,
  },
  wrapper: {
    padding: theme.spacing(0, 3),
    flexGrow: 1,
    alignSelf: 'stretch',
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
  },
}));

const Navbar: React.FC<INavbarProps> = ({ permissions }) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar>
        <Logo />
        <div className={classes.wrapper}>
          <NavigationButton to="/">Задачи</NavigationButton>
          {permissions.administration && (
            <NavigationButton to="/administration">Администрирование</NavigationButton>
          )}
        </div>
        <Profile />
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = ({ metaData }: TState) => ({
  permissions: {
    administration: haveAnyPermission(
      metaData.user?.role.power,
      ADMINISTRATION_PERMISSIONS,
      metaData.permissions
    ),
  },
});

export default connect(mapStateToProps)(Navbar);
