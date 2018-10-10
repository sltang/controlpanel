import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import AgTableHead from './tablehead';
import classNames from 'classnames'

const styles = theme => ({
    columnHead:{
      fontSize: '0.85rem',
      color: '#000',
      backgroundColor:'#f5f5f5',
    },
    active: {
      fontWeight: 600
    },
    sortCaret: {
        fontSize: '12px',
        marginLeft: '10px'
    },   
})

class AgTable extends React.Component {  

    constructor(props) {
        super(props)
        this.state = {
            order : '',
            orderBy : 'asc'
        }
        this.handleSort = this.handleSort.bind(this)
        this.sortArrow = this.sortArrow.bind(this)
    }

    sortArrow(columnId) {
        const { classes } = this.props
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

    handleSort(orderBy) {       
        const { data } = this.props
        let order = 'desc';
        if (this.state.order === 'desc') {
            order = 'asc';
        }

        order === 'desc'
        ? data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));     
        this.setState({ order, orderBy, data});
    }

    render() {
        const { columnData, children } = this.props
        const { order, orderBy } = this.state
        return (
            <Table>                
                <AgTableHead columnData={columnData} handleSort={this.handleSort} sortArrow={this.sortArrow} order={order} orderBy={orderBy} />
                {children}
            </Table>            
        )
    }

    
}

AgTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AgTable)