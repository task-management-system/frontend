import React, { useState, useEffect } from 'react';
import AutocompleteParamView from 'components/param-view/AutocompleteParamView';
import { loadRoles } from 'api/v1';
import { Role } from 'types';

interface RoleParamViewProps {
  label: string;
  name: string;
  value: Role | null;
  editing: boolean;
  disabled?: boolean;
  onChange: (name: string, value: any) => void;
}

const RoleParamView: React.FC<RoleParamViewProps> = props => {
  const [options, setOptions] = useState<Role[]>([]);

  useEffect(() => {
    if (options.length === 0 && props.editing) {
      loadRoles().then(response => {
        setOptions(response.data || []);
      });
    }
  }, [options.length, props.editing]);

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
