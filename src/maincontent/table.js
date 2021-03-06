import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import * as utils from '../service/utils.js';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import MyTableToolbar from './tabletoolbar'
import MyTableHead from './tablehead'


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
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
      data: [...this.props.data],
      rowsPerPage: this.props.rowsPerPage === undefined ? 5 : this.props.rowsPerPage,
      noSelected: false,
      //searchOn: false,
      searchValue: ''
    };
    this.handleSearch$ = new Subject();
  }


  handleSearchOn = on => {
    //console.log(on) 
    //this.setState({searchOn: on});
    // if (!on) {
    //   this.setState({data:this.props.data})
    //   if (this.props.handleSearch) {
    //     this.props.handleSearch([], false)
    //   }
    // } else {
    //   if (this.props.handleSearch) {
    //     this.props.handleSearch(this.props.data, true)
    //   }
    // }
    if (this.props.handleSearchOn) {
      this.props.handleSearchOn(on)
    }
  }

  handleSearch = term => {//event => {
    //const term = event.target.value
    //console.log(term)
    if (term) {
      this.handleSearch$.next(term)
    }
    this.setState({ searchValue: term })
  }

  search = (term) => {
    const { data } = this.props
    const regex = new RegExp(term, 'gi')
    let filteredData = data.filter(e => {
      let items = Object.values(e)
      let match = false;
      items.forEach(e => {
        if (!match && typeof e === 'string' && e.match(regex)) {
          match = true;
        }
      })
      return match;
    })
    return filteredData
  }

  componentDidMount() {
    let noSelected = this.props.noSelected !== undefined;
    this.setState({ noSelected: noSelected })// data: this.props.data})    
    this.handleSearch$
      .pipe(
        debounceTime(500),
        //distinctUntilChanged(),
        map(term => this.search(term))
      )
      .subscribe(matches => {
        //console.log(matches)
        //this.setState({data:matches})
        if (this.props.handleSearch) {
          this.props.handleSearch(matches)//, true)
        }
      })
  }

  componentDidUpdate() {
    const { data, searchOn } = this.props
    if (this.state.data !== data && !searchOn) {
      this.setState({ data })
    }
  }

  componentWillUnmount() {
    this.handleSearch$.unsubscribe()
  }

  handleRequestSort = (event, property) => {
    const { data } = this.props;
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    order === 'desc'
      ? data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
      : data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.props.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    if (event.target.type === 'checkbox') {
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
      this.setState({ selected: [] });
    }
  }

  render() {
    const { classes, type, columnData, noSelected, searchOn } = this.props;
    const { order, orderBy, selected, rowsPerPage, page, searchValue } = this.state;
    let data = this.state.data
    if (searchOn) {      
        const regex = new RegExp(searchValue, 'gi')
        let filteredData = this.props.data.filter(e => {
          let items = Object.values(e)
          let match = false;
          items.forEach(e => {
            if (!match && typeof e === 'string' && e.match(regex)) {
              match = true;
            }
          })
          return match;
        })
        data = filteredData//this.filter(searchValue, data)//filteredData
    }
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <div className={classes.root}>
        {this.state.noSelected ? '' :
          <MyTableToolbar numSelected={selected.length} type={type} handleSearch={this.handleSearch} handleSearchOn={this.handleSearchOn}
            searchOn={searchOn} searchValue={searchValue} handleDelete={this.handleDelete} editColumns={this.props.editColumns} breadCrumb={this.props.breadCrumb} />}
        <div className={classes.tableWrapper}>
          <Table aria-labelledby="tableTitle">
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

                    {this.state.noSelected ? <TableCell padding="checkbox" /> :
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>}
                    {columnData.map((column, index) => {
                      return index === 0 ?
                        <TableCell key={index} component="th" scope="row" padding="none" style={column.backgroundColor ? { backgroundColor: column.backgroundColor(n[column['id']]) } : {}}>{n[column['id']]}</TableCell> :
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
      </div>
    );

  }
}

MyTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyTable);
