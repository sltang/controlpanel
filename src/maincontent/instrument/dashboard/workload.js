import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {STATES}  from './piechartpane/piechart';
import DevicesOutlinedIcon from '@material-ui/icons/DevicesOutlined'

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
    workload : {
        display: 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        paddingRight: '5px'
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
        let r = parseInt(result[1], 16)
        let g = parseInt(result[2], 16)
        let b = parseInt(result[3], 16)
        let r1 =  Math.max(r-25, 0), r2 = Math.min(r+25, 255)
        let g1 =  Math.max(g-25, 0), g2 = Math.min(g+25, 255)
        let b1 =  Math.max(b-25, 0), b2 = Math.min(b+25, 255)
        return {rgb1:'rgb('+r1+','+g1+','+b1+')', rgb2:'rgb('+r2+','+g2+','+b2+')'}
    }

    render() {
        const { classes, instrument } = this.props;
        const {rgb1, rgb2} = this.hexToRgb(STATES[instrument.status])
        return (
            <div className={classes.overview}>
                <div className={classes.head}>                    
                    <div className={classes.flexRow}>
                        <DevicesOutlinedIcon />
                        <div className={classes.name}>{instrument.name}</div>
                    </div>                 
                </div>
                <div className={classes.status} style={{backgroundImage:'linear-gradient(to right,' +rgb1 +','+rgb2+')'}}>{instrument.status}</div>
            </div>
        )
    }
}

Workload.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Workload);