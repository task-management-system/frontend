import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core';
import RouteButton from 'components/common/RouteButton';

interface IRouteParams {
  module: string | undefined;
}

const SubNavigationButton: React.FC<{ to: string }> = props => {
  const { params } = useRouteMatch<IRouteParams>();
  const isActive = props.to === params?.module || false;

  return (
    <RouteButton
      to={`/administration/${props.to}`}
      variant={isActive ? 'contained' : 'text'}
      color={isActive ? 'secondary' : 'inherit'}
    >
      {props.children}
    </RouteButton>
  );
};

const useStyles = makeStyles(theme => ({
  toolbar: {
    gap: theme.spacing(1),
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
  },
}));

const AdministrationNavbar: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.toolbar} variant="dense">
        <SubNavigationButton to="users">Пользователи</SubNavigationButton>
        <SubNavigationButton to="structure">Структура</SubNavigationButton>
        <SubNavigationButton to="roles">Роли</SubNavigationButton>
      </Toolbar>
    </AppBar>
  );
};

export default AdministrationNavbar;
