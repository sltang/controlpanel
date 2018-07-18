import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import SortableList from './sortablelist';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

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
  },
    group: {
    margin: `${theme.spacing.unit}px ${theme.spacing.unit*4}px`,
  },

});

class AddAuditTrailingSettingsResults extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  //handleChange = name => event => {
  //  this.setState({[name]:this.state[name] === undefined || !this.state[name]})
  //}

  // handleAddReason = event => {   
  //   let reasons = this.state.reasons;
  //   let index = reasons.length+1;
  //   let reason = {id:index, text:this.state.reasonText};
  //   reasons.push(reason);
  //   this.setState({reasons:reasons});
  // }

  // handleReasonChange = event => {
  //   this.setState({reasonText:event.target.value});
  // }

  //handlePromptChange = event => {
  //  this.setState({ value: event.target.value })
  //};

  render() {
    const { classes, type, reasonText, onReasonTextChange, reasons, allowOwnReason, onDelete, onMoveUp,  onMoveDown, onSelect, onAddReason, 
      onAllowOwnReason, autoEnableAuditTrail, onAutoEnableAuditTrail, prompt, onPromptChange } = this.props;
    
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
              onSelect={onSelect} />

          <FormControl component="fieldset" >
            <FormControlLabel
                control={
                    <Checkbox
                    checked={allowOwnReason[type]}
                    onChange={e => onAllowOwnReason(e, type)}
                    />
                }
                label="Allow users to type their own reason"
            />
            <FormControlLabel
                control={
                    <Checkbox
                    checked={autoEnableAuditTrail[type]}
                    onChange={e => onAutoEnableAuditTrail(e, type)}
                    />
                }
                label="Automatically enable audit trail"
            /> 
              <RadioGroup
                aria-label=""
                name=""
                className={classes.group}
                value={prompt[type]}
                onChange={e => onPromptChange(e, type)}
              >
                <FormControlLabel value="prompt" control={<Radio />} label="Prompt for reason when saving" />
                <FormControlLabel value="noPrompt" control={<Radio />} label="Do not prompt for reason" />
              </RadioGroup>
            </FormControl>
               
        </div>
      );
    
  }

}

AddAuditTrailingSettingsResults.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddAuditTrailingSettingsResults);
