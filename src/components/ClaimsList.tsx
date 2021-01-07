import React from 'react';
import { connect } from 'react-redux';
import {
  FormGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@material-ui/core';
import { TState } from 'redux/types';
import { IClaim } from 'types';

interface IClaimsListProps {
  claims: IClaim[];
}

const ClaimsList: React.FC<IClaimsListProps> = ({ claims }) => {
  const [checked, setChecked] = React.useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(checked => {
      if (checked.includes(event.target.name)) {
        return checked.filter(name => name !== event.target.name);
      } else {
        return [event.target.name, ...checked];
      }
    });
  };

  const power = claims.reduce((accumulator, claim) => {
    if (checked.includes(claim.name)) {
      accumulator |= claim.power;
    }

    return accumulator;
  }, 0);

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Список возможностей</FormLabel>
        <FormGroup>
          {claims.map(claim => (
            <FormControlLabel
              control={
                <Checkbox
                  name={claim.name}
                  checked={checked.includes(claim.name) || false}
                  onChange={handleChange}
                />
              }
              label={claim.text}
            />
          ))}
        </FormGroup>
      </FormControl>
      <Typography>Power: {power}</Typography>
    </>
  );
};

const mapStateToProps = (state: TState) => ({
  claims: state.metaData.claims,
});

export default connect(mapStateToProps)(ClaimsList);
