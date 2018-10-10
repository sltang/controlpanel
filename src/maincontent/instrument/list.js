import React from 'react';
import * as instrumentService from '../../service/instrument.js';
import EditColumns from './editcolumns';
import MyTable from '../table';
import InstrumentDashboard from './dashboard/dashboard'
import { withRouter } from 'react-router';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import DashboardPieChart from './dashboard/piechartpane/piechartgroup.js'
import * as utils from '../../service/utils.js';
import ClearIcon from '@material-ui/icons/Clear'
import Collapse from '@material-ui/core/Collapse';
import classNames from 'classnames'
import {STATES} from './dashboard/piechartpane/piechart.js'


const styles = theme => ({
  head: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  headItem: {
    marginRight: '20px'
  },
  pie: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  breadCrumb: {
    display: 'flex', flexDirection: 'row',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    flexWrap: 'wrap'
  },
  breadCrumbItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '10px'
  },
  breadCrumbClear: {
    fontSize: '14px',
    marginLeft: '10px',
    marginRight: '10px'
  },
  listGridIcon: {
    color: '#384350',
    fontSize: '48px',
    fontWeight: 700
  },
  collapseExpandIcon: {
     fontSize: '18px',
   },
  label:{
    marginRight:'20px'
  }
});

class ListInstrument extends React.Component {

  randomLength = 30000
  timer = null

  constructor(props, context) {
    super(props, context);
    let instruments;
    const { match } = this.props;
    if (match.params.id !== undefined) {
      instruments = instrumentService.getAllByLocation(match.params.id);
    } else {
      instruments = instrumentService.getAll();
    }

    this.state = {
      order: 'asc',
      orderBy: '',
      selected: [],
      data: instruments,
      originalData: [...instruments],
      filteredColumnData: this.props.columnData,
      page: 0,
      rowsPerPage: 5,
      view: 'list',
      groupBy: {},
      pieChartOpen: true,
      searchOn: false,
      type:{label:'Instruments', name:'instrument'}
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleArcClick = this.handleArcClick.bind(this);
    this.handleClearGroupBy = this.handleClearGroupBy.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.simulateInstrumentUpdate = this.simulateInstrumentUpdate.bind(this)
    this.handPieChartClick = this.handPieChartClick.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSearchOn = this.handleSearchOn.bind(this)
    this.timer = setInterval(this.simulateInstrumentUpdate, parseInt(Math.random() * this.randomLength + 10000, 10))
  }

  simulateInstrumentUpdate() {
    const updatedInstruments = instrumentService.getUpdatedInstruments()
    const updatedInstrumentIds = updatedInstruments.map(inst => inst.id)
    let data = this.state.data
    data.filter(inst => updatedInstrumentIds.indexOf(inst.id) > -1).forEach(inst => {
      updatedInstrumentIds.forEach(uinst => {
        if (inst.id === uinst.id) {
          inst.status = uinst.status
        }
      })
    })

    const { groupBy } = this.state
    if (Object.keys(groupBy).length === 0) {
      this.setState({ data: data, groupedInstruments: null })
    } else {
      let o = utils.hierGroupBy2(data, groupBy)
      let instruments = utils.objToArray(o)
      this.setState({ data: instruments, groupedInstruments: utils.objToArray2(o) })
    }
    const groupByState = utils.groupBy(this.state.originalData, 'status')
    const states = utils.getGroupBy(groupByState)
    this.setState({ states: states })
  }

  componentDidMount() {
    let instruments;
    const { match } = this.props;
    if (match.params.id !== undefined) {
      instruments = instrumentService.getAllByLocation(match.params.id);
    } else {
      instruments = instrumentService.getAll();
    }
    const groupByLocation = utils.groupBy(instruments, 'location')
    const locations = utils.getGroupBy(groupByLocation)
    const groupByState = utils.groupBy(instruments, 'status')
    const states = utils.getGroupBy(groupByState)
    const groupByType = utils.groupBy(instruments, 'type')
    const types = utils.getGroupBy(groupByType)
    this.setState({ data: instruments, locations: locations, states: states, types: types });
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  handleClick(id) {
    const { history: { push } } = this.props;
    push('/instrument/view/' + id);
  }

  handleDelete = ids => {
    const { match } = this.props;
    instrumentService.remove(ids);
    let instruments;
    if (match.params.id !== undefined) {
      instruments = instrumentService.getAllByLocation(match.params.id);
    } else {
      instruments = instrumentService.getAll();
    }
    this.setState({ data: instruments });
  }

  handleColumnsChange = (data) => {
    const { columnData } = this.props;
    let filteredColumnData = columnData.filter(column => {
      let d = data.filter(d => d.id === column.id)[0]
      return d.checked
    })
    this.setState({ filteredColumnData });
  }

  handleView = (event, view) => {
    if (this.state.view !== view) {
      this.setState({ view })
    }
  }

  handleArcClick(type, name, e) {
    let groupBy = this.state.groupBy
    const {searchOn} = this.state
    if (e !== undefined) {
      if (e.target.value) groupBy[type] = e.target.value
      else delete groupBy[type]
    } else {
      groupBy[type] = name
    }
    if (Object.keys(groupBy).length === 0) {
      this.setState({ data: searchOn ? this.state.data:this.state.originalData, groupedInstruments: null })
    } else {
      let instruments = this.state.originalData
      let o = utils.hierGroupBy2(instruments, groupBy)
      instruments = utils.objToArray(o)
      this.setState({ data: instruments, groupedInstruments: utils.objToArray2(o) })     
    }
  }

  handleClearGroupBy(key) {    
    const { groupBy } = this.state
    delete groupBy[key]
    //if search is on, groupBy first and then apply search filter
    if (Object.keys(groupBy).length === 0) {
      this.setState({ data: this.state.originalData, groupedInstruments: null })
    } else {
      let instruments = this.state.originalData
      let o = utils.hierGroupBy2(instruments, groupBy)
      instruments = utils.objToArray(o)
      this.setState({ data: instruments, groupedInstruments: utils.objToArray2(o) })
    }
  }

  handleClose(id) {
    const { groupedInstruments, groupBy } = this.state
    let instruments = this.state.originalData.filter(inst => inst.id !== id)
    if (groupedInstruments !== undefined && groupedInstruments !== null) {   
      let o = utils.hierGroupBy2(instruments, groupBy)
      instruments = utils.objToArray(o)
      this.setState({ groupedInstruments: utils.objToArray2(o) })
    } else {
      this.setState({ data: instruments })
    }
  }

  handPieChartClick() {
    this.setState({ pieChartOpen: !this.state.pieChartOpen })
  }

  handleSearch(searchResults) {
    const { groupBy } = this.state     
    if (Object.keys(groupBy).length === 0) {
      this.setState({data: searchResults, searchResults, groupedInstruments: null})
    } else {     
      let sro = utils.hierGroupBy2(searchResults, groupBy)
      this.setState({ data: searchResults, searchResults, groupedInstruments: utils.objToArray2(sro) })
    }
  }

  handleSearchOn(searchOn) {
    const { groupBy } = this.state
    this.setState({searchOn})
    if (!searchOn) {
      if (Object.keys(groupBy).length === 0) {
        this.setState({ data: this.state.originalData, groupedInstruments: null })
      } else {
        let instruments = this.state.originalData
        let o = utils.hierGroupBy2(instruments, groupBy)
        instruments = utils.objToArray(o)
        this.setState({ data: instruments, groupedInstruments: utils.objToArray2(o) })
      }
    }
  }

  render() {
    const { classes, columnData } = this.props;
    const { type, data, filteredColumnData, view, groupBy, locations, states, types, groupedInstruments, originalData, searchOn } = this.state;
    if (locations === undefined) {
      return <div></div>
    } else
      return (
        <div>
          <div onClick={this.handPieChartClick}>
            {this.state.pieChartOpen ? <span className={classNames('ol-icon-font', 'icon-node-collapsed', classes.collapseExpandIcon)}></span> :  
            <span className={classNames('ol-icon-font', 'icon-node-expanded', classes.collapseExpandIcon)}></span> }
            
          </div>
          <Collapse in={this.state.pieChartOpen} timeout="auto" unmountOnExit>
            <div className={classes.pie}>
              <DashboardPieChart handleArcClick={this.handleArcClick} locations={locations} states={states} types={types} />
            </div>
          </Collapse>
          <Collapse in={!this.state.pieChartOpen} timeout="auto" unmountOnExit>
            <div className={classes.pie}>
              <div className={classNames('form-group', classes.breadCrumbItem)} >
                <label className={classNames('label', classes.label)} htmlFor="location">Location</label>
                
                <select 
                  className={classNames('form-control')}
                  value={groupBy['location']?groupBy['location']:''}
                  onChange={e => { this.handleArcClick('location', '', e) }}
                >
                  <option value="" />
                  {locations.map((loc, index) => {
                    return <option key={index} value={loc.name}>{loc.name}</option>
                  })}
                </select> 
              </div>
              <div className={classNames('form-group', classes.breadCrumbItem)}>
                
                <label className={classNames('label', classes.label)} htmlFor="type">Type</label>
                <select 
                  className={classNames('form-control')}
                  value={groupBy['type']?groupBy['type']:''}
                  onChange={e => { this.handleArcClick('type', '', e) }}
                >
                  <option value="" />
                  {types.map((type, index) => {
                    return <option key={index} value={type.name}>{type.name}</option>
                  })}
                </select> 
              </div>
              <div className={classNames('form-group', classes.breadCrumbItem)}>
                
                <label className={classNames('label', classes.label)} htmlFor="status">Status</label>
                <select 
                  className={classNames('form-control')}
                  value={groupBy['status']?groupBy['status']:''}
                  onChange={e => { this.handleArcClick('status', '', e) }}
                >
                  <option value="" />
                  {Object.keys(STATES).sort().map((state, index) => {
                    return <option key={index} value={state}>{state}</option>
                  })}
                </select> 
              </div>
            </div>
          </Collapse>

          <div className={classes.breadCrumb}>
          {Object.keys(groupBy).map((key,index) => {
            return <div className={classes.breadCrumbItem} key={index}>{key.replace(/^\w/, c => c.toUpperCase())} {groupBy[key] === '' ? '':': ' + groupBy[key]}
            <ClearIcon className={classes.breadCrumbClear} onClick={e => this.handleClearGroupBy(key)}/> {index === Object.keys(groupBy).length - 1 ? '': '>'} 
            </div>
          })}
          </div>
          <div className={classes.head}>
            <Tooltip title="List View">
              <div className={classes.headItem}>
              <ListOutlinedIcon className={classes.listGridIcon} onClick={e => this.handleView(e, 'list')} />
              </div>
            </Tooltip>
            <Tooltip title="Grid View">
              <div className={classes.headItem}><ViewModuleIcon className={classes.listGridIcon} onClick={e => this.handleView(e, 'grid')} /></div>
            </Tooltip>
          </div>
          {view === 'list' ?
            <MyTable data={data} originalData={originalData} columnData={filteredColumnData} type={type} onClick={this.handleClick} handleDelete={this.handleDelete} rowsPerPage={10}
              editColumns={<EditColumns columnData={columnData} handleColumnsChange={this.handleColumnsChange} />}
              handleSearch={this.handleSearch}
              handleSearchOn={this.handleSearchOn}
              searchOn={searchOn}
            />
            :
            <InstrumentDashboard data={data} groupedInstruments={groupedInstruments} handleClose={this.handleClose} groupBy={groupBy} handleClick={this.handleClick}
            />}
        </div>
      );
  }
}

ListInstrument.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(withRouter(ListInstrument));
