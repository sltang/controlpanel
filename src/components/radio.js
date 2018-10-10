import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    checked: {
        color: '#0085d5',
        height: '16px',
        width: '16px',
        outline: '1px solid #384350',
    },
    indeterminate: {
        width: '16px', height: '16px',
        backgroundColor: '#cce7f7',
        outline: '1px solid #384350',
    },
    disabled: {
        width: '16px', height: '16px',
        backgroundColor: '#e1e3e5',
        outline: '1px solid #c1c6c8',
        borderRadius: '0%',
    },
    checkIcon: {
        color: '#0085d5',
        top: '-12px',
        position: 'relative',
        fontSize: '14px'
    }
})

class AgRadio extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            indeterminate:false,
            checked:false,
        }
        this.handleMouseEnter = this.handleMouseEnter.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
    }

    handleMouseEnter() {
        this.setState({indeterminate:true})
    }

    handleMouseLeave() {
        this.setState({indeterminate:false})
    }

    render() {
        const { checked, handleMouseEnter, handleMouseLeave, disabled, onChange} = this.props
        const indeterminate = this.props.indeterminate ? this.props.indeterminate : this.state.indeterminate
        return (
            <div onClick={onChange && !disabled ? onChange: () => {}} onMouseEnter={handleMouseEnter ? handleMouseEnter: this.handleMouseEnter} onMouseLeave={handleMouseLeave ? handleMouseLeave: this.handleMouseLeave}>
                {disabled ?
                    <svg height="20" width="20">
                        <circle cx="10" cy="10" r="9" stroke="#c1c6c8" strokeWidth="1px" fill="#e1e3e5"/>  
                        {checked ?               
                        <circle cx="10" cy="10" r="6" fill="#c1c6c8" />  :
                        <circle cx="10" cy="10" r="6" fill="#e1e3e5" /> 
                        }               
                    </svg> :
                    <svg height="20" width="20">
                        <circle cx="10" cy="10" r="9" stroke="#384350" strokeWidth="1px" fill={indeterminate ? "#cce7f7" : "#fff"}/>  
                        {checked ?               
                        <circle cx="10" cy="10" r="6" fill="#0085d5" />  :
                        <circle cx="10" cy="10" r="6" fill={indeterminate ? "#cce7f7" : "#fff"} /> 
                        }               
                    </svg>
                }
            </div>
        )
    }
}

AgRadio.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(AgRadio);