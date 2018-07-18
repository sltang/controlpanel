import React, { Component } from 'react';
import DndTree from './dndtree';
import { withRouter } from 'react-router-dom';
import * as dataService from '../service/dataservice';
import * as locationService from '../service/location'

class TreeNavigation extends Component {

    constructor(props) {
        super(props);
        //const {type} = this.props;
        //let treeData = dataService.getTree(type.name)
        this.state = {
            //treeData:[],//treeData,
            //treeUpdateCount: this.props.treeUpdateCount,
            //newLocation: this.props.newLocation, //this is bad, it is a reference
            //updatedLocation : {},
            path: [],
            deletedPath: '',
            //deletedInstrumentIds : []
        }
        // this.state = {
        //     treeData:[
        //         // {  title: 'Instruments', dragDisabled: true,  children: [
        //         //     { id: 1, title: 'San Francisco', dragDisabled: true, children: [{id: 1, title: 'instrument 1'}, {id: 3, title: 'instrument 3'}] },
        //         //     { id: 3, title: 'Santa Clara', dragDisabled: true,  children: [{ id:2, title: 'instrument 2' }] },
        //         //     { id: 5, title:'Sunnyvale', children:[]}
        //         // ]}
        //     ]
        // }
    }

    /*
          {id:1, name:'San Francisco', nodes:[{id:1, name:'instrument 1'}, {id:3, name:'instrument 3'}]},
      {id:4, name:'Santa Clara', nodes:[{id:2, name:'instrument 2'}]},
      {id:5, name:'Sunnyvale', nodes:[]},
      {  title: 'Projects', dragDisabled: true,  children: [
            {id:1, name:'Project 1', dragDisabled: true, children:[]},
            {id:2, name:'Project 2', dragDisabled: true, children:[]},
        ]
    }
    
      
      */

    // componentDidMount() {
    //     const {type} = this.props;
    //     let treeData = dataService.getTree(type.name)
    //     this.setState({
    //         treeData:treeData
    //     })
    // }

    componentDidUpdate(prevProps) {
        // console.log(prevProps)
        // console.log(this.props)
        // console.log(prevProps.updatedLocation)
        // console.log(this.props.updatedLocation)
        //console.log(this.props)
        // if (prevProps.type.name !== this.props.type.name) {
        //     let treeData = dataService.getTree(this.props.type.name)
        //     this.setState({
        //         treeData:treeData
        //     })
        // }  else 
        if (prevProps.newLocation !== this.props.newLocation) {
            console.log(this.props.newLocation);
            //this.setState({newLocation:this.props.newLocation})
        }

        else if (prevProps.updatedLocation !== this.props.updatedLocation) {
            //console.log(this.props.updatedLocation);
            //this.setState({updatedLocation:this.props.updatedLocation})
        } //else if (prevProps.deletedInstrumentIds !== this.props.deletedInstrumentIds) {
            //console.log(this.props.deletedInstrumentIds);
        //    this.setState({ deletedInstrumentIds : this.props.deletedInstrumentIds})
        //}
    }

    // shouldComponentUpdate(prevProps) {
    //     console.log(prevProps.updatedLocation)
    //     if (prevProps.updatedLocation === this.props.updatedLocation) return false;
    //     return true;
    // }

    handleClick = (node) => {
        const { history:{push}, type } = this.props;
        //console.log(node)
        if (node.id === 0) {
            push('/'+type.name+'s');
        } else {
            if (node.children === undefined) {
                //console.log('/'+type.name+'/view/'+node.id);
                push('/'+type.name+'/view/'+node.id);
            } else {
                //console.log('/'+type.name+'s/'+node.title);
                push('/'+type.name+'s/'+node.title);
            }
        }
       
    }

    handleLocationClick = (rowInfo) => {        
        //console.log(rowInfo.path);
        let id = rowInfo.node.id;
        //console.log(id);
        if (id === undefined) return;
        this.setState({path: rowInfo.path})
        const { history:{push} } = this.props;
        push('/location/'+rowInfo.node.id);
    }

    handleMove = (node, nextParentNode, treeData, nextPath) => {
        //console.log(node.id)
        //console.log(nextParentNode.title)
        //console.log(treeData);
        const { history:{push}, type } = this.props;
        //this.setState({treeData:treeData})
        dataService.move(type.name, node.id, nextParentNode.title);       
        push('/'+type.name+'s/'+nextParentNode.title);
    }

    handleLocationDelete = (rowInfo) => {
        const { history:{push}, type } = this.props;
        const path = rowInfo.path;
        const id = rowInfo.node.id;
        //console.log(rowInfo)
        locationService.remove(id);    
        this.setState({deletedPath:path});         
        push('/'+type.name+'s/');
    }

    render() {
        const { open, type, updatedLocation, deletedInstrumentIds, newLocation } = this.props;
        const { path, deletedPath,  } = this.state;
        //console.log(treeData)
        return (
            <DndTree handleClick={this.handleClick} handleMove={this.handleMove} handleLocationClick={this.handleLocationClick}
            handleLocationDelete={this.handleLocationDelete} deletedPath={deletedPath}
            open={open} newLocation={newLocation} updatedLocation={updatedLocation} deletedInstrumentIds={deletedInstrumentIds} path={path} type={type}/>
        )
    }
}

export default withRouter(TreeNavigation);