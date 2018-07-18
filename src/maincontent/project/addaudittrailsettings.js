import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddAuditTrailingSettingsAll from './audittrailsettings/addaudittrailsettings-all';
import AddAuditTrailingSettingsMethod from './audittrailsettings/addaudittrailsettings-method';
import AddAuditTrailingSettingsSequence from './audittrailsettings/addaudittrailsettings-sequence';
import AddAuditTrailingSettingsResults from './audittrailsettings/addaudittrailsettings-results';

const reasons = [
  {id:5, text:'Reason 5'},
  {id:1, text:'Reason 1'},
  {id:2, text:'Reason 2'},
  {id:4, text:'Reason 4'},
  {id:3, text:'Reason 3'},  
]

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

class AddAuditTrailingSettings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      reasons: {all:[], method:[], sequence:[], results:[]},//reasons,
      reasonText: {all:'', method:'', sequence:'', results:''},
      selected: {all:null, method:null, sequence:null, results:null},
      allowOwnReason: {all: false, method: false, sequence:false, results: false},
      autoEnableAuditTrail: {all: false, method: false, sequence:false, results: false},
      prompt: {all:'', method:'noPrompt', sequence:'noPrompt', results:'noPrompt'},
    };
  }

  componentDidMount() {

  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleDelete = (event, type) => {
      // let reasons = this.state.reasons;
      // reasons[type].splice(this.state.selected[type], 1);
      // this.setState({reasons:reasons});

      let reasons = this.state.reasons;
      if (reasons[type].length === 0) return;
      let selected = this.state.selected;
      if (selected[type] === null) return;
      reasons[type].splice(selected[type], 1);
      selected[type] = null;
      this.setState({reasons: reasons, selected: selected});
  }

  handleMoveUp = (event, type) => {
    let selected = this.state.selected;
    let selectedIndex = selected[type];
    if (selectedIndex === 0 || selectedIndex === null) return;
    console.log(selectedIndex);
    let reasons = this.state.reasons;
    let reason = reasons[type][selectedIndex - 1];
    reasons[type][selectedIndex - 1] = reasons[type][selectedIndex];
    reasons[type][selectedIndex] = reason;
    selected[type] = selectedIndex - 1;
    this.setState({reasons:reasons, selected: selected});
  }

  handleMoveDown = (event, type) => {
    let selected = this.state.selected;
    let reasons = this.state.reasons;
    let selectedIndex = selected[type];
    if (selectedIndex === reasons[type].length - 1 || selectedIndex === null) return;
    console.log(selectedIndex);
    
    let reason = reasons[type][selectedIndex + 1];
    reasons[type][selectedIndex + 1] = reasons[type][selectedIndex];
    reasons[type][selectedIndex] = reason;
    selected[type] = selectedIndex + 1;
    this.setState({reasons:reasons, selected: selected});
  }

  handleSelect = (event, type, id) => {
    //console.log(id)
    let selected = this.state.selected;
    selected[type] = id;
    this.setState({selected: selected});
  }

  // handleAddReason =(event, type, reasonText) => {
   
  //   let reasons = this.state.reasons;
  //   let index = reasons[type].length+1;
  //   let reason = {id:index, text:reasonText};
  //   reasons[type].push(reason);

  //   this.setState({reasons:reasons});
  // }

  handeAllowOwnReason = (event, type) => {
    console.log(event.target.checked)
    let allowOwnReason = this.state.allowOwnReason;
    allowOwnReason[type] = event.target.checked;
    this.setState({allowOwnReason:allowOwnReason});
  }

  handleAutoEnableAuditTrail = (event, type) => {
    let autoEnableAuditTrail = this.state.autoEnableAuditTrail;
    autoEnableAuditTrail[type] = event.target.checked;
    this.setState({autoEnableAuditTrail:autoEnableAuditTrail});
  }

  handlePromptChange = (event, type) => {
    let prompt = this.state.prompt;
    prompt[type] = event.target.value;
    this.setState({prompt:prompt});
  }

  handleReasonTextChange = (event, type) => {
    let reasonText = this.state.reasonText;
    reasonText[type] = event.target.value;
    this.setState({reasonText: reasonText});
  }

  handleAddReason = (event, type) => {
    let reasons = this.state.reasons;
    let index = reasons[type].length;
    let reasonText = this.state.reasonText;
    let reason = {id:index, text:reasonText[type]};
    reasons[type].push(reason);
    this.setState({reasons: reasons});
    reasonText[type]='';
    this.setState({reasonText: reasonText})
  }

  render() {
    const { classes, project } = this.props;
    const { value, reasonText, reasons, allowOwnReason, autoEnableAuditTrail, prompt } = this.state;
    
      return (        
        <div className={classes.root}>
         <div position="static">
          <Tabs
              value={value}
              onChange={this.handleChange}
            >
              <Tab label="All" />
              <Tab label="Method" />
              <Tab label="Sequence" />
              <Tab label="Results" />
          </Tabs>
          {value === 0 && <TabContainer>
            <AddAuditTrailingSettingsAll project={project} reasons={reasons.all} type="all"
              onDelete={this.handleDelete}
              onMoveUp={this.handleMoveUp}
              onMoveDown={this.handleMoveDown}
              onSelect={this.handleSelect}
              onAddReason={this.handleAddReason}
              onAllowOwnReason={this.handeAllowOwnReason}
              allowOwnReason={allowOwnReason}
              reasonText={reasonText}
              onReasonTextChange={this.handleReasonTextChange}
            /></TabContainer>}
          {value === 1 && <TabContainer><AddAuditTrailingSettingsMethod project={project} reasons={reasons.method} type="method"
              onDelete={this.handleDelete}
              onMoveUp={this.handleMoveUp}
              onMoveDown={this.handleMoveDown}
              onSelect={this.handleSelect}
              onAddReason={this.handleAddReason}
              onAllowOwnReason={this.handeAllowOwnReason}
              allowOwnReason={allowOwnReason}
              reasonText={reasonText}
              onReasonTextChange={this.handleReasonTextChange}
              onAutoEnableAuditTrail={this.handleAutoEnableAuditTrail}
              autoEnableAuditTrail={autoEnableAuditTrail}
              onPromptChange={this.handlePromptChange}
              prompt={prompt}
            /></TabContainer>}
          {value === 2 && <TabContainer><AddAuditTrailingSettingsSequence project={project} reasons={reasons.sequence} type="sequence"
              onDelete={this.handleDelete}
              onMoveUp={this.handleMoveUp}
              onMoveDown={this.handleMoveDown}
              onSelect={this.handleSelect}
              onAddReason={this.handleAddReason}
              onAllowOwnReason={this.handeAllowOwnReason}
              allowOwnReason={allowOwnReason}
              reasonText={reasonText}
              onReasonTextChange={this.handleReasonTextChange}
              onAutoEnableAuditTrail={this.handleAutoEnableAuditTrail}
              autoEnableAuditTrail={autoEnableAuditTrail}
              onPromptChange={this.handlePromptChange}
              prompt={prompt}          
          /></TabContainer>}
          {value === 3 && <TabContainer><AddAuditTrailingSettingsResults project={project} reasons={reasons.results} type="results"
              onDelete={this.handleDelete}
              onMoveUp={this.handleMoveUp}
              onMoveDown={this.handleMoveDown}
              onSelect={this.handleSelect}
              onAddReason={this.handleAddReason}
              onAllowOwnReason={this.handeAllowOwnReason}
              allowOwnReason={allowOwnReason}
              reasonText={reasonText}
              onReasonTextChange={this.handleReasonTextChange}
              onAutoEnableAuditTrail={this.handleAutoEnableAuditTrail}
              autoEnableAuditTrail={autoEnableAuditTrail}
              onPromptChange={this.handlePromptChange}
              prompt={prompt}          
          
          /></TabContainer>}
          </div>
        </div>
      );
    
  }

}

AddAuditTrailingSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddAuditTrailingSettings);
