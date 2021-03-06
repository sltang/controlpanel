import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({ 
  root: {
    flexGrow: 1,
    overflow: 'auto',
    maxHeight: 120,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  buttons: {
    display: 'flex',
    marginBottom: theme.spacing.unit,
    display: '-webkit-flex',
    '-webkit-flex-direction': 'column',    
  },
  button: {
    marginBottom: theme.spacing.unit * 2,
  }
});

class SortableList extends Component {

  constructor(props) {
    super(props);
    this.state = {selectedIndex:-1}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e, index) {
    const {type} = this.props
    this.setState({selectedIndex: index})
    this.props.onSelect(e, type, index)
  }

  render() {
    const { classes, reasons, type, onDelete, onMoveUp, onMoveDown } = this.props;
    const {selectedIndex} = this.state
      return (  
        <Grid container spacing={8}>
            <Grid item xs={12} sm={12}>List of reasons:</Grid>
            <Grid item xs={12} sm={11}>
                <List className={classes.root}>
                    {reasons.map( ( reason, index ) => {
                        return <ListItem button key={index} onClick={e => this.handleClick(e, index)} style={index === selectedIndex ? {backgroundColor:'#eeeeee'}:{}}>
                            <ListItemText primary={reason.text} />
                    </ListItem>
                    })}              
                </List>
            </Grid>
            
            <Grid item xs={12} sm={1}>
                <div className={classes.buttons}>
                    <Button variant="outlined" size="small" className={classes.button} onClick={e => onDelete(e, type)}>
                    Delete
                    </Button>
                    <Button variant="outlined" size="small" className={classes.button} onClick={e => onMoveUp(e, type)}>
                    Move Up
                    </Button>
                    <Button variant="outlined" size="small" className={classes.button} onClick={e => onMoveDown(e, type)}>
                    Move Down
                    </Button>
                </div>
            </Grid> 
        </Grid>    
        
      );    
  }

}

SortableList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SortableList);
