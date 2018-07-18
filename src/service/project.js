const projects = [
  {id:1, name:'Project 1', group:'Group 1', desc: 'Project 1 description', createDate: '2018-05-23 15:50:54-07:00', createdBy: 'SYSTEM', folderPath:'C:\\CDSProjects\\Project 1', modified:'2018-05-23 15:50:54-07:00', modifiedBy:'SYSTEM', application:'OpenLab CDS'},
  {id:2, name:'Project 2', group:'Group 1', desc: 'Project 2 description', createDate: '2018-05-28 15:52:57-07:00', createdBy: 'SYSTEM', folderPath:'C:\\CDSProjects\\Project 2', modified:'2018-05-23 15:52:54-07:00', modifiedBy:'SYSTEM', application:'OpenLab CDS'},
]

//class InstrumentService {

  export const getAll = () => {
    return projects;
  }


  export const getTree = () => {
    // return [
    //   {id:1, name:'Project 1', nodes:[]},
    //   {id:2, name:'Project 2', nodes:[]}
    // ];
    return [{ id:0, title: 'Projects', dragDisabled: true,  children: [
          {id:1, title:'Project 1', dragDisabled: true, children:[]},
          {id:2, title:'Project 2', dragDisabled: true, children:[]},
        ]
    }];
  }

  export const getByName = (name) => {
    return projects.filter(instr => instr['name'] === name);
  }

  export const getById = (id) => {
    const project = projects.filter(project => project['id'] === parseInt(id, 10));
    return project;
  }
//}

//exports.instrumentService = new InstrumentService();
