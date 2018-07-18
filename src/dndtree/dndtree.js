import React, { Component } from 'react';
import SortableTree, { insertNode, changeNodeAtPath, getNodeAtPath, removeNodeAtPath, find } from 'react-sortable-tree';
//import 'react-sortable-tree/style.css';
//import CustomTheme from './customtheme';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PlaceOutlinedIcon from '@material-ui/icons/PlaceOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import * as dataService from '../service/dataservice';

class DnDTree extends Component {
    // constructor(props) {
    //     super(props);
    
    //     this.state = {
    //       searchString: '',
    //       searchFocusIndex: 0,
    //       searchFoundCount: null,
    //       treeData: [
    //         { title: 'This is the Full Node Drag theme' },
    //         { title: 'You can click anywhere on the node to drag it' },
    //         {
    //           title: 'This node has dragging disabled',
    //           subtitle: 'Note how the hover behavior is different',
    //           dragDisabled: true,
    //         },
    //         { title: 'Chicken', children: [{ title: 'Egg' }] },
    //       ],
    //     };
    //     this.updateTreeData = this.updateTreeData.bind(this);
    //     this.expandAll = this.expandAll.bind(this);
    //     this.collapseAll = this.collapseAll.bind(this);
    //   }
    
    //   updateTreeData(treeData) {
    //     this.setState({ treeData });
    //   }
    
    //   expand(expanded) {
    //     this.setState({
    //       treeData: toggleExpandedForAll({
    //         treeData: this.state.treeData,
    //         expanded,
    //       }),
    //     });
    //   }
    
    //   expandAll() {
    //     this.expand(true);
    //   }
    
    //   collapseAll() {
    //     this.expand(false);
    //   }
    
    //   render() {
    //     const {
    //       treeData,
    //       searchString,
    //       searchFocusIndex,
    //       searchFoundCount,
    //     } = this.state;
    
    //     const alertNodeInfo = ({ node, path, treeIndex }) => {
    //       const objectString = Object.keys(node)
    //         .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
    //         .join(',\n   ');
    
    //       console.log(
    //         'Info passed to the icon and button generators:\n\n' +
    //           `node: {\n   ${objectString}\n},\n` +
    //           `path: [${path.join(', ')}],\n` +
    //           `treeIndex: ${treeIndex}`
    //       );
    //     };
    
    //     const selectPrevMatch = () =>
    //       this.setState({
    //         searchFocusIndex:
    //           searchFocusIndex !== null
    //             ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
    //             : searchFoundCount - 1,
    //       });
    
    //     const selectNextMatch = () =>
    //       this.setState({
    //         searchFocusIndex:
    //           searchFocusIndex !== null
    //             ? (searchFocusIndex + 1) % searchFoundCount
    //             : 0,
    //       });
    
    //     return (
    //       <div
    //         style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
    //       >            
    
    //         <div style={{ flex: '1 0 50%', padding: '0 0 0 15px' }}>
    //           <SortableTree
    //             theme={CustomTheme}
    //             treeData={treeData}
    //             onChange={this.updateTreeData}
    //             searchQuery={searchString}
    //             searchFocusOffset={searchFocusIndex}
    //             style={{width: '600px'}}
    //             rowHeight={45}
    //             searchFinishCallback={matches =>
    //               this.setState({
    //                 searchFoundCount: matches.length,
    //                 searchFocusIndex:
    //                   matches.length > 0 ? searchFocusIndex % matches.length : 0,
    //               })
    //             }
    //             canDrag={({ node }) => !node.dragDisabled}
    //             generateNodeProps={rowInfo => ({
    //               buttons: [
    //                 <button onClick={() => alertNodeInfo(rowInfo)}>i</button>,
    //               ],
    //             })}
    //           />
    //         </div>
    //       </div>
    //     );
    //   }
    constructor(props) {
      super(props);  
      this.state = {
        // treeData: [
        //   {  title: 'Instruments', dragDisabled: true,  children: [
        //     { id: 1, title: 'San Francisco', dragDisabled: true, children: [{id: 2, title: 'instrument 1'}] },
        //     { id: 4, title: 'You can click anywhere on the node to drag it' },
        //     { id: 3, title: 'Santa Clara', dragDisabled: true,  children: [{ id:5, title: 'Egg' }] },
        //   ]}
        // ],
        treeData: [],//this.props.treeData,
        //newLocation: this.props.newLocation,
      };
    }

    componentDidMount() {
      console.log('componentDidMount')
      const {type} = this.props;
      let treeData = dataService.getTree(type.name)
      this.setState({
          treeData:treeData
      })
    }

    componentDidUpdate(prevProps) {
      //console.log(this.state.treeData)
      //console.log(this.props)
      if (prevProps.type.name !== this.props.type.name) {
        let treeData = dataService.getTree(this.props.type.name)
        this.setState({
            treeData:treeData
        })
    }
      // if (prevProps.treeData !== this.props.treeData) {
      //     this.setState({
      //         treeData:this.props.treeData
      //     })
      // }  
      else if (prevProps.newLocation !== this.props.newLocation)  {
        const { newLocation } = this.props;
        let location = {id:newLocation.id, title:newLocation.name, dragDisabled: true, children:[]}
        let treeData = this.state.treeData;
        let index = treeData[0].length;
        let result = insertNode({treeData:treeData, depth:1, minimumTreeIndex:index, newNode: location, getNodeKey:({ node }) => node.id});
        this.setState({
          treeData:result.treeData
        })

      }  
      else if (prevProps.updatedLocation !== this.props.updatedLocation) {
        const { path, updatedLocation } = this.props;
        let treeData = this.state.treeData;
        //console.log(path);
        let nodeInfo = getNodeAtPath({treeData:treeData, path:path, getNodeKey: ({node: TreeNode, treeIndex: number}) => {
          return number;
      }});
        //console.log(nodeInfo)
        nodeInfo.node.title = updatedLocation.name;
        let result = changeNodeAtPath({treeData:treeData, path:path, newNode: nodeInfo.node, getNodeKey: ({node: TreeNode, treeIndex: number}) => number })
        this.setState({
          treeData:result
        })
        
      } else if (prevProps.deletedInstrumentIds !== this.props.deletedInstrumentIds) {
        //console.log(this.props.deletedInstrumentIds)
        const { deletedInstrumentIds } = this.props;
        let treeData = this.state.treeData;
        const commonArgs = {
          //searchQuery: 42,
          searchMethod: ({ node, searchQuery }) => node.id === searchQuery,
          expandAllMatchPaths: false,
          expandFocusMatchPaths: true,
          getNodeKey: ({node: TreeNode, treeIndex: number}) => number,
          searchFocusOffset: 0,
        };
        deletedInstrumentIds.forEach(id => {
          let result = find({...commonArgs, searchQuery:id, treeData:treeData})
          console.log(result.matches)
          let path;
          result.matches.forEach(match => {
            if (match.node.children === undefined) {
              path = match.path
            }
          })
          if (path !== undefined)
            treeData = removeNodeAtPath({treeData:treeData, path:path, getNodeKey: ({node: TreeNode, treeIndex: number}) => number})
        })
        // //let result = changeNodeAtPath({treeData:treeData, path:deletedPath, newNode: nodeInfo.node, getNodeKey:({ node }) => node.id})
        // console.log(result)
        this.setState({
         treeData:treeData
        })
      } else if (prevProps.deletedPath !== this.props.deletedPath) {
        const { deletedPath } = this.props;
        //console.log(deletedPath)
        let treeData = this.state.treeData;
        let result = removeNodeAtPath({treeData:treeData, path:deletedPath, getNodeKey: ({node: TreeNode, treeIndex: number}) => {
          return number;
      }});
        //let result = changeNodeAtPath({treeData:treeData, path:deletedPath, newNode: nodeInfo.node, getNodeKey:({ node }) => node.id})
        this.setState({
         treeData:result
        })
      }
  }

  getIcons(rowInfo) {
    const { handleLocationClick, type } = this.props;
    let icons;
    switch (type.name) {
      case 'instrument': 
        icons = [
          /*<EditOutlinedIcon
            onClick={() => handleClick(rowInfo.node)}
          />,*/
          rowInfo.node.children !== undefined && rowInfo.node.id !== 0 && type.name !== 'project'?
          <PlaceOutlinedIcon
            onClick={() => { handleLocationClick(rowInfo)}}
          /> : '',
          /*rowInfo.node.children !== undefined && rowInfo.node.children.length === 0 && rowInfo.node.id !== 0 ?
          <DeleteOutlinedIcon onClick={() => handleLocationDelete(rowInfo)} />:''*/
        ];
        break;
      case 'project':
        icons = [
          <FolderOutlinedIcon
            
          />
        ]
        break;
      default:
        icons = [];
    }
    return icons;
  }

  getButtons(rowInfo) {
    const { handleClick, handleLocationDelete, type } = this.props;
    let buttons;
    switch (type.name) {
      case 'instrument': 
        buttons = [
          <EditOutlinedIcon
            onClick={() => handleClick(rowInfo.node)}
          />,
          rowInfo.node.children !== undefined && rowInfo.node.children.length === 0 && rowInfo.node.id !== 0 ?
            <DeleteOutlinedIcon onClick={() => handleLocationDelete(rowInfo)} />:''
        ]
        break;
      case 'project':
        buttons = [
          <EditOutlinedIcon
            onClick={() => handleClick(rowInfo.node)}
          />
        ]
        break;
      default:
        buttons = [];
    }
    return buttons;


  }
  
    render() {
      const { handleMove,  open  } = this.props;
      let display = open? 'inline':'none';
      const { treeData } = this.state;

      return (
        <div style={{ flex: '1 0 50%', padding: '0 0 0 15px', width:'220px', display:display }}>
          <SortableTree
            theme={FileExplorerTheme}
            treeData={treeData}
            onChange={treeData => this.setState({ treeData })}
            onMoveNode={({ node, nextParentNode, treeData, nextPath }) => 
              handleMove(
                node,
                nextParentNode,
                treeData,
                nextPath
              )
            }
            canDrag={({ node }) => !node.dragDisabled}
            canDrop={({ nextParent, nextPath }) =>  { return nextParent !== null && !nextParent.dropDisabled /*&& nextParent.length < 4*/ }}
            generateNodeProps={rowInfo => ({
              icons: this.getIcons(rowInfo),
              buttons: this.getButtons(rowInfo)
            })}
            innerStyle={{'outline':'none'}}
            rowHeight={({treeIndex}) => 36}
          />
        </div>
      );
    }
}



export default DnDTree;