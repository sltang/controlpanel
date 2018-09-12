import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Workload from './workload';
import Gauge from './gauge';
import Gauge2 from './gauge2';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InstrumentInfo from './instrumentinfo'

const styles = theme =>  ({
    /*instrumentCard : {
        width:'192px', 
        height:'200px',
        display: 'flex',
        flexDirection : 'column',
    },*/
    card: {
        maxWidth: 220,
        height: '300px',
        marginTop:'10px'
    },
    cardContent: {
        paddingLeft:'0px', paddingRight:'0px', paddingTop:'0px'
    }

})


class Instrument extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            data : this.props.data,
        }
    }

    render() {
        const { classes, instrument, handleClose, handleClick } = this.props;
        return (
            <Card className={classes.card} onClick={e => handleClick(instrument.id)}>
                <CardContent className={classes.cardContent}>
                    <Workload instrument={instrument} handleClose={handleClose}/>
                    {/* <Gauge2 data={instrument.data} id={instrument.id}/> */}
                    <InstrumentInfo instrument={instrument}/>
                </CardContent>
            </Card>
        )
    }
}

Instrument.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Instrument);