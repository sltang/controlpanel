import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import AgDialog from '../components/dialog'

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
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
    minHeight: '70px'
  },
  clear:{
    width:'50px',
    height:'36px',
    borderTop: '1px solid #ced4da',
    borderRight: '1px solid #ced4da',
    borderBottom: '1px solid #ced4da',
    fontSize:'18px', 
    color:'#384350', 
    cursor:'pointer',
    marginRight:'10px', 
    alignItems: 'center',
    justifyContent: 'center',
    display:'flex'
  },
  colorPrimary:{
    color:'#384350',
    marginRight : '10px',
    cursor:'pointer'
  }
});

class MyTableToolbar extends Component {

  constructor(props) {
    super(props)
    this.state ={
      showModal:false
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSearchOn = this.handleSearchOn.bind(this)
  }

  handleSearch(event) {
    this.handleSearchOn(true)
    this.props.handleSearch(event.target.value)
  }

  handleSearchOn(on) {
    this.props.handleSearchOn(on)
    if (!on) {
      this.props.handleSearch('')
    }
  }

  handleModal = (event) => {
    this.setState({showModal: !this.state.showModal});
  }

  render() {
    const { numSelected, classes, searchOn, type, handleDelete, searchValue } = this.props;
    const { showModal } = this.state
    if (numSelected === 0) {
      return (
        <div className={classNames('row', classes.container)}>
          <div className={classNames('col-12', 'col-sm-2', classes.itemStart)}>
            <Typography variant="title" id="tableTitle">{type.label}</Typography>
          </div>
          <div className={classNames('col-12', 'col-sm-6', classes.itemStart)}>
            {this.props.breadCrumb}
          </div>
          <div className={classNames('col-12', 'col-sm-4', classes.itemEnd)}>
              <input type="text" className="form-control" aria-describedby="search" placeholder="Search" value={searchValue} 
              onChange={this.handleSearch} size="55" style={{height: '36px', borderRightColor:'#fff'}}/>
              {searchOn ?              
              <span onClick={e => this.handleSearchOn(false)} className={classes.clear}>&#10006;</span>
              : <span className={classes.clear}><span className={classNames('ol-icon-font', 'icon-search')} /></span>}
              {this.props.editColumns }
          </div>
        </div>)
    } else {
      return (
        <div className={classNames('row', classes.container)}>
          <div className={classNames('col-12', 'col-sm-2', classes.itemStart)}>
            <Typography variant="title" id="tableTitle">{numSelected} selected</Typography>
          </div>
          <div className={classNames('col-12', 'col-sm-9')}></div>

          <div className={classNames('col-12', 'col-sm-1', classes.itemEnd)}>
            <DeleteOutlinedIcon onClick={this.handleModal} color="primary" classes={{colorPrimary:classes.colorPrimary}} />
          </div>
          <AgDialog showModal={showModal} handleCancel={this.handleModal} 
            dialog={{title:'Delete Instruments', content:'Are you sure you want to delete the selected instrument(s)?'}}
            handleOk={e => {handleDelete(); this.handleModal() }}/> 
        </div>
      )
    }
  }
  
};

MyTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

export default withStyles(toolbarStyles)(MyTableToolbar);


