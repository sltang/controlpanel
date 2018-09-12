import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import InputAdornment from '@material-ui/core/InputAdornment';

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
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    flex: '0 0 auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    display: 'flex',
    flexDirection: 'row',
    display: '-webkit-flex',
  },
  margin: {
    marginTop: theme.spacing.unit,
  },
  itemStart: {
    display: 'flex',
    marginTop: '10px',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  itemEnd: {
    display: 'flex',
    marginTop: '10px',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  container: {
    margin: '10px'
  }
});

class MyTableToolbar extends Component {

  constructor(props) {
    super(props)
    this.state ={
      //searchValue: ''
    }
  }

  handleSearch = event => {
    //this.setState({searchValue:event.target.value})
    this.props.handleSearch(event.target.value)
  }

  handleSearchOn = on => {
    this.props.handleSearchOn(on)
    if (!on) {
      this.props.handleSearch('')
    }
  }

//let MyTableToolbar = props => {
  render() {
    const { numSelected, classes, /*handleSearch, handleSearchOn,*/ searchOn, type, handleDelete, searchValue } = this.props;
    if (numSelected === 0) {
      return (
        <div className={classNames('row', classes.container)}>
          <div className={classNames('col-12', 'col-sm-2', classes.itemStart)}>
            <Typography variant="title" id="tableTitle">{type.label}</Typography>
          </div>
          <div className={classNames('col-12', 'col-sm-6', classes.itemStart)}>
            {this.props.breadCrumb}
          </div>
          <div className={classNames('col-12', 'col-sm-2', classes.itemEnd)}>
            {searchOn ? (
              <div className={classes.search}>
                <TextField onChange={this.handleSearch} className={classes.margin}
                  value={searchValue}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <IconButton><ClearIcon onClick={e => this.handleSearchOn(false)} /></IconButton></div>) : (
                <Tooltip title="Filter list">
                  <IconButton aria-label="Filter list">
                    <FilterListIcon onClick={e => this.handleSearchOn(true)} />
                  </IconButton>
                </Tooltip>
              )}
          </div>
          <div className={classNames('col-12', 'col-sm-2', classes.itemEnd)}>
            {this.props.editColumns}
          </div>
        </div>)
    } else {
      return (
        <Toolbar className={classNames(classes.root, classes.highlight)}>
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
          <div className={classes.spacer} />
          <div className={classes.actions}>
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <DeleteIcon onClick={handleDelete} />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      )
    }
  }

  
};

MyTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

export default withStyles(toolbarStyles)(MyTableToolbar);


