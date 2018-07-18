import * as instrumentService from './instrument.js';
import * as projectService from './project.js';

const mapping = {
  'instrument' : instrumentService,
  'project': projectService
};

//class DataService {



  export const getAll = (type) => {
    //console.log(mapping[type]);
    return mapping[type].getAll();
  }

  export const getAllByLocation = (type, location) => {
    return mapping[type].getAllByLocation(location);
  }

  export const getTree = (type) => {
    return mapping[type].getTree();
  }

  export const getById = (type, id) => {
    return mapping[type].getById(id);
  }

  export const getByName = (type, name) => {
    return mapping[type].getByName(name);
  }

  export const save = (type, id) => {
    mapping[type].save(id);
  }

  // export const remove = (type, id) => {
  //   mapping[type].remove(id);
  // }

  export const add = (type, o) => {
    mapping[type].add(o);
  }

  export const remove = (type, ids) => {
    mapping[type].remove(ids);
  }

  export const move = (type, id, location) => {
    mapping[type].move(id, location);
  }

//}

//exports.dataService = new DataService();
