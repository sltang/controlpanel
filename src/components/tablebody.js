import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const styles = theme => ({
    columnHead:{
      fontSize: '0.85rem',
      color: '#000',
      backgroundColor:'#f5f5f5'
    },
    active: {
      fontWeight: 600
    }     
})

class AgTableBody extends React.Component {  

    render() {

      const { columnData, handleSort, order, orderBy, sortArrow, children } = this.props
        return (
          <TableHead>
            <TableRow>
                {children} {/*custom column(s)*/}
                {columnData.map((column, index) => {
                    return <TableCell key={index} className={classes.columnHead} sortDirection={ order ? order:false }>
                    <TableSortLabel
                        active={orderBy === column.id}
                        direction={order ? order : 'asc'}
                        onClick={e => handleSort(column.id)}
                        IconComponent={e => sortArrow(column.id)}
                        classes={{active:classes.active}}
                    >
                    {column.label}
                    </TableSortLabel>
                </TableCell >
                })}         
            </TableRow>
        </TableHead>
        )
    }

    
}

AgTableBody.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AgTableBody)