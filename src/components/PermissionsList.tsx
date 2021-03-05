import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  FormGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@material-ui/core';
import { State } from 'types/redux';

interface PermissionsListProps {}

const PermissionsList: React.FC<PermissionsListProps & PermissionsLisState> = ({
  power,
  permissions,
}) => {
  const [checked, setChecked] = useState<string[]>([]);

  useEffect(() => {
    const userPermissions = permissions
      .filter(permission => (power & permission.power) > 0)
      .map(permission => permission.name);

    setChecked(userPermissions);
  }, [power, permissions]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(checked => {
      if (checked.includes(event.target.name)) {
        return checked.filter(name => name !== event.target.name);
      } else {
        return [event.target.name, ...checked];
      }
    });
  };

  const total = permissions.reduce((accumulator, permission) => {
    if (checked.includes(permission.name)) {
      accumulator |= permission.power;
    }

    return accumulator;
  }, 0);

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Список возможностей</FormLabel>
        <FormGroup>
          {permissions.map(permission => (
            <FormControlLabel
              control={
                <Checkbox
                  name={permission.name}
                  checked={checked.includes(permission.name) || false}
                  onChange={handleChange}
                />
              }
              label={permission.description}
              key={permission.power}
            />
          ))}
        </FormGroup>
      </FormControl>
      <Typography>
        <code>Power [DEC]: {total}</code>
      </Typography>
      <Typography>
        <code>Power [BIN]: {total.toString(2).padStart(permissions.length, '0')}</code>
      </Typography>
    </>
  );
};

const mapStateToProps = (state: State) => ({
  power: state.metaData.user?.role.power || 0,
  permissions: state.metaData.permissions || [],
});

type PermissionsLisState = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(PermissionsList);
