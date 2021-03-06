import * as locationService from './location';
import * as utils from './utils';

const instruments = [
  // {
  //   id: 1, name: 'instrument 1', project: 'Project 1', location: 'San Francisco', locationId: 1, application: 'OpenLab CDS', type: 'Agilent GC & GC/MS Systems', controller: 'CND8084VHW',
  //   description: '', lastConfiguredBy: '', lastConfigured: '', created: '2018-05-23 15:50:33-07:00', usedBy: '', runStatus: '', currentSample: 'Sample 1', status: 'Running'
  // },
  // {
  //   id: 3, name: 'instrument 3', project: 'Project 1', location: 'San Francisco', locationId: 1, application: 'OpenLab CDS', type: 'Agilent GC & GC/MS Systems', controller: 'CND8084VHW',
  //   description: '', lastConfiguredBy: '', lastConfigured: '', created: '2018-05-23 15:30:01-07:00', usedBy: '', runStatus: '', currentSample: 'Sample 2', status: 'Error'
  // },
  // {
  //   id: 2, name: 'instrument 2', project: 'Project 1', location: 'Santa Clara', locationId: 2, application: 'OpenLab CDS', type: 'Agilent LC & LC/MS Systems', controller: 'CND8084VHW',
  //   description: '', lastConfiguredBy: '', lastConfigured: '', created: '2018-05-23 15:55:33-07:00', usedBy: '', runStatus: '', currentSample: '', status: 'Not Connected'
  // },
  // {
  //   id: 4, name: 'instrument 4', project: 'Project 1', location: 'San Francisco', locationId: 1, application: 'OpenLab CDS', type: 'Agilent LC & LC/MS Systems', controller: 'CND8084VHW',
  //   description: '', lastConfiguredBy: '', lastConfigured: '', created: '2018-05-23 15:55:33-07:00', usedBy: '', runStatus: '', currentSample: '', status: 'Running'
  // }
]

const locations = ['Location 1', 'Location 2', 'Location 3', 'Location 4', 'Location 5', 'Location 6', 'Location 7', 'Location 8', 'Location 9', 'Location 10']
const types = ['Agilent GC & GC/MS Systems', 'Agilent LC & LC/MS', 'Agilent A/D System', 'Virtual Instruments']
const projects = ['Project 1', 'Project 2', 'Project 3', 'Project 4']
const states = ['Not Connected', 'Idle', 'Error', 'PreRun', 'Running', 'NotReady', 'MaintananceDue', 'Sleep']
const controllers = ['CND8084VHA', 'CND8084VHB', 'CND8084VHC', 'CND8084VHD', 'CND8084VHE', 'CND8084VHF', 'CND8084VHG', 'CND8084VHH', 'CND8084VHI', 'CND8084VHJ']
const size = 100

const generateInstruments = () => {
  if (instruments.length === 0) {
    let seed = {
      id: 1, name: 'instrument 1', project: 'Project 1', location: 'San Francisco', locationId: 1, application: 'OpenLab CDS', type: 'Agilent GC & GC/MS Systems', controller: 'CND8084VHW',
      description: '', lastConfiguredBy: '', lastConfigured: '', created: '2018-05-23 15:50:33-07:00', usedBy: '', runStatus: '', currentSample: 'Sample 1', status: ''
    }

    

    for (let i = 0; i < size; i++) {
      let instrument = { ...seed }
      let locationIndex = parseInt(Math.random() * Object.keys(locations).length, 10)
      instrument.location = locations[locationIndex]
      instrument.controller = controllers[locationIndex]
      let typeIndex = parseInt(Math.random() * Object.keys(types).length, 10)
      instrument.type = types[typeIndex]
      instrument.id = i + 1
      instrument.name = 'Instrument ' + instrument.id
      let projectIndex = parseInt(Math.random() * Object.keys(projects).length, 10)
      instrument.project = projects[projectIndex]
      instrument.currentSample = 'Sample ' + instrument.id
      let statusIndex = parseInt(Math.random() * Object.keys(states).length, 10)
      instrument.status = states[statusIndex]
      instruments.push(instrument)
    }
  }
  return instruments
}

//class InstrumentService {

export const getAll = () => {
  if (instruments.length === 0) {
    generateInstruments()
  }
  return instruments;
}

export const getAllByLocation = (location) => {
  if (instruments.length === 0) {
    generateInstruments()
  }
  return instruments.filter(instr => instr.location === location);
}

export const getInstrumentsByLocationId = (locationId) => {
  if (instruments.length === 0) {
    generateInstruments()
  }
  return instruments.filter(instr => instr.locationId === parseInt(locationId, 10));
}

export const getTree = () => {
  // return [
  //   {id:1, name:'San Francisco', nodes:[{id:1, name:'instrument 1'}, {id:3, name:'instrument 3'}]},
  //   {id:4, name:'Santa Clara', nodes:[{id:2, name:'instrument 2'}]},
  //   {id:5, name:'Sunnyvale', nodes:[]},
  // ];
  let instLocationNames = instruments.map(inst => inst.location);
  let locations = locationService.getAll();
  locations = locations.filter(loc => instLocationNames.indexOf(loc.name) === -1);
  let tree = [
    {
      id: 0, title: 'Instruments', dragDisabled: true, children: [
        { id: 1, title: 'San Francisco', dragDisabled: true, children: [{ id: 1, title: 'instrument 1', dropDisabled: true }, { id: 3, title: 'instrument 3', dropDisabled: true }] },
        { id: 2, title: 'Santa Clara', dragDisabled: true, children: [{ id: 2, title: 'instrument 2', dropDisabled: true }] },
        //{ id: 3, title: 'Sunnyvale', dragDisabled: true, children:[]}
      ]
    }
  ];
  locations.forEach(loc => {
    let l = { id: loc.id, title: loc.name, dragDisabled: true, children: [] }
    tree[0].children.push(l);
  })
  return tree;
}

export const getById = (id) => {
  if (instruments.length === 0) {
    generateInstruments()
  }
  const instrument = instruments.filter(instr => instr['id'] === parseInt(id, 10));
  return instrument;
}

export const save = (o) => {
  for (let i = 0; i < instruments.length; i++) {
    if (o.id === instruments[i].id) {
      instruments[i] = o;
      return;
    }
  }
}

export const add = (o) => {
  let id = instruments.length + 1;
  o['id'] = id;
  instruments.push(o);
}

export const remove = (ids) => {
  ids.forEach(id => {
    for (let i = 0; i < instruments.length; i++) {
      if (id === instruments[i].id) {
        instruments.splice(i, 1);
      }
    }
  })
}

export const move = (id, location) => {

  let instruments = getById(id);
  if (instruments.length > 0) {
    let instrument = instruments[0];
    instrument.location = location;
  }

}

export const groupBy = (group) => {
  if (instruments.length === 0) {
    generateInstruments()
  }
  return utils.groupBy(instruments, group)
}

export const hierGroupBy = (groupByList) => {
  if (instruments.length === 0) {
    generateInstruments()
  }
  return utils.hierGroupBy(instruments, groupByList)
}

export const getUpdatedInstruments = () => {
  const updatedInstruments = []
  for (let i = 0; i < 10; i++) {
    let instrument = instruments[i]
    let statusIndex = parseInt(Math.random() * Object.keys(states).length, 10)
    instrument.status = states[statusIndex]
    updatedInstruments.push(instrument)
  }

  return updatedInstruments
}
