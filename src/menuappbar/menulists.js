import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuListComposition from './menulist';

const styles = theme => ({
  root: {
    flexGrow: 1,
    //zIndex: 10,
    //overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    justifyContent: 'start'
  },
  flex: {
    flex: 1,
  }
})

class MenuLists extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(type) {
    this.props.onTypeChange(type);
  }

  render() {
    const { menus, classes } = this.props;
    const mcs = (x, y) => {
      return x.map((menu, index) => <MenuListComposition key={index} menu={menu} onMenuClick={y.handleClick}/>
    )};

    return (
      <div className={classes.root}>
        {mcs(menus, this)}
      </div>
    )
  }

}

MenuLists.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuLists);
