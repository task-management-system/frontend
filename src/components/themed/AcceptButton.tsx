import React from 'react';
import { ThemeProvider, Button, createMuiTheme, ButtonProps } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
});

const AcceptButton: React.FC<ButtonProps> = props => (
  <ThemeProvider theme={theme}>
    <Button color="primary" {...props} />
  </ThemeProvider>
);

export default AcceptButton;
