import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import classNames from 'classnames'
import { ActivityLogColumnData } from './columndata'
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    active: {
        fontWeight: 600
    },
    columnHead: {
        fontSize: '0.85rem',
        color: '#000',
        backgroundColor:'#f5f5f5'
    },
    sortCaret: {
        fontSize: '12px',
        marginLeft: '10px'
    },
    hover:{
        '&$hover:hover': {
          backgroundColor:'#f5f5f5'
        }
    },
    tableCell: {
        display:'flex', 
        justifyContent:'center', 
        alignItems:'center', 
        height:'58px'
    },
    label:{
        fontWeight: 'bold'
    },
    sortCaret: {
        fontSize: '12px',
        marginLeft: '10px'
    },
    caretColumn: {
        width: '10%'
    }
  });

class ActivityTable extends Component {

    constructor(props) {
      super(props);
      this.state = {
        detailsOpen:[],
        activityLog:[],
        order:'',
        orderBy:'',
      };
      this.sortArrow = this.sortArrow.bind(this)
      this.handleClick = this.handleClick.bind(this)
      this.handleSort = this.handleSort.bind(this)
    }

    sortArrow(columnId) {
        const {classes} = this.props
        const { order, orderBy } = this.state
        if (columnId !==  orderBy) {
            return <span></span>
        }
        if (order === 'asc') {
            return <span className={classNames('ol-icon-font', classes.sortCaret, 'icon-list-sort')}></span>
        } else if (order === 'desc') {
            return <span className={classNames("ol-icon-font", classes.sortCaret, "icon-list-sort-asc")}></span>
        } else {
            return <span></span>
        }    
    }

    handleClick(index) {        
        const { detailsOpen } = this.state
        const detailsOpenIndex = detailsOpen.indexOf(index)
        if (detailsOpenIndex > -1) {
            detailsOpen.splice(detailsOpenIndex, 1)
        } else {
            detailsOpen.push(index)
        }
        this.setState({detailsOpen})
    }

    handleSort(orderBy) {       
        const { activityLog } = this.props
        let order = 'desc';
        if (this.state.order === 'desc') {
            order = 'asc';
        }
        order === 'desc'
        ? activityLog.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : activityLog.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));     
        this.setState({ order, orderBy, activityLog});
    }

    render() {
        const { classes, activityLog } = this.props;
        const {order, orderBy, detailsOpen } = this.state

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={classNames(classes.columnHead, classes.caretColumn)}></TableCell>   
                        {ActivityLogColumnData.map((column, index) => {
                            return <TableCell key={index} className={classes.columnHead} sortDirection={ order ? order:false }>
                            <TableSortLabel
                                active={orderBy === column.id}
                                direction={order ? order : 'asc'}
                                onClick={e => this.handleSort(column.id)}
                                IconComponent={e => this.sortArrow(column.id)}
                                classes={{active:classes.active}}
                            >
                            {column.label}
                            </TableSortLabel>
                        </TableCell >

                        })}          
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {activityLog.map((log, index) => {
                        return (
                            <Fragment key={index}>
                                <TableRow hover classes={{ hover: classes.hover }}>
                                    <TableCell className={classes.caretColumn}>
                                        <div onClick={e => this.handleClick(index)}>
                                            {detailsOpen.indexOf(index) === -1 ? <span className={classNames('ol-icon-font', 'icon-node-collapsed', classes.collapseExpandIcon)}></span> :
                                                <span className={classNames('ol-icon-font', 'icon-node-expanded', classes.collapseExpandIcon)}></span>}
                                        </div>
                                    </TableCell>
                                    {ActivityLogColumnData.map((column, index) => {
                                        return (<TableCell key={index}>
                                            {log[column['id']]}
                                        </TableCell>)
                                    })}
                                   
                                </TableRow>

                                    <TableRow hover style={{display:detailsOpen.indexOf(index) === -1 ? 'none':'table-row'}} classes={{ hover: classes.hover }}>
                                        <TableCell colSpan={1} className={classes.caretColumn}></TableCell>                                    
                                        <TableCell colSpan={3}>
                                        <Grid container spacing={8}>
                                            <Grid item xs={12} sm={12}>
                                                <Grid container spacing={8}>
                                                    <Grid item xs={6} sm={3}>
                                                        <div><span className={classes.label}>Users</span>: {log.user}</div>
                                                    </Grid>
                                                    <Grid item xs={6} sm={9}>
                                                        <div><span className={classes.label}>Controller</span>: {log.details.controller}</div>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <Grid container spacing={8}>
                                                    <Grid item xs={6} sm={3}>
                                                        <div><span className={classes.label}>Level</span>: {log.details.level}</div>
                                                    </Grid>
                                                    <Grid item xs={6} sm={9}>
                                                        <div><span className={classes.label}>Date/Time</span>: {log.dateTime}</div>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <Grid container spacing={8}>
                                                    <Grid item xs={6} sm={3}>
                                                        <div><span className={classes.label}>Subsystem</span>: {log.details.subsystem}</div>
                                                    </Grid>
                                                    <Grid item xs={6} sm={9}>
                                                        <div><span className={classes.label}>Details</span>: {log.details.details}</div>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        </TableCell>
                                    </TableRow>
                                
                            </Fragment>
                        )
                    })}
                </TableBody>
            </Table>

        )
    }
}

ActivityTable.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(ActivityTable);