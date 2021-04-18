import React, { useState, useEffect } from 'react';
import AutocompleteFormField, {
  AutocompleteFormFieldProps,
} from 'components/formik/AutocompleteFormField';
import { User } from 'types';
import { getUsers } from 'api/v1';

const ExecutorsAutocomplete: React.FC<
  Omit<
    AutocompleteFormFieldProps<User>,
    'options' | 'getOptionLabel' | 'getOptionSelected' | 'multiple'
  >
> = props => {
  const [executors, setExecutors] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(response => {
      setExecutors(response.data || []);
    });
  }, []);

  return (
    <AutocompleteFormField
      {...props}
      options={executors}
      getOptionLabel={option => option.name || option.username}
      getOptionSelected={(option, value) => option.id === value.id}
      multiple
      filterSelectedOptions
    />
  );
};

export default ExecutorsAutocomplete;
