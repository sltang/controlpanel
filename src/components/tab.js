import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
    tab: {
        textTransform:'none', outline:'none'
    },
})

class AgTab extends React.Component {
//let AgTabs = props => {

    //console.log('AgTabs')
    
    
      render() {
        const { classes, label } = this.props;    
        return (    
            <Tab label={label} disableRipple style={{textTransform:'none', outline:'none', backgroundColor:'#e1e3e5'}}/>            
        );
      }

}

AgTab.propTypes = {
    classes: PropTypes.object.isRequired,
    //value: PropTypes.string.isRequired,
};
  
export default withStyles(styles)(AgTab);