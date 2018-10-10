import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import CheckIcon from '@material-ui/icons/Check';
import classNames from 'classnames'

const styles = theme => ({
    //   hover:{
    //     '&$hover:hover': {
    //       backgroundColor:'#f5f5f5'
    //     }
    //   },
    //   colorSecondary: {
    //     '&$checked': {
    //       color: '#0085d5'
    //     }
    //   },
      checked: {
        color: '#0085d5',
        height: '16px', 
        width:'16px', 
        outline:'1px solid #384350',
      },
      indeterminate: {
        width:'16px', height:'16px',
        backgroundColor:'#cce7f7',
        outline:'1px solid #384350',
      },
      unchecked: {
        width:'16px', 
        height:'16px', 
        outline:'1px solid #384350'
      },
      disabled: {
        width:'16px', height:'16px',
        backgroundColor:'#e1e3e5',
        outline:'1px solid #c1c6c8', 
        borderRadius: '0%', 
      },
      checkIcon:{
        color:'#0085d5', 
        top:'-12px',
        position:'relative',
        fontSize:'14px'
      }
})

class AgCheckbox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            indeterminate:false
        }
        this.handleMouseEnter = this.handleMouseEnter.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
        this.getCheckbox = this.getCheckbox.bind(this)
    }

    handleMouseEnter() {
        this.setState({indeterminate:true})
    }

    handleMouseLeave() {
        this.setState({indeterminate:false})
    }

    getCheckbox() {
        const {classes, checked, disabled} = this.props
        const indeterminate = this.props.indeterminate ? this.props.indeterminate : this.state.indeterminate
        const checkIcon = <CheckIcon className={classes.checkIcon} />
        let checkbox
        if (disabled) {
            if (checked) {                
                checkbox = <span className={classes.disabled}>{checkIcon}</span>
            } else {
                checkbox = <span className={classNames(classes.disabled, classes.unchecked)}></span>
            }
        } else {
            if (checked) {  
                if (indeterminate) {
                    checkbox = <span className={classes.indeterminate}>{checkIcon}</span>
                } else {
                    checkbox = <span className={classes.unchecked}>{checkIcon}</span>
                }
            } else {
                if (indeterminate) {
                    checkbox = <span className={classes.indeterminate}></span>
                } else {
                    checkbox = <span className={classes.unchecked}></span>
                }
            }
        }
        return checkbox 
    }

    render() {
        const {classes, checked, handleMouseEnter, handleMouseLeave, onChange, disabled} = this.props
        const indeterminate = this.props.indeterminate ? this.props.indeterminate : this.state.indeterminate
        const checkIcon = <CheckIcon className={classes.checkIcon} />
        //const checkbox = this.getCheckbox()
        // return (
        //     <div onClick={onChange}
        //         onMouseEnter={handleMouseEnter ? handleMouseEnter : this.handleMouseEnter}
        //         onMouseLeave={handleMouseLeave ? handleMouseLeave : this.handleMouseLeave}>
        //         {checkbox}
        //     </div>
        // )
        return (
            <Checkbox
                disableRipple
                checked={checked}
                disabled={disabled}
                color="secondary"
                checkedIcon={
                    disabled ?
                        <span className={classes.disabled}>{checkIcon}</span> 
                        :
                        indeterminate ?
                            <span className={classes.disabled}>{checkIcon}</span>
                            :
                            <span className={classes.unchecked}>{checkIcon}</span>
                }
                icon={disabled ?
                    <span className={classes.disabled} /> :
                    <span className={classes.unchecked} />}
                indeterminate={indeterminate}                             
                indeterminateIcon={checked ? <span className={classes.indeterminate}>{checkIcon}</span> : <span className={classes.indeterminate}></span>}
                onChange={onChange}
                onMouseEnter={handleMouseEnter ? handleMouseEnter: this.handleMouseEnter}
                onMouseLeave={handleMouseLeave ? handleMouseLeave: this.handleMouseLeave}
            />)
    }
}

AgCheckbox.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(AgCheckbox);