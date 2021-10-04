import createStyles from '@material-ui/styles/createStyles';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles(() => createStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%'
    },
    body: {
      backgroundColor: '#f4f6f8',
      height: '100%',
      width: '100%'
    },
    a: {
      textDecoration: 'none'
    },
    '#root': {
      height: '100%',
      width: '100%'
    },
    '.loading-indicator:after': {
        content: "'Loading...'",
        position: 'fixed',
        width: '100%',
        top: '50%',
        left: '0',
        zIndex: '1001',
        color: '#172b4d',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '1.5rem'
    }
  }
}));

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;
