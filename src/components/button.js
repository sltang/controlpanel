import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames'

const styles = theme => ({
    button: {
        border: '1px solid #e1e3e5',
        margin: '10px',
        borderRadius: 0,
        minWidth: '138px',
        height: '36px',
        fontSize: '14px',
        color: '#252a30',
        textAlign:'center'
    }
})

let AgButton = props => {

    const {classes, type, dark, disabled, onClick, value, styles} = props
    const buttonType = dark ? `ag-btn-${type}-${dark}`: `ag-btn-${type}`
    if (disabled) {
        return (<button className={classNames('btn', buttonType, classes.button, styles)} disabled
        onClick={onClick ? onClick : () => {}}>{value}</button>)
    } else {
        return (<button className={classNames('btn', buttonType, classes.button, styles)} 
        onClick={onClick ? onClick : () => {}}>{value}</button>)
    }        

}

AgButton.propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};
  
export default withStyles(styles)(AgButton);