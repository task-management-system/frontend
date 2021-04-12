import { TextFieldProps } from '@material-ui/core';

export interface FieldProps {
  component?: React.ComponentType<TextFieldProps>;
  name: string;
  readOnly?: boolean;
}

export interface CheckboxFieldProps {
  label: string;
  name: string;
  value: string;
  readOnly?: boolean;
}

export type ExcessProps = 'value' | 'onChange';
