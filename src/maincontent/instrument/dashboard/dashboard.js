import React, { Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Instrument from './instrument';
import Grid from '@material-ui/core/Grid';
//import EventSource from 'eventsource';
import InfiniteScroll from "react-infinite-scroller";
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
//import './dashboard.css'
//import axios from 'axios';


const styles = theme => ({
    root: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'row',
      minHeight: '380px',
      marginBottom:'10px'
    },
    paper: {
        height: 360,
        width: 240,
    },
})

// const eventSourceInitDict = {
//     headers: {
//         'Last-Event-ID':1
//     },
// }

const UPDATE_SIZE = 10;

class InstrumentDashboard extends Component {

    //randomLength = 30000
    //timer = null

    constructor(props) {
        super(props);
        this.state = {
            instruments: this.props.data,
            data: [],
            start: 0,
            errors : {},
            hasMore: true
            //title: '',
            //currentRun : 0
        }
        //this.computeInstrumentState = this.computeInstrumentState.bind(this)
        //this.simulateInstrumentUpdate = this.simulateInstrumentUpdate.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.fetchMoreData = this.fetchMoreData.bind(this);
        this.handleHeadingClick = this.handleHeadingClick.bind(this);        
        //this.timer = setInterval(this.simulateInstrumentUpdate, parseInt(Math.random() * this.randomLength + 10000, 10))
    }

    //simulateInstrumentUpdate() {
        // let data = [{
        //     "applicationId": 1, 
        //     "defaultProjectId": 2, 
        //     projectName: 'FLD-78',
        //     controller: 'nr-w764-z420-1',
        //     "alwaysUseDefaultProject": true, 
        //     "id": 115, 
        //     "name": "LC 63", 
        //     "description": "Agilent LC & LC/MS", 
        //     "isConfigured": true, 
        //     "isLocked": true,
        //     title: 'Current sample title 2',
        //     username: 'User running current sample',
        //     state: 'Running',
        //     currentRun: parseInt(Math.random() * 20)+1, 
        //     totalRuns: 20, 
        //     elapsedRuntime: 10, 
        //     totalRuntime: 300,
        //     runQueue: ['Sample 21', 'Current sample title 2', 'Sample 22', 'Sample 23']
        // }]
        // this.computeInstrumentState(data)
    //}

    componentDidMount() {   
        // let data = [{
        //     "applicationId": 1, 
        //     "defaultProjectId": 1, 
        //     projectName: 'FLD-78', ///projects/1
        //     controller: 'nr-w764-z420-1',//how to get this
        //     "alwaysUseDefaultProject": true, 
        //     "id": 114, 
        //     "name": "LC 62", 
        //     "description": "Agilent LC & LC/MS", 
        //     "isConfigured": true, 
        //     "isLocked": true,
        //     title: 'Current sample title',
        //     username: 'User running current sample',
        //     state: 'Running',
        //     currentRun: 3, 
        //     totalRuns:10, 
        //     elapsedRuntime: 10, 
        //     totalRuntime: 300,
        //     runQueue: ['Sample 1', 'Sample 2', 'Current sample title', 'Sample 3']
        // },
        // {
        //     "applicationId": 1, 
        //     "defaultProjectId": 2, 
        //     projectName: 'FLD-78',
        //     controller: 'nr-w764-z420-1',
        //     "alwaysUseDefaultProject": true, 
        //     "id": 115, 
        //     "name": "LC 63", 
        //     "description": "Agilent LC & LC/MS", 
        //     "isConfigured": true, 
        //     "isLocked": true,
        //     title: 'Current sample title 2',
        //     username: 'User running current sample',
        //     state: 'Error',
        //     currentRun: 5, 
        //     totalRuns: 20, 
        //     elapsedRuntime: 10, 
        //     totalRuntime: 300,
        //     runQueue: ['Sample 21', 'Current sample title 2', 'Sample 22', 'Sample 23']
        // },
        // {
        //     "applicationId": 2, 
        //     "defaultProjectId": 2, 
        //     projectName: '',
        //     controller: 'nr-w764-z420-2',
        //     "alwaysUseDefaultProject": true, 
        //     "id": 116, 
        //     "name": "LC 63", 
        //     "description": "Agilent LC & LC/MS", 
        //     "isConfigured": true, 
        //     "isLocked": true,
        //     title: '',
        //     username: '',
        //     state: 'NotConnected',
        //     currentRun: 0, 
        //     totalRuns: 0, 
        //     elapsedRuntime: 0, 
        //     totalRuntime: 0,
        //     runQueue: []
        // }
        // ]
        // let instruments = sessionStorage.getItem('instruments')
        
        // if (instruments === null) {
        //     let token = sessionStorage.getItem('token') 
        //     if (token !== null)
        //     axios.get('http://O-cob01-2k12-2.scs.agilent.com:6625/olss/v1/instruments', {headers:{'Authorization':'Bearer '+token}} )
        //         .then(function (response) {
        //             // handle success
        //             console.log(response);
        //             //let instruments = response.data
        //             //probably need to transform data
        //             //sessionStorage.setItem('instruments', JSON.stringigy(instruments))
        //             //this.setState({...instruments});
        //         })
        //         .catch(function (error) {
        //             // handle error
        //             console.log(error);                    
        //         })
        //         .then((() => {
        //             // always executed
        //             //dev only
        //             let devices = [
        //                 {deviceId:1, data: [{value:3, name:'Pending'}, {value:0, name:'Queued'}, {value:0, name:'Done'}, {value:1, name:'Error'}]},
        //                 {deviceId:2, data: [{value:2, name:'Pending'}, {value:1, name:'Queued'}, {value:1, name:'Done'}, {value:0, name:'Error'}]}
        //             ]//response.data
        //             //probably need to transform data
        //             let dInstruments = {};
        //             for (let i=0; i < devices.length; i++) {
        //                 let device = devices[i];
        //                 let deviceId = device.deviceId;
        //                 dInstruments[deviceId] = device.data;
        //             }
        //             sessionStorage.setItem('instruments', JSON.stringify({...dInstruments}))
        //             this.setState({...dInstruments});
        //         })(this));
        
        // } else {
        //     let dInstruments = JSON.parse(instruments);
        //     this.setState(dInstruments);
        // }
        
        // let source = new EventSource("http://localhost:3001/api/sse", eventSourceInitDict);
        // source.onopen = () => { console.log(Date.now() + ':opening connection') }; 
        // source.onerror = () => { console.log(Date.now() + ':an error occurred') };
        // source.addEventListener('message', event => {
            
        //     let devices = JSON.parse(event.data)
        //     if (devices.length === 0) return;
        //     let instruments = {};
        //     for (let i=0; i < devices.length; i++) {
        //         let device = devices[i];
        //         let deviceId = device.deviceId;
        //         instruments[deviceId] = device.data;
        //     }
        //     this.setState({...instruments});

        //     if (this.state.groupBy) {
        //         let filtered = []
        //         Object.keys(this.state).filter(key => statesToFilter.indexOf(key) === -1).forEach(key => {
        //             let o = {};
        //             o[key] = this.state[key]
        //             filtered.push(o)
        //         })
                
        //         let groupedInstruments = filtered.reduce((acc, instru) => {
        //             let status = this.getStatus(Object.values(instru)[0]);
        //             if (!acc[status]) {
        //                 acc[status] = [];
        //             }
        //             acc[status].push(instru);
        //             return acc;
        //         }, {});
        //         this.setState({groupedInstruments:groupedInstruments})
        //     }     
            
        // });

        //compute Pending, Queued values
        // let instruments = {}
        // data.forEach(instr => {
        //     let instrumentId = instr.id
        //     let pending = instr.totalRuns - instr.currentRun
        //     let done =  instr.currentRun - 1 
        //     let queued = instr.runQueue.length - instr.runQueue.indexOf(instr.title) 
        //     let error = instr.state === 'Error' ? 1: 0
        //     const values = this.computeInstrumentState(instru)
        //     let errors = this.state.errors
        //     if (error === 1) {
        //         if (errors.hasOwnProperty(instrumentId)) {
        //             errors[instrumentId]++;
        //             error = errors[instrumentId]
        //         } else {
        //             errors[instrumentId]=1;
        //         }
        //         this.setState({errors})
        //     }
        //     instruments[instrumentId]={
        //         data:[{value:pending, name:'Pending'},{value:queued, name:'Queued'}, {value:done, name:'Done'}, {value:error, name:'Error'}],
        //         ...instr
        //     }
        // }) 
        // this.setState({...instruments})
        let start = this.state.start
        let end = start + UPDATE_SIZE
        this.setState({data:this.state.instruments.slice(start, end), start: end})
    }

    componentDidUpdate() {        
        if (this.props.data !== this.state.instruments) {
            this.setState({instruments:this.props.data, data: this.props.data.slice(0, UPDATE_SIZE), start: UPDATE_SIZE, hasMore:true})
        }
    }

    //componentWillUnmount() {
    //    clearInterval(this.timer)
    //}

    // computeInstrumentState(instruData) {       
    //     let instruments = {}
    //     instruData.forEach(instr => {
    //         let instrumentId = instr.id
    //         let pending = instr.totalRuns - instr.currentRun
    //         let done =  instr.currentRun > 0 ? instr.currentRun - 1 : 0
    //         let queued = instr.runQueue.length === 0 ? 0: instr.runQueue.length - instr.runQueue.indexOf(instr.title) - 1
    //         let error = instr.state === 'Error' ? 1: 0
    //         let errors = this.state.errors
    //         if (error === 1) {
    //             if (errors.hasOwnProperty(instrumentId)) {
    //                 errors[instrumentId]++;
    //                 error = errors[instrumentId]
    //             } else {
    //                 errors[instrumentId]=1;
    //             }
    //             this.setState({errors})
    //         }
    //         instruments[instrumentId]={
    //             data:[{value:pending, name:'Pending'},{value:queued, name:'Queued'}, {value:done, name:'Done'}, {value:error, name:'Error'}],
    //             ...instr
    //         }
    //     }) 
    //     this.setState({...instruments})
    // }

    handleClose = (id) => {    
        if (this.props.handleClose !== undefined) {
            this.props.handleClose(id)
        }
    }

    fetchMoreData() {
        if (this.state.start >= this.state.instruments.length) {
          this.setState({ hasMore: false });
          return;
        }
        let start = this.state.start
        let end = start + UPDATE_SIZE
        let data = this.state.data
        data.push(...this.state.instruments.slice(start, end))
        this.setState({ start: end})
    }

    handleHeadingClick(myKey) {
        const on = this.state[myKey]===undefined || !this.state[myKey]
        this.setState({[myKey]: on})       
    }

    render() {
        const { classes, groupedInstruments, groupBy, handleClick, breadCrumb} = this.props;
        const { data, hasMore } = this.state;
        if (groupedInstruments !== undefined && groupedInstruments !== null) {            
            return (
                <Fragment> 
                {breadCrumb}
                { groupedInstruments.map((group, index) => {
                let myKey = '';
                return (                   
                    <div key={index}>                      
                        {Object.keys(groupBy).forEach((key,index) => {
                            myKey += key === '' ? '': group[0][key]
                            if (index < Object.keys(groupBy).length - 1 )  myKey += ' > '         
                        })}
                        <h6 style={{fontWeight:700}}>
                            {myKey}
                            <span onClick={e => this.handleHeadingClick(myKey)}>{this.state[myKey] === undefined || !this.state[myKey] ? <ExpandLess /> : <ExpandMore />}</span>
                        </h6>                        
                        <Collapse in={!this.state[myKey]} timeout="auto" unmountOnExit>
                            <Grid container className={classes.root} spacing={16}>                
                                <Grid container justify="center" spacing={16}>
                                    {group.map((instrument, index) => {
                                        return <Grid key={index} item>
                                        <Instrument deviceId={instrument.id} data={[]} instrument={instrument}
                                        handleClose={this.handleClose} handleClick={handleClick}
                                        />
                                        </Grid>
                                    })}                        
                                </Grid>
                            </Grid>
                        </Collapse>
                    </div>
                )
            })}</Fragment>)            
        } else {
            return (
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.fetchMoreData}
                    hasMore={hasMore}
                    >
                        <Grid container className={classes.root} spacing={16}>                
                            <Grid container justify="center" spacing={16}>
                                {data.map((instrument, index) => {
                                    return <Grid key={index} item>
                                    <Instrument deviceId={instrument.id} data={[]} instrument={instrument}
                                    handleClose={this.handleClose} handleClick={handleClick}
                                    />
                                    </Grid>
                                })}                        
                            </Grid>
                        </Grid> 
                </InfiniteScroll>      
                )

        } 
    }
}

InstrumentDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(InstrumentDashboard);