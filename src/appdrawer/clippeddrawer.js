import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuAppBar from '../menuappbar/menuappbar';
//import NestedList from './nestedlist';
import Hidden from '@material-ui/core/Hidden';
import MainContent from '../maincontent/maincontent';
import { withRouter } from 'react-router-dom';
import TreeNavigation from '../dndtree/navigationtree';
//import DnDTree from '../dndtree/dndtree';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 8,
    },
  },
  hide: {
     display: 'none',
   },
  toolbar: {
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'flex-end',
     padding: '0 8px',
     ...theme.mixins.toolbar,
   },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
  create: {padding: '0 8px'},
});

const types = {
  instruments : {label: 'Instruments', name: 'instrument'},
  projects: {label: 'Projects', name: 'project'},
  locations:  {label: 'Locations', name: 'location'},
}

class ClippedDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      type: types['instruments'],
      newLocation: {},
      updatedLocation: {},
      deletedInstrumentIds: []
    };
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  handleToggleDrawer = () => {
    this.setState({ open: !this.state.open });
  };

  handleTypeChange(type) {
    this.setState({type:types[type]});
  }

  handleCreate = event => {
    const { history : {push} } = this.props;
    push('/'+this.state.type.name+'/add');
  }

  handleAddLocation = (location) => {
    console.log(location)
    //console.log(this.state.treeUpdateCount)
    //let treeUpdateCount = this.state.treeUpdateCount+1
    //console.log(treeUpdateCount)
    //this.setState({treeUpdateCount:this.state.treeUpdateCount===undefined? 0:this.state.treeUpdateCount+1})
    this.setState({ newLocation:location})
    // this.setState((prevState, props) => {
    //   return {treeUpdateCount: prevState.treeUpdateCount + 1};
    // });
    
  }

  handleEditLocation = (location) => {
    let updatedLocation = {}
    for (let key in location) {
      updatedLocation[key] = location[key];
    }
    this.setState({updatedLocation:updatedLocation})
  }

  handleDeleteInstrument = (ids) => {
    this.setState({deletedInstrumentIds:ids})
  }

  componentDidUpdate() {
  }


  render() {
    const { classes } = this.props;
    const { type } = this.state;

    return (

      <div className={classes.root}>

        <MenuAppBar onTypeChange={this.handleTypeChange} />
        {/* <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          
          <div className={classes.toolbar} />
          <div className={classes.drawerHeader}>
            <span style={{display: open ? 'block':'none'}}>{type.label}</span>
            <IconButton onClick={this.handleToggleDrawer}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>            
          </div>
          {open ? 
              (<div>
              <div onClick={this.handleCreate} className={classes.create}>Create {type.name}</div>
              </div>)
              : '' }
          <TreeNavigation type={type} open={open} newLocation={newLocation} updatedLocation={updatedLocation} deletedInstrumentIds={deletedInstrumentIds}/>
        </Drawer>
        </Hidden> */}
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <MainContent type={type} handleAddLocation={this.handleAddLocation} handleEditLocation={this.handleEditLocation} handleDeleteInstrument={this.handleDeleteInstrument} />
        </main>

      </div>

    );
  }
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(withRouter(ClippedDrawer));
