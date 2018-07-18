import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { CustomParametersColumnData } from '../columndata';
import Button from '@material-ui/core/Button';
import CustomParametersTable from './customparameterstable';

const data = [
  //{id:1, name:'para 1', type:'text', value:'para 1 value', mandatory:true},
  //{id:2, name:'para 2', type:'numeric', value:6.0,  mandatory:false},

];

const styles = theme => ({ 
  root: {
    marginLeft: theme.spacing.unit*5,
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  head: {
    display: 'flex',
    flexDirection: 'column-reverse',
    marginBottom: theme.spacing.unit * 2,
    display: '-webkit-flex',
    '-webkit-flex-direction': 'column-reverse',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing.unit * 3,
  },
  button: {
    marginBottom: theme.spacing.unit * 2,
  }

});

class CompoundCustomParameters extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: data,
      active:{id:-1, name:""},
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
      this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        this.setState({active: {id:-1, name:''}})
    }
  }

  handleAdd = () => {  
    let data = this.state.data;    
    let lastId = data.length===0? -1:data[data.length - 1].id;
    let id = lastId + 1;
    let param = {id:1, name:'', type:'text', value:'', mandatory:false};
    data.push(param);
    this.setState({ data: data });
  }

  handleDelete = () => {
    let active = this.state.active;
    let index = active.id;
    if (index !== -1) {
      let data = this.state.data;
      data.splice(index, 1);
      active.index = -1;
      active.name = '';
      this.setState({ data: data, active:active});
    }
  }

  handleChange = (event, id, name) => {
    if (this.props.readOnly) return;
    let data = this.state.data;
    if (name === 'mandatory') {
        data[id][name] = event.target.checked;
    } else {
        data[id][name] = event.target.value;
    }
    this.setState({data: data});
  }

  handleClick = (event, id, name) => {
      if (this.props.readOnly) return;
      this.setState({active: {id:id, name:name}})
      //console.log(id+':'+name)
  }

  render() {
    const { classes, readOnly } = this.props;
    const { active } = this.state;
      return (        
        <div className={classes.root} ref={this.setWrapperRef}>
          <Grid container spacing={16}>    
            <Grid item xs={12} sm={10}>
              <CustomParametersTable data={data} active={active} handleClick={this.handleClick} handleChange={this.handleChange}
              />
            </Grid> 
            <Grid item xs={12} sm={2}> 
              {readOnly ? <div></div> :
              <div className={classes.buttons}>  
                <Button variant="outlined" className={classes.button} onClick={this.handleAdd}>
                  Add
                </Button>
                <Button variant="outlined" className={classes.button} onClick={this.handleDelete}>
                  Delete
                </Button> 
              </div>
              }
            </Grid>
          </Grid>
        </div>
      )    
  }

}

CompoundCustomParameters.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CompoundCustomParameters);
