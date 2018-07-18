import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import SortableList from './sortablelist';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({ 
  root: {
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
    marginBottom: theme.spacing.unit,
    display: '-webkit-flex',
    '-webkit-flex-direction': 'row',
    alignItems: 'flex-end',    
  },
  button: {
    /*marginLeft: theme.spacing.unit * 2,*/
  }

});

class AddAuditTrailingSettingsAll extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //allowOwnReason: false,
      //reasonText: '',
      //reasons: this.props.reasons
    };
  }

  componentDidMount() {

  }

  handleChange = name => event => {
    this.setState({[name]:this.state[name] === undefined || !this.state[name]})
  }

  //handleAddReason = event => {
   
    //let reasons = this.state.reasons;
    //let index = reasons.length+1;
    //let reason = {id:index, text:this.state.reasonText};
    //reasons.push(reason);
    //this.props.handleAddReason('all', this.state.reasonText)
    //this.setState({reasons:reasons});
    //this.props.reasons.push(reason);
    //console.log(this.props.reasons);
  //}

  //handleReasonChange = event => {
  //  this.setState({reasonText:event.target.value});
  //}

  render() {
    const { classes, type, reasons, allowOwnReason, onDelete, onMoveUp,  onMoveDown, onSelect, onAddReason, onAllowOwnReason,
      reasonText, onReasonTextChange
    } = this.props;
        
      return (        
        <div className={classes.root}>
          <Grid container spacing={16}>
            <Grid item xs={12} sm={10}>
              <TextField
                id="newReason"
                label="Reason to be added"
                className={classes.textFieldAlign}
                value={reasonText[type]}
                onChange={e => onReasonTextChange(e, type)}
                margin="dense"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button variant="outlined" size="small" className={classes.button} onClick={e => onAddReason(e, type)}>Add</Button>
            </Grid>
          </Grid>

          <SortableList reasons={reasons} onDelete={onDelete} type={type}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
              onSelect={onSelect} 
          />
          
          <FormControlLabel
              control={
                  <Checkbox
                  checked={allowOwnReason[type]}
                  onChange={e => onAllowOwnReason(e, type)}
                  />
              }
              label="Allow users to type their own reason"
          />      
        </div>
      );
    
  }

}

AddAuditTrailingSettingsAll.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddAuditTrailingSettingsAll);
