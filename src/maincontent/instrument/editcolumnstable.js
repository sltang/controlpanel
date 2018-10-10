import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import classNames from 'classnames'
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators';
import AgCheckbox from '../../components/checkbox'

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
    }
  });



class EditColumnsTable extends Component {

    constructor(props) {
      super(props);
      this.state = {
        hoverIndex:-1
      };
      this.sortArrow = this.sortArrow.bind(this)
      this.handleClick = this.handleClick.bind(this)
      this.handleMouseEnter = this.handleMouseEnter.bind(this)
      this.handleMouseLeave = this.handleMouseLeave.bind(this)
      this.handleMouseEvent$ = new Subject();
    }

    componentDidMount() {
        this.handleMouseEvent$
        .pipe(
            debounceTime(100),
        )
        .subscribe(event => {
            this.setState({hoverIndex:event.direction === 'in' ? event.hoverIndex:-1})
        })
    }

    componentWillUnmount() {
        this.handleMouseEvent$.unsubscribe()
    }

    handleClick(e, index) {
        this.props.handleChange(e, index)
    }

    sortArrow() {
        const {classes, order} = this.props
        if (order === 'asc') {
            return <span className={classNames('ol-icon-font', classes.sortCaret, 'icon-list-sort')}></span>
        } else if (order === 'desc') {
            return <span className={classNames("ol-icon-font", classes.sortCaret, "icon-list-sort-asc")}></span>
        } else {
            return <span></span>
        }    
      }

      handleMouseEnter(e, index) {
        this.handleMouseEvent$.next({hoverIndex:index, direction:'in'})
      }

      handleMouseLeave(e, index) { 
        this.handleMouseEvent$.next({hoverIndex:index, direction:'out'})
      }

    render() {
        const { classes, handleSelect, columnData, selected, handleSort, order } = this.props;
        const { hoverIndex } = this.state

        return (
            <Table>
                <TableHead>
                    <TableRow>                
                        <TableCell className={classes.columnHead} sortDirection={ order ? order:false }>
                            <TableSortLabel
                                active={order !== ''}
                                direction={order ? order : 'asc'}
                                onClick={handleSort}
                                IconComponent={this.sortArrow}
                                classes={{active:classes.active}}
                            >
                            Name
                            </TableSortLabel>
                        </TableCell >
                        <TableCell className={classes.columnHead}><div className={classes.tableCell}>Visibility</div></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {columnData.map((n, index) => {
                    return (
                    <TableRow hover classes={{hover:classes.hover}} key={index} onClick={e => handleSelect(e, index)} selected={selected === index}>
                        <TableCell>
                            {n.label}
                        </TableCell>
                        <TableCell className={classes.tableCell}>           
                            <AgCheckbox
                            checked={n.checked}
                            onChange={e => this.handleClick(e, index)}
                            handleMouseEnter={e => this.handleMouseEnter(e, index)} 
                            handleMouseLeave={e => this.handleMouseLeave(e, index)}                                
                            indeterminate={index === hoverIndex}
                           />
                        </TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
        )
    }
}

EditColumnsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(EditColumnsTable);