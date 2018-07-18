import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, map, switchMap}  from 'rxjs/operators';


class MyTableHead extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: '',
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 5,
    };
  }

  componentDidMount() {
    //console.log("previous:"+prevProps.noSelected);
    //console.log("this.props:"+this.props.noSelected);
    let noSelected = this.props.noSelected !== undefined;
    //if (prevProps.noSelected !== this.props.noSelected) {
      this.setState({noSelected: noSelected})
      //console.log(this.state.noSelected);
    //}
  }

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, columnData } = this.props;

    return (
      <TableHead>
        <TableRow>
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
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
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

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  search: {
    display: 'flex',
    flexDirection: 'row',
    display: '-webkit-flex',
  },
  margin: {
    marginTop: theme.spacing.unit,
  }
});

let MyTableToolbar = props => {
  const { numSelected, classes, handleSearch, handleSearchOn, searchOn, type , handleDelete} = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
            {type.label}
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon onClick={handleDelete}/>
            </IconButton>
          </Tooltip>
        ) : (
          searchOn ? (
          <div className={classes.search}>
          <TextField onChange={handleSearch} className={classes.margin}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          /> 
          <IconButton><ClearIcon onClick={handleSearchOn}/></IconButton></div>): (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon onClick={handleSearchOn}/>
            </IconButton>
          </Tooltip>
          )
        )}
      </div>
    </Toolbar>
  );
};

MyTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

MyTableToolbar = withStyles(toolbarStyles)(MyTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    /*minWidth: 1020,*/
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class MyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: '',
      selected: [],
      page: 0,
      data: [],
      rowsPerPage: 5,
      noSelected: false,
      searchOn: false
    };
    this.handleSearch$ = new Subject();   
  }


  handleSearchOn = event => {
    this.setState({searchOn: !this.state.searchOn});
    if (this.state.searchOn) {
      this.setState({data:this.props.data})
    }
  }

  handleSearch = event => {
    const term = event.target.value
    if (term) {
      this.handleSearch$.next(term)
    }    
  }

  search = (term) => {
    const {data} = this.props
    const regex = new RegExp(term, 'gi')
    let filteredData = data.filter(e => {
      let items = Object.values(e)      
      let match = false;
      items.forEach(e => {
          if (typeof e === 'string' && e.match(regex)) match = true;
      })
      return match;
    })
    return filteredData
  }

  componentDidMount() {
    let noSelected = this.props.noSelected !== undefined;
    this.setState({noSelected: noSelected, data:this.props.data})
    
    this.handleSearch$
    .pipe(
       debounceTime(500),
       distinctUntilChanged(),
       map((term) => this.search(term))
    )
    .subscribe(matches => {
      console.log(matches)
      this.setState({data:matches})
    })
    
  }

  handleRequestSort = (event, property) => {
    const { data } = this.props;
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data2 =
      order === 'desc'
        ? data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data:data2, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.props.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    if (event.target.type==='checkbox') {
      const { selected } = this.state;
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }

      this.setState({ selected: newSelected });
    } else {
      if (this.props.onClick !== undefined) {
        this.props.onClick(id);
      }
    }
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleDelete = () => {
    if (this.props.handleDelete !== undefined) {
      this.props.handleDelete(this.state.selected);
      this.setState({selected:[]});
    }
  }

  render() {
    const { classes, type, columnData, noSelected  } = this.props;
    const { order, orderBy, selected, rowsPerPage, page, data } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    
    return (
      <Paper className={classes.root}>
        {this.state.noSelected ? null:
        <MyTableToolbar numSelected={selected.length} type={type} handleSearch={this.handleSearch} handleSearchOn={this.handleSearchOn} 
        searchOn={this.state.searchOn} value={this.state.searchValue} handleDelete={this.handleDelete} />}
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <MyTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              columnData={columnData}
              noSelected={noSelected}
            />
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                const isSelected = this.isSelected(n.id);
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    
                    {this.state.noSelected ? <TableCell padding="checkbox" />:
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} />
                    </TableCell>}
                    { columnData.map((column, index) => {
                      return index === 0 ?
                        <TableCell key={index} component="th" scope="row" padding="none">{n[column['id']]}</TableCell>:
                        <TableCell key={index}>{n[column['id']]}</TableCell>
                      })
                    }
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  
  }
}

MyTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyTable);
