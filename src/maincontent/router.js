import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import AddInstrument from './instrument/add';
import EditInstrument from './instrument/edit';
import ListInstrument from './instrument/list';
import ViewInstrument from './instrument/view';
import AddProject from './project/add';
import ListProject from './project/list';
import ViewProject from './project/view';
import EditProject from './project/edit';
import CopyProject from './project/copy'
import AddLocation from './location/add';
import EditLocation from './location/edit';
import ListLocation from './location/list'
import * as ColumnData from './columndata';

class MainContent extends Component {

  render() {
    const {type } = this.props;
    return (
      <Switch>

        <Route path='/instrument/add' component={AddInstrument} />

        <Route path='/instrument/edit/:id' component={EditInstrument} />

        <Route path='/instrument/view/:id' component={ViewInstrument} type={type} />

        <Route exact path='/instruments/:id' render={(props) => (
            <ListInstrument {...props} columnData={ColumnData.InstrumentColumnData} type={type} />
        )}/>
        <Route exact path='/instruments' render={(props) => (
            <ListInstrument {...props} columnData={ColumnData.InstrumentColumnData} type={type} />
        )}/>

        <Route path='/project/add' component={AddProject} />
        <Route path='/project/edit/:id' component={EditProject} />
        <Route path='/project/copy/:id' component={CopyProject} />

        <Route path='/project/view/:id' component={ViewProject} />

        <Route exact path='/projects' render={(props) => (
            <ListProject {...props} columnData={ColumnData.ProjectColumnData} type={type} />
        )}/>

        <Route path='/projects/:id' render={(props) => (
          <ListProject {...props} columnData={ColumnData.ProjectColumnData} type={type} />
        )}/>

        <Route exact path='/location/add' render={(props) => (<AddLocation {...props} /> )}/>

        <Route path='/location/edit/:id' component={EditLocation} />

         <Route path='/location/:id' render={(props) => (<EditLocation {...props} />
        )}/>

         <Route exact path='/locations' render={(props) => (
            <ListLocation {...props} columnData={ColumnData.LocationColumnData} type={type} />
        )}/>

      </Switch>
    )
  }
}
export default withRouter(MainContent);

