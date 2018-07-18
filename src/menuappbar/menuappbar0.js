import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
});

class MenuAppBar extends Component {
  state = {
    auth: true,
    anchorEl: null,
    createAnchorEl: null
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCreate = event => {
    this.setState({ createAnchorEl: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleCreateClose = () => {
    this.setState({ createAnchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl, createAnchorEl } = this.state;
    const open = Boolean(anchorEl);
    const openCreate = Boolean(createAnchorEl);

    return (

        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex} >
              <IconButton
                className={classes.menuButton} aria-owns={openCreate ? 'create-menu' : null} onClick={this.handleCreate} color="inherit" aria-label="Menu"
              >
                <MenuIcon />
              </IconButton>
              Create
              <Menu id="create-menu"
              anchorEl={createAnchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={openCreate}
              onClose={this.handleCreateClose}
              >
                <MenuItem onClick={this.handleCreateClose}>Create</MenuItem>
                <MenuItem onClick={this.handleCreateClose}>Create Instrument</MenuItem>
              </Menu>
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>

    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MenuAppBar);
