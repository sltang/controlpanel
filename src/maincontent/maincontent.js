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
import ListLocation from './location/list'
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

class MainContent extends Component {

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

        <Route path='/location/edit/:id' component={EditLocation} />

         <Route path='/location/:id' render={(props) => (<EditLocation {...props} handleEditLocation={handleEditLocation} />
        )}/>

         <Route exact path='/locations' render={(props) => (
            <ListLocation {...props} columnData={ColumnData.LocationColumnData} type={type} />
        )}/>

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
