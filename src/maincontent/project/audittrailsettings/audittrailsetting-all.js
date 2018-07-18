import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
    flexDirection: 'column-reverse',
    marginBottom: theme.spacing.unit * 2,
    display: '-webkit-flex',
    '-webkit-flex-direction': 'column-reverse',
  },

});

class AuditTrailingSettingsAll extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

  }

  handleChange = name => event => {
    this.setState({[name]:this.state[name] === undefined || !this.state[name]})
  };

  render() {
    const { classes } = this.props;
    
      return (        
        <div className={classes.root}>
          <TextField
            id="all"
            label=""
            className={classes.textFieldAlign}
            multiline
            rows="4"
            value={'all'}
            onChange={this.handleChange('all')}
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
        </div>
      );
    
  }

}

AuditTrailingSettingsAll.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuditTrailingSettingsAll);
