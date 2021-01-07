import { createMuiTheme } from '@material-ui/core';
import { ruRU } from '@material-ui/core/locale';

const theme = createMuiTheme(
  {
    palette: {
      primary: {
        light: '#7596D3',
        main: '#4F79C5',
        dark: '#3960A8',
      },
      secondary: {
        light: '#B23989',
        main: '#8B2E6B',
        dark: '#64224D',
      },
    },
  },
  ruRU
);

export default theme;
