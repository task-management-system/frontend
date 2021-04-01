import { TextFieldProps } from '@material-ui/core';

export interface FieldProps {
  component?: React.ComponentType<TextFieldProps>;
  name: string;
  readOnly?: boolean;
}

export type ExcessProps = 'value' | 'onChange';
