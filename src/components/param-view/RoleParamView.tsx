import React, { useState, useEffect } from 'react';
import AutocompleteParamView from 'components/param-view/AutocompleteParamView';
import { getRoles } from 'api/v1';
import { IRole } from 'types';

interface IRoleParamView {
  label: string;
  name: string;
  value: IRole | null;
  editing: boolean;
  onChange: (name: string, value: any) => void;
}

const RoleParamView: React.FC<IRoleParamView> = props => {
  const [options, setOptions] = useState<IRole[]>([]);

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
      getOptionLabel={option => option.text}
      getOptionSelected={(option, value) => option.id === value.id}
      render={entry => entry?.text}
    />
  );
};

export default RoleParamView;
