const locations = []

export const getAll = () => {
    if (locations.length === 0) {
        for (let i=1; i<11; i++) {
            let loc = {id:i, name:'Location ' + i, desc:'Location ' + i + ' description', createDate:'2018-05-23 15:50:33-07:00', createdBy:'User '+i}
            locations.push(loc)
        }        
    }
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