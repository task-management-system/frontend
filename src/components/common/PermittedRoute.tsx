import React from 'react';
import { connect } from 'react-redux';
import { Route, RouteProps } from 'react-router-dom';
import NoMatch from 'routing/NoMatch';
import { haveAnyPermission, haveEveryPermission } from 'utils/permissions';
import { RequireOnlyOne } from 'types/common';
import { TState } from 'types/redux';

interface IPermittedRouteBase {
  any?: string[];
  every?: string[];
}

type IPermittedRouteProps = RequireOnlyOne<IPermittedRouteBase, 'any' | 'every'>;

const PermittedRoute: React.FC<IPermittedRouteProps & TPermittedRouteState & RouteProps> = ({
  any,
  every,
  power,
  permissions,
  ...props
}) => {
  if (any !== undefined) {
    return haveAnyPermission(power, any, permissions) ? <Route {...props} /> : <NoMatch />;
  }

  if (every !== undefined) {
    return haveEveryPermission(power, every, permissions) ? <Route {...props} /> : <NoMatch />;
  }

  return <NoMatch />;
};

const mapStateToProps = (state: TState) => ({
  power: state.metaData.user?.role.power || 0,
  permissions: state.metaData.permissions || [],
});

type TPermittedRouteState = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(PermittedRoute);
