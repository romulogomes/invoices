import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import Logo from './Logo';

const Navbar = ({ onMobileNavOpen, ...rest }) => {
  const navigate = useNavigate();

  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <Logo />
        <Box sx={{ flexGrow: 1 }} />
        <Hidden xlDown>
          <IconButton color="inherit" size="large" onClick={() => navigate('/login')}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen} size="large">
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default Navbar;
