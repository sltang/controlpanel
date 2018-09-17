import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '5px',
        marginLeft:'8px', 
        //paddingRight:'5px',
    },
    info: {
        fontSize: '10px'
    },
    label: {
        fontWeight: 'bold'
    },
    button:{
        width: '100px',
        textTransform: 'none',
        fontSize: '0.6rem !important',
        fontWeight: '400',
        minHeight: '30px',
        textTransform: 'none',
        marginRight: '5px'
    }
})

class InstrumentInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleLaunch = this.handleLaunch.bind(this)
        this.handleOffLineLaunch = this.handleOffLineLaunch.bind(this)
    }

    handleLaunch(e) {
        e.stopPropagation();
    }

    handleOffLineLaunch(e) {
        e.stopPropagation();        
    }

    render() {
        const { classes, instrument } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={8}>
                    <Grid item xs={12} sm={12}>
                        <Grid container spacing={8}>
                            <Grid item xs={6} sm={6}>
                                <div className={classes.info}><span className={classes.label}>Run Status</span>:</div> 
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <div className={classes.info}>{instrument.runStatus}</div>
                            </Grid>                            
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Grid container spacing={8}>
                            <Grid item xs={6} sm={6}>
                                <div className={classes.info}><span className={classes.label}>Sample</span>:</div> 
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <div className={classes.info}>{instrument.currentSample}</div>
                            </Grid>                            
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Grid container spacing={8}>
                            <Grid item xs={6} sm={6}>
                                <div className={classes.info}><span className={classes.label}>Used By</span>:</div> 
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <div className={classes.info}>{instrument.usedBy}</div>
                            </Grid>                            
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <div className={'row'}>
                            <div className={'col-12'}>
                            {instrument.status==='Not Connected' ?  '':
                                <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleLaunch}>Launch</Button>}
                                <Button variant="outlined" className={classes.button} onClick={this.handleOffLineLaunch}>Launch Offline</Button>
                            </div>   
                        </div>  
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Grid container spacing={8}>
                            <Grid item xs={6} sm={6}>
                                <div className={classes.info}><span className={classes.label}>Location</span>:</div> 
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <div className={classes.info}>{instrument.location}</div>
                            </Grid>                            
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Grid container spacing={8}>
                            <Grid item xs={6} sm={6}>
                                <div className={classes.info}><span className={classes.label}>Application</span>:</div> 
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <div className={classes.info}>{instrument.application}</div>
                            </Grid>                            
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Grid container spacing={8}>
                            <Grid item xs={6} sm={6}>
                                <div className={classes.info}><span className={classes.label}>Project</span>:</div> 
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <div className={classes.info}>{instrument.project}</div>
                            </Grid>                            
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Grid container spacing={8}>
                            <Grid item xs={6} sm={6}>
                                <div className={classes.info}><span className={classes.label}>Controller</span>:</div> 
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <div className={classes.info}>{instrument.controller}</div>
                            </Grid>                            
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Grid container spacing={8}>
                            <Grid item xs={6} sm={6}>
                                <div className={classes.info}><span className={classes.label}>Description</span>:</div> 
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <div className={classes.info}>{instrument.type}</div>
                            </Grid>                            
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

InstrumentInfo.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(InstrumentInfo);