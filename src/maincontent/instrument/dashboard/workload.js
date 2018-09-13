import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {STATES}  from './piechartpane/piechart';
import DevicesOutlinedIcon from '@material-ui/icons/DevicesOutlined'
import { convertHexToRGB } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
    overview: {
        fontWeight: 'bold',
        fontSize: '12px',
        /*marginTop: '10px',*/
        width: '100%',

    },
    head: {
        backgroundColor:'#A9A9A9', 
        display:'flex', 
        justifyContent:'space-between',
        alignItems : 'center',
        paddingLeft:'5px', 
        paddingRight:'5px'
    },
    name: {
        margin: '10px'
    },
    flexRow:{
        display: 'flex',
        flexDirection:'row',
        alignItems : 'center'
    },
    flexColumn:{
        display: 'flex',
        flexDirection:'column',
        alignItems : 'flex-start',
    },
    overviewHead :{
        display: 'flex',
        justifyContent : 'center',
        marginTop : '5px'
    },
    workloadContainer : {
        display: 'flex',
        flexDirection : 'row',
        justifyContent : 'center',
    },
    workload : {
        display: 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        paddingRight: '5px'
    },
    square: {
        width: '5px',
        height: '5px',
        margin: '2px',
        border: '1px solid rgba(0, 0, 0, .2)'
    },
    status: {
        color:'#fff',
        textAlign:'center',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

})

class Workload extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    hexToRgb(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return 'rgb('+Math.floor(parseInt(result[1], 16)/2)+','+Math.floor(parseInt(result[2], 16)/2)+','+Math.floor(parseInt(result[3], 16)/2)+')'
    }

    render() {
        const { classes, instrument, handleClose} = this.props;
        //const { workload } = this.state;//do not use state
        return (
            <div className={classes.overview}>
                <div className={classes.head}>                    
                    <div className={classes.flexRow}>
                        <DevicesOutlinedIcon />
                        <div className={classes.name}>{instrument.name}</div>
                    </div>                 
                </div>
                <div className={classes.status} style={{backgroundImage:'linear-gradient(to right,' +this.hexToRgb(STATES[instrument.status]) +','+STATES[instrument.status]+')'}}>{instrument.status}</div>
            </div>
        )
    }
}

Workload.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Workload);