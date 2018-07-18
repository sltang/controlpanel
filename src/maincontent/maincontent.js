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
import AddLocation from './location/add';
import EditLocation from './location/edit';
import MyPivotTable from '../pivottable/pivottable';
import * as ColumnData from './columndata';
// const MainContent = () => (
//     <BrowserRouter>
//       <Route path='/instrument/:id' component={EditInstrument} />
//     </BrowserRouter>
// )



// const styles = theme => ({
//   toolbar: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     padding: '0 8px',
//     ...theme.mixins.toolbar,
//   },
//   content: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.default,
//     padding: theme.spacing.unit * 3,
//   },
// });
//
// const routes = [
//   {
//     path: "/instrument",
//     component: ListInstrument,
//     exact: true,
//     routes: [
//       {
//         path: "/instrument:id",
//         component: EditInstrument,
//         exact: false,
//       }
//     ]
//   }
// ];
//
// const RouteWithSubRoutes = route => (
//   <Route
//     exact={route.exact}
//     path={route.path}
//     render={props => (
//       // pass the sub-routes down to keep nesting
//       <route.component {...props} routes={route.routes} />
//     )}
//   />
// );

// const instrumentColumnData = [
//   { id: 'status', numeric: false, disablePadding: true, label: 'Status' },
//   { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
//   { id: 'project', numeric: false, disablePadding: false, label: 'Project' },
//   { id: 'location', numeric: false, disablePadding: false, label: 'Location' },
//   { id: 'application', numeric: false, disablePadding: false, label: 'Application' },
//   { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
//   { id: 'controller', numeric: false, disablePadding: false, label: 'Controller' }
// ];

// const projectColumnData = [
//   { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
//   { id: 'group', numeric: false, disablePadding: false, label: 'Group' },
//   { id: 'desc', numeric: false, disablePadding: false, label: 'Description' },
//   { id: 'createDate', numeric: false, disablePadding: false, label: 'Creation Date' },
//   { id: 'createdBy', numeric: false, disablePadding: false, label: 'Created By' }
// ];

class MainContent extends Component {

  constructor(props) {
    super(props);
  }



  render() {
    const {type, handleAddLocation, handleEditLocation, handleDeleteInstrument } = this.props;
    return (
      <Switch>

        <Route path='/instrument/add' component={AddInstrument} />

        <Route path='/instrument/edit/:id' component={EditInstrument} />

        <Route path='/instrument/view/:id' component={ViewInstrument} type={type} />

        <Route exact path='/instruments/:id' render={(props) => (
            <ListInstrument {...props} columnData={ColumnData.InstrumentColumnData} type={type} handleDeleteInstrument={handleDeleteInstrument} />
        )}/>
        <Route exact path='/instruments' render={(props) => (
            <ListInstrument {...props} columnData={ColumnData.InstrumentColumnData} type={type} handleDeleteInstrument={handleDeleteInstrument} />
        )}/>

        <Route path='/project/add' component={AddProject} />
        <Route path='/project/edit/:id' component={EditProject} />

        <Route path='/project/view/:id' component={ViewProject} />

        <Route exact path='/projects' render={(props) => (
            <ListProject {...props} columnData={ColumnData.ProjectColumnData} type={type} />
        )}/>

        <Route path='/projects/:id' render={(props) => (
          <ListProject {...props} columnData={ColumnData.ProjectColumnData} type={type} />
        )}/>

        <Route exact path='/location/add' render={(props) => (<AddLocation {...props} handleAddLocation={handleAddLocation}/>
        )}/>

         <Route path='/location/:id' render={(props) => (<EditLocation {...props} handleEditLocation={handleEditLocation} />
        )}/>

        <Route path='/pivot-table' component={MyPivotTable} />
      </Switch>
    )
  }
}
export default withRouter(MainContent);
  // render() {
  //   const { classes, theme } = this.props;
  //   return (
  //     <main className={classes.content}>
  //         <div className={classes.toolbar} />
  //         <Typography noWrap>{'You think water moves fast? You should see ice 2.'}</Typography>
  //
          //{routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
          // <Route exact path='/instrument' component={ListInstrument} />
          // <Route path='/instrument/:id' component={EditInstrument} />
          // <Route exact path='/instrument/:id' render={(props) => (
          //     <ListInstrument {...props} />
          // )}/>

  //
  //     </main>
  //   );
  //}
