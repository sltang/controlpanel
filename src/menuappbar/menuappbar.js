import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuLists from './menulists';
import { withRouter } from 'react-router';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    
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
    backgroundColor: '#384350',
  },
});

const menus = [
  {name:'instruments', label: 'Instruments', url:'/instruments', submenus: []},
  {name: 'projects', label: 'Projects', url: '/projects', submenus: [{id:'add-project', label:'Add Project', url:'/project/add'}]},
];

class MenuAppBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: true,
      anchorEl: null,
      createAnchorEl: null
    };
    this.onTypeChange = this.onTypeChange.bind(this);
  }

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

  onTypeChange(type) {
    const { history:{ push }, onTypeChange} = this.props;
    push('/'+type);
    onTypeChange(type);
  }

  render() {
    const { classes } = this.props;
    const { auth, anchorEl, createAnchorEl } = this.state;
    const open = Boolean(anchorEl);
    const openCreate = Boolean(createAnchorEl);

    return (

        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>

              <IconButton
                className={classes.menuButton} aria-owns={openCreate ? 'create-menu' : null} onClick={this.handleCreate} color="inherit" aria-label="Menu"
              >
                <MenuIcon />
              </IconButton>
              <MenuLists menus={menus} onTypeChange={this.onTypeChange}/>
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

export default withStyles(styles, { withTheme: true })(withRouter(MenuAppBar));
