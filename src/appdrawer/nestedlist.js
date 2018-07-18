import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import * as dataService from '../service/dataservice.js';

const styles = theme => ({
  root: {
    width: '100%',
    //maxWidth: 240,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  gutters: {
    paddingLeft: '0px'
  },
  inset: {
    'firstChild': {
      paddingLeft: '36px'
    }
  }
});

class NestedList extends Component {

    constructor(props) {
    super(props);
    this.state = {
      open: true,
      nodes: [

      ],
      //states: {}
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleList = this.handleList.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    /*get the entity type from props and call corresponding service to get the
    data
    */
    const type = this.props.type.name;
    const entities = dataService.getTree(type);
    this.setState({ nodes:entities});
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps);
    const type = nextProps.type.name;
    const entities = dataService.getTree(type);
    this.setState({ nodes:entities});
  }

  handleClick = (name, e) => {
    this.setState({
      [name] : this.state[name] === 'undefined' || !this.state[name]
    });

  };

  handleDelete = (id, e) => {
    console.log(`deleting instrument ${id}`);
  }

  handleEdit = (id, e) => {
    const { history:{ push }, type } = this.props;
    //console.log('/'+type.name+'/edit/'+id);
    push('/'+type.name+'/edit/'+id);
    
  }

  handleList = (name) => {
    this.handleClick(name);
    const { history:{ push }, type } = this.props;
    if (name === type.name) {
      push('/'+type.name+'s');
      //console.log('/'+type.name+'s');
    } else {
      push('/'+type.name+'s/'+name);
      //console.log('/'+type.name+'s/'+name);
    }
  }

  buildTree = (nodes) => {
    const { classes } = this.props;
    return nodes.map(node => {
      let showExpand;
      if (node.nodes.length === 0) {
        showExpand = <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>;
      } else if (this.state[node.name]!=='undefined' && this.state[node.name]) {
        showExpand = <ExpandLess />;
      } else {
        showExpand = <ExpandMore />;
      }
      return (<div key={node.id}><ListItem button onClick={(e) => this.handleList(node.name, e)} className={classes.gutters}>
        <ListItemText inset primary={node.name} />
        { showExpand }
        </ListItem>
        <Collapse in={this.state[node.name]!=='undefined' && this.state[node.name]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            {node.nodes.map(n => {
              return (
                <ListItem button key={n.id} className={classes.nested} onClick={(e) => this.handleEdit(n.id, e)}>
                  <ListItemText inset primary={n.name} />
                  <ListItemIcon onClick={(e) => this.handleDelete(n.id, e)}>
                    <DeleteIcon />
                </ListItemIcon>
              </ListItem>
              )
            })}
            </List>
        </Collapse>
        </div>
      )
    });


  }

  render() {
    const { classes } = this.props;
    const { label, name } = this.props.type;

    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem button onClick={this.handleList.bind(this, name)} className={classes.gutters}>
            <ListItemText inset primary={label} />
           {this.state[name] ? <ExpandLess onClick={(e) => this.handleClick(name, e)} /> : <ExpandMore onClick={(e) => this.handleClick(name, e)} />}
          </ListItem>
            <Collapse in={this.state[name]!=='undefined' && this.state[name]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {this.buildTree(this.state.nodes)}
              </List>
            </Collapse>
        </List>
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(withRouter(NestedList));
