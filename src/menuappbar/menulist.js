import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Manager, Reference, Popper } from 'react-popper';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
  popperClose: {
    pointerEvents: 'none',
  },
});

class MenuListComposition extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleToggle = (e) => {
    this.setState({ open: !this.state.open });
    this.props.onMenuClick(this.props.menu.name);
  };

  handleClose = event => {
    if (this.target1.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <Manager>
          <Reference>
            {({ ref }) => (
              <div
                ref={node => {
                  this.target1 = node;
                }}
              >
                <Button
                  buttonRef={ref}
                  aria-owns={open ? 'menu-list-grow' : null}
                  aria-haspopup="true"
                  onClick={this.handleToggle}
                  color="inherit"
                >
                  {this.props.menu.label}
                </Button>
              </div>
            )}
          </Reference>
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={classNames({ [classes.popperClose]: !open })}
          >
            {({ ref, style }) => (
              <div ref={ref} style={style}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <Grow in={open} id="menu-list-grow" style={{ transformOrigin: '0 0 0' }}>
                    <Paper>
                      <MenuList role="menu">

                      </MenuList>
                    </Paper>
                  </Grow>
                </ClickAwayListener>
              </div>
            )}
          </Popper>
        </Manager>
        
      </div>
    );
  }
}

MenuListComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuListComposition);
/*
<Manager>
          <Reference>
            <div
              ref={node => {
                this.target1 = node;
              }}
            >
              <Button
                aria-owns={open ? 'menu-list-grow' : null}
                aria-haspopup="true"
                onClick={this.handleToggle}
                color="inherit"
              >
                {this.props.menu.label}
              </Button>
            </div>
          </Reference>
          
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={classNames({ [classes.popperClose]: !open })}
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow in={open} id="menu-list-grow" style={{ transformOrigin: '0 0 0' }}>
                <Paper>
                  <MenuList role="menu">

                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>*/

