import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import classNames from 'classnames';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';

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
  'menu-icon':{
    fontSize:'31px'
  }
});

class Appbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: true,
      createAnchorEl: null
    };
  }

  handleMenuMouseOver = (event, el) => {
    this.setState({ [el]: event.currentTarget });
  }

  handleAdd = (el, path)  => {
    this.setState({ [el]: null });
    const { history: { push } } = this.props;
    push(path);
  }

  handleMenuClick = (path, type) => {
    this.props.onTypeChange(type);
    const { history: { push } } = this.props;
    push(path);

  }

  handleMouseLeave = el => {
    this.setState({ [el]: null });
  }

  handleCreate = event => {
    const { history: { push } } = this.props;
    push('/');
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { createAnchorEl, instrumentEl, projectEl, locationEl } = this.state;

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <button className="ag-navbar-btn" onClick={this.handleCreate} aria-owns={createAnchorEl ? 'menu' : null}>
            <i className={classNames('ol-icon-font', 'icon-menu', classes['menu-icon'])}></i></button>
          <div onMouseLeave={e => this.handleMouseLeave('instrumentEl')}>
            <Button
              aria-owns={instrumentEl ? 'instrument-menu' : null}
              aria-haspopup="true"
              onMouseOver={e => this.handleMenuMouseOver(e, 'instrumentEl')}
              onClick={e => this.handleMenuClick('/instruments', 'instruments')}
              color="inherit"
              style={{ 'outline': 'none' }}
            >
              Instruments
              </Button>
            <Popper open={Boolean(instrumentEl)} anchorEl={instrumentEl} transition placement={'bottom-start'} disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="instrument-menu"
                >
                  <Paper style={{backgroundColor:'#384350'}}>                    
                      <MenuList>
                        <MenuItem onClick={e => this.handleAdd('instrumentEl', '/instrument/add')} style={{ color:'#fff'}}>Add Instrument</MenuItem>
                      </MenuList>                    
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
          <div onMouseLeave={e => this.handleMouseLeave('projectEl')}>
            <button className="ag-navbar-btn" onMouseOver={e => this.handleMenuMouseOver(e, 'projectEl')} onClick={e => this.handleMenuClick('/projects', 'projects')}
            aria-owns={projectEl ? 'project-menu' : null}
            aria-haspopup="true"
            >
            <i className={classNames('ol-icon-font', 'icon-project', classes['menu-icon'])}></i></button>
            <Popper open={Boolean(projectEl)} anchorEl={projectEl} transition placement={'bottom-start'} disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="project-menu"
                >
                  <Paper style={{backgroundColor:'#384350'}}>                    
                      <MenuList>
                        <MenuItem onClick={e => this.handleAdd('projectEl', '/project/add')} style={{ color:'#fff'}}>Add Project</MenuItem>
                      </MenuList>                    
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
          <div onMouseLeave={e => this.handleMouseLeave('locationEl')}>
            <Button
              aria-owns={locationEl ? 'location-menu' : null}
              aria-haspopup="true"
              onMouseOver={e => this.handleMenuMouseOver(e, 'locationEl')}
              onClick={e => this.handleMenuClick('/locations', 'locations')}
              color="inherit"
              style={{ 'outline': 'none' }}
            >
              Locations
              </Button>
            <Popper open={Boolean(locationEl)} anchorEl={locationEl} transition placement={'bottom-start'} disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="location-menu"
                >
                  <Paper style={{backgroundColor:'#384350'}}>                    
                      <MenuList>
                        <MenuItem onClick={e => this.handleAdd('locationEl', '/location/add')} style={{ color:'#fff'}}>Add Location</MenuItem>
                      </MenuList>                    
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>

        
        </Toolbar>
      </AppBar>

    );
  }
}

Appbar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(withRouter(Appbar));
