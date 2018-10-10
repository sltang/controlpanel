import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';

const styles = theme => ({
    tabsIndicator:{
        backgroundColor:'#384350',
    }
})

class AgTabs extends React.Component {   
    
    render() {
        const { classes, value, onChange, children } = this.props;
        return (

            <Tabs
                value={value ? value : 0}
                onChange={onChange ? onChange : () => { }}
                classes={{ indicator: classes.tabsIndicator }}
            >
                {children}
            </Tabs>

        );
    }
}

AgTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(AgTabs);