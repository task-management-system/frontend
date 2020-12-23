import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, TextFieldProps } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const PasswordField: React.FC<TextFieldProps> = props => {
  const [passwordHidden, setPasswordHidden] = useState(true);
  const type = passwordHidden ? 'password' : 'text';

  const togglePassword = () => setPasswordHidden(passwordHidden => !passwordHidden);

  return (
    <TextField
      {...props}
      type={type}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              color="primary"
              aria-label="Переключить видимость пароля"
              onClick={togglePassword}
            >
              {passwordHidden ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
