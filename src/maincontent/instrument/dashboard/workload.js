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

    render() {
        const { classes, instrument, handleClose} = this.props;
        //const { workload } = this.state;//do not use state
        return (
            <div className={classes.overview}>
                <div className={classes.head}>
                    
                    <div className={classes.flexRow}>
                        <DevicesOutlinedIcon />
                        <div className={classes.name}>{instrument.name}</div>
                        {/* <div className={classes.flexColumn}>
                            <div className={classes.name}>{instrument.name}</div>
                            <div className={classes.flexRow}><div className={classes.square} style={{backgroundColor:STATES[instrument.status]}}></div> {instrument.status}</div>
                        </div> */}
                    </div>
                    {/* <div onClick={e => {handleClose(instrument.id)}}><ClearIcon /></div> */}                    
                </div>
                <div className={classes.status} style={{backgroundImage:'linear-gradient(to right,' +STATES[instrument.status] +',white)'}}>{instrument.status}</div>
                {/* <div className={classes.overviewHead}>Analysis Workload Overview</div>
                <div className={classes.workloadContainer}>
                {instrument.data.map((wl, index) => {
                    return <div key={index} className={classes.workload}><div style={{color:COLORS[index]}}>{wl.value}</div><div>{wl.name}</div></div>
                })}
                </div> */}
            </div>
        )
    }
}

Workload.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Workload);