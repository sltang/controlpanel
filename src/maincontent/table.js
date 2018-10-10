import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Subject } from 'rxjs/Subject';
import { debounceTime, map } from 'rxjs/operators';
import MyTableToolbar from './tabletoolbar'
import MyTableHead from './tablehead'
import AgCheckbox from '../components/checkbox'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,   
  },
  selected: {
    '&$selected': {
      backgroundColor:'#f5f5f5',
    }
  },
  tableWrapper: {
    overflowX: 'auto',
    marginTop: '10px'
  },
  hover:{
    '&$hover:hover': {
      backgroundColor:'#f5f5f5'
    }
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
      searchValue: '',
      hoverIndex: -1
    };
    this.handleSearch$ = new Subject();
    this.handleMouseEvent$ = new Subject();
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }


  handleSearchOn = on => {
    if (this.props.handleSearchOn) {
      this.props.handleSearchOn(on)
    } else {
      this.setState({searchOn:on})
    }
  }

  handleSearch = term => {
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
    this.setState({ noSelected: noSelected })   
    this.handleSearch$
      .pipe(
        debounceTime(500),
        map(term => this.search(term))
      )
      .subscribe(matches => {
        //console.log(matches)
        if (this.props.handleSearch) {
          this.props.handleSearch(matches)
        } else {
          this.setState({data:matches})
        }
      })
      this.handleMouseEvent$
      .pipe(
          debounceTime(100),
      )
      .subscribe(event => {
          this.setState({hoverIndex:event.direction === 'in' ? event.hoverIndex:-1})
      })
  }

  componentDidUpdate() {
    const { data, searchOn } = this.props
    if (this.state.data !== data && !searchOn && !this.state.searchOn) {
      this.setState({ data })
    }
  }

  componentWillUnmount() {
    this.handleSearch$.unsubscribe()
    this.handleMouseEvent$.unsubscribe()
  }

  handleMouseEnter(e, index) {
    this.handleMouseEvent$.next({hoverIndex:index, direction:'in'})
  }

  handleMouseLeave(e, index) { 
    this.handleMouseEvent$.next({hoverIndex:index, direction:'out'})
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
    const { classes, type, columnData, noSelected } = this.props;
    const { order, orderBy, selected, rowsPerPage, page, searchValue, hoverIndex } = this.state;
    let data = this.state.data
    let searchOn = this.props.searchOn
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
        data = filteredData
    } else {
        searchOn = this.state.searchOn
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
                    classes={{hover:classes.hover,selected:classes.selected}}
                    onClick={event => this.handleClick(event, n.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    {this.state.noSelected ? <TableCell padding="checkbox" /> :
                      <TableCell padding="checkbox" >                        
                        <AgCheckbox
                          checked={isSelected}
                          handleMouseEnter={e => this.handleMouseEnter(e, n.id)} 
                          handleMouseLeave={e => this.handleMouseLeave(e, n.id)}                                
                          indeterminate={n.id === hoverIndex}
                        />
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
            style:{outline:'none'},
            disableRipple:true,
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
            style:{outline:'none'},
            disableRipple:true,
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

// const combinedStyles = theme => ({...agstyles(theme), ...styles(theme)})

export default withStyles(styles)(MyTable);
