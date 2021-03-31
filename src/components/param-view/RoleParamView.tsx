import React, { useState, useEffect } from 'react';
import AutocompleteParamView from 'components/param-view/AutocompleteParamView';
import { getRoles } from 'api/v1';
import { Role } from 'types';

interface RoleParamViewProps {
  label: string;
  name: string;
  value: Role | null;
  editing: boolean;
  onChange: (name: string, value: any) => void;
}

const RoleParamView: React.FC<RoleParamViewProps> = props => {
  const [options, setOptions] = useState<Role[]>([]);

  useEffect(() => {
    if (options.length === 0 && props.editing) {
      getRoles().then(response => {
        setOptions(response.data || []);
      });
    }
  }, [props.editing]);

  return (
    <AutocompleteParamView
      {...props}
      options={options}
      getOptionLabel={option => option.meaning}
      getOptionSelected={(option, value) => option.id === value.id}
      render={entry => entry?.meaning}
    />
  );
};

export default RoleParamView;
