import * as locationService from './location';

const instruments = [
  {id : 1, name: 'instrument 1',  project:'Project 1', location: 'San Francisco', locationId:1, application: 'OpenLab CDS', type: 'Agilent GC & GC/MS Systems', controller: 'CND8084VHW',
  description: '', lastConfiguredBy:'', lastConfigured: '', created: '2018-05-23 15:50:33-07:00', usedBy: '', runStatus:'', currentSample:'', status:'Not Connected'},
  {id : 3, name: 'instrument 3',  project:'Project 1', location: 'San Francisco',locationId:1, application: 'OpenLab CDS', type: 'Agilent GC & GC/MS Systems', controller: 'CND8084VHW',
  description: '', lastConfiguredBy:'', lastConfigured: '', created: '2018-05-23 15:30:01-07:00', usedBy: '', runStatus:'', currentSample:'', status:'Not Connected'},
  {id : 2, name: 'instrument 2', project:'Project 1', location: 'Santa Clara', locationId:2, application: 'OpenLab CDS', type: 'Agilent LC & LC/MS Systems', controller: 'CND8084VHW',
  description: '', lastConfiguredBy:'', lastConfigured: '', created: '2018-05-23 15:55:33-07:00', usedBy: '', runStatus:'', currentSample:'', status:'Not Connected'}
]

//class InstrumentService {

  export const getAll = () => {
    return instruments;
  }

  export const getAllByLocation = (location) => {
    return instruments.filter(instr => instr.location === location);
  }

  export const getInstrumentsByLocationId = (locationId) => {
    console.log(locationId)
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
      { id: 0, title: 'Instruments', dragDisabled: true,  children: [
          { id: 1, title: 'San Francisco', dragDisabled: true, children: [{id: 1, title: 'instrument 1', dropDisabled:true}, {id: 3, title: 'instrument 3', dropDisabled:true}] },
          { id: 2, title: 'Santa Clara', dragDisabled: true,  children: [{ id: 2, title: 'instrument 2', dropDisabled:true}] },
          //{ id: 3, title: 'Sunnyvale', dragDisabled: true, children:[]}
      ]}
    ];
    locations.forEach(loc => {
      let l = {id: loc.id, title: loc.name, dragDisabled: true, children:[]}
      tree[0].children.push(l);
    })
    return tree;
  }

  export const getById = (id) => {
    const instrument = instruments.filter(instr => instr['id'] === parseInt(id, 10));
    return instrument;
  }

  export const save = (o) => {
    for (let i=0; i<instruments.length; i++) {
      if (o.id === instruments[i].id) {
        instruments[i] = o;
        return;
      }
    }
  }

  export const add = (o) => {
    let id = instruments.length+1;
    o['id'] = id;
    instruments.push(o);
  }

  export const remove = (ids) => {
    ids.forEach(id => {
      for (let i=0; i<instruments.length; i++) {
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
      //console.log(instrument)
    }
    
  }
