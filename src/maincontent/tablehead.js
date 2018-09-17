import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Tooltip from '@material-ui/core/Tooltip';
import classNames from 'classnames'


const styles = theme => ({

  columnHead: {
    fontSize: '0.85rem',
    color: '#000',
    backgroundColor:'#f5f5f5'
  },
  active: {
    fontWeight: 600
  },
  sortCaret: {
    fontSize: '12px',
    marginLeft: '10px'
  },
})

class MyTableHead extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      data: [],
      page: 0,
    };
    this.sortArrow = this.sortArrow.bind(this)
  }

  componentDidMount() {
    let noSelected = this.props.noSelected !== undefined;
    //if (prevProps.noSelected !== this.props.noSelected) {
      this.setState({noSelected: noSelected})
      //console.log(this.state.noSelected);
    //}
  }

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  }

  sortArrow(property) {
    const {classes} = this.props
    if (this.props.orderBy === property) {
        if (this.props.order === 'asc') {
          return <span className={classNames('ol-icon-font', classes.sortCaret, 'icon-list-sort')}></span>
        } else {
          return <span className={classNames("ol-icon-font", classes.sortCaret, "icon-list-sort-asc")}></span>
        }
    } else {
      return <span></span>
    }    
  }

  render() {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, columnData } = this.props;

    return (
      <TableHead>
        <TableRow className={classes.head}>
          {this.state.noSelected ? <TableCell padding="checkbox" />:
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>}
          {columnData.map(column => {
            return (
              <TableCell className={classes.columnHead}
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                    IconComponent={() => this.sortArrow(column.id)}
                    classes={{active:classes.active}}
                  >
                    {column.label}
                  </TableSortLabel>

              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

MyTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default withStyles(styles)(MyTableHead);

