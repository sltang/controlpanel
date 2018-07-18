const locations = [
    {id:1, name:'San Francisco', desc:'San Francisco Location'},
    {id:2, name:'Santa Clara', desc:'Agilent Headquarters'},
    {id:3, name:'Sunnyvale', desc:'Sunnyvale Lab'}
  ]

export const getAll = () => {
    return locations;
}

export const add = (location) => {
    //console.log(location)
    let id = locations.length + 1;
    location['id'] = id;
    locations.push(location);
    //let newLocation = {id:id, title:location.name, dragDisabled: true, children:[]}
    //locations.push(newLocation);
    //console.log(locations)
}

export const getById = (id) => {
    let locs = locations.filter(location => location.id === parseInt(id, 10))
    if (locs.length > 0) {
        return locs[0];
    }
    return {};
}

export const update = (location) => {
    let id = location.id;
    for (let i=0; i<locations.length;i++) {
        if (locations[i].id === id) {
            locations[i].name = location.name; 
            locations[i].desc = location.desc;
        }
    }
}

export const remove = (id) => {
    for (let i=0; i<locations.length; i++) {
        if (id === locations[i].id) {
            locations.splice(i, 1);
        }
    }
}