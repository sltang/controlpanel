import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const styles = theme => ({ 
  root: {
    marginLeft: theme.spacing.unit*5,
    flexGrow: 1,
    flexDirection: 'column-reverse',
    display: '-webkit-flex',
    '-webkit-flex-direction': 'column-reverse',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px ${theme.spacing.unit*4}px`,
  },
});

function TabContainer(props) {
  return (
    <div style={{ padding: 8 * 3 }}>
      {props.children}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class AuditTrailingSettingsMethod extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'noPrompt',
      allowOwnReason:false,
      autoEnable:false,
    };
  }

  componentDidMount() {

  }

  handleChange = name => event => {
    this.setState({[name]:this.state[name] === undefined || !this.state[name]})
  };

  handlePromptChange = event => {
    this.setState({ value: event.target.value })
  };

  render() {
    const { classes } = this.props;
    
      return (        
        <div className={classes.root}>          
          <FormControl component="fieldset" >
          <TextField
            id="method"
            label=""
            className={classes.textFieldAlign}
            multiline
            rows="4"
            value="method"
            onChange={this.handleChange('method')}
            margin="normal"
            fullWidth
          />
          <FormControlLabel
              control={
                  <Checkbox
                  checked={this.state.allowOwnReason}
                  onChange={this.handleChange('allowOwnReason')}
                  value="allowOwnReason"
                  />
              }
              label="Allow users to type their own reason"
          />
          <FormControlLabel
              control={
                  <Checkbox
                  checked={this.state.autoEnable}
                  onChange={this.handleChange('autoEnable')}
                  value="autoEnable"
                  />
              }
              label="Automatically enable audit trail"
          /> 
            <RadioGroup
              aria-label=""
              name=""
              className={classes.group}
              value={this.state.value}
              onChange={this.handlePromptChange}
            >
              <FormControlLabel value="prompt" control={<Radio />} label="Prompt for reason when saving" />
              <FormControlLabel value="noPrompt" control={<Radio />} label="Do not prompt for reason" />
            </RadioGroup>
          </FormControl>
           
        </div>
      );
    
  }

}

AuditTrailingSettingsMethod.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuditTrailingSettingsMethod);
