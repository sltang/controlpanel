import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import EditAuditTrailSettingsAll from './audittrailsettings/editaudittrailsettings-all';
import EditAuditTrailSettingsMethod from './audittrailsettings/editaudittrailsettings-method';
import EditAuditTrailSettingsSequence from './audittrailsettings/editaudittrailsettings-sequence';
import EditAuditTrailSettingsResults from './audittrailsettings/editaudittrailsettings-results';
import AgTabs from '../../components/tabs'

const styles = theme => ({
  root: {
    marginLeft: theme.spacing.unit*5,
    flexGrow: 1,
  }
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

class EditAuditTrailSettings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      reasons: {all:[], method:[], sequence:[], results:[]},
      reasonText: {all:'', method:'', sequence:'', results:''},
      selected: {all:null, method:null, sequence:null, results:null},
      allowOwnReason: {all: false, method: false, sequence:false, results: false},
      autoEnableAuditTrail: {all: false, method: false, sequence:false, results: false},
      prompt: {all:'', method:'noPrompt', sequence:'noPrompt', results:'noPrompt'},
      showModal: {all: false, method: false, sequence:false, results: false},
      dialog: {
        title: 'Confirmation',
        content: 'Once the audit trail has been activated, it cannot be turned off.  Are you sure you want to continue?'
      }
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleDelete = (event, type) => {
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
    let reason = reasons[type][selectedIndex + 1];
    reasons[type][selectedIndex + 1] = reasons[type][selectedIndex];
    reasons[type][selectedIndex] = reason;
    selected[type] = selectedIndex + 1;
    this.setState({reasons:reasons, selected: selected});
  }

  handleSelect = (event, type, id) => {
    let selected = this.state.selected;
    selected[type] = id;
    this.setState({selected: selected});
  }

  handeAllowOwnReason = (event, type) => {
    let allowOwnReason = this.state.allowOwnReason;
    allowOwnReason[type] = event.target.checked;
    this.setState({allowOwnReason:allowOwnReason});
  }

  handleAutoEnableAuditTrail = (event, type) => {
    let autoEnableAuditTrail = this.state.autoEnableAuditTrail;
    autoEnableAuditTrail[type] = event.target.checked ? event.target.checked : !autoEnableAuditTrail[type];
    this.setState({autoEnableAuditTrail:autoEnableAuditTrail});
  }

  handlePromptChange = (event, type, value) => {
    let prompt = this.state.prompt;
    prompt[type] = value ? value: event.target.value;
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

  handleModal = (event, type) => {
    let showModal = this.state.showModal
    showModal[type] = !showModal[type]
    this.setState({showModal});
  }

  render() {
    const { classes, project } = this.props;
    const { value, reasonText, reasons, allowOwnReason, autoEnableAuditTrail, prompt, selected, showModal, dialog} = this.state;
    
      return (        
        <div className={classes.root}>
         <div position="static">
          <AgTabs
              value={value}
              onChange={this.handleChange}
            >
              <Tab label="All" disableRipple style={{textTransform:'none', outline:'none', backgroundColor:'#e1e3e5'}}/>
              <Tab label="Method" disableRipple style={{textTransform:'none', outline:'none', backgroundColor:'#e1e3e5'}}/>
              <Tab label="Sequence" disableRipple style={{textTransform:'none', outline:'none', backgroundColor:'#e1e3e5'}}/>
              <Tab label="Results" disableRipple style={{textTransform:'none', outline:'none', backgroundColor:'#e1e3e5'}}/>
          </AgTabs>
          {value === 0 && <TabContainer>
            <EditAuditTrailSettingsAll project={project} reasons={reasons.all} type="all"
              onDelete={this.handleDelete}
              onMoveUp={this.handleMoveUp}
              onMoveDown={this.handleMoveDown}
              onSelect={this.handleSelect}
              onAddReason={this.handleAddReason}
              onAllowOwnReason={this.handeAllowOwnReason}
              allowOwnReason={allowOwnReason}
              reasonText={reasonText}
              onReasonTextChange={this.handleReasonTextChange}
              selectedIndex={selected.all}
            /></TabContainer>}
          {value === 1 && <TabContainer><EditAuditTrailSettingsMethod project={project} reasons={reasons.method} type="method"
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
              prompt={prompt.method}
              selectedIndex={selected.method}
              showModal={showModal.method}
              handleModal={this.handleModal}
              dialog={dialog}
            /></TabContainer>}
          {value === 2 && <TabContainer><EditAuditTrailSettingsSequence project={project} reasons={reasons.sequence} type="sequence"
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
              prompt={prompt.sequence}   
              selectedIndex={selected.sequence} 
              showModal={showModal.sequence}
              handleModal={this.handleModal}
              dialog={dialog}      
          /></TabContainer>}
          {value === 3 && <TabContainer><EditAuditTrailSettingsResults project={project} reasons={reasons.results} type="results"
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
              prompt={prompt.results}  
              selectedIndex={selected.results}
              showModal={showModal.results}
              handleModal={this.handleModal}
              dialog={dialog}            
          /></TabContainer>}
          </div>
        </div>
      );
    
  }

}

EditAuditTrailSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditAuditTrailSettings);
