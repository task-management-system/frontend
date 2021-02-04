import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Toolbar, makeStyles } from '@material-ui/core';
import MenuDrawer from 'components/themed/MenuDrawer';
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
  container: {
    padding: theme.spacing(1),
    gap: theme.spacing(1),
    display: 'grid',
    gridAutoRows: 'max-content',
  },
}));

const AdministrationMenu: React.FC = () => {
  const classes = useStyles();

  return (
    <MenuDrawer variant="permanent">
      <Toolbar />
      <div className={classes.container}>
        <SubNavigationButton to="users">Пользователи</SubNavigationButton>
        <SubNavigationButton to="structure">Структура</SubNavigationButton>
        <SubNavigationButton to="roles">Роли</SubNavigationButton>
      </div>
    </MenuDrawer>
  );
};

export default AdministrationMenu;
