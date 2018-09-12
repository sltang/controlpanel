export const groupBy = (objectArray, property) => {
    if (objectArray === undefined) {
        console.error('objectArray is undefined')
        return {}
    }
    return objectArray.reduce(function (acc, obj) {
        if (obj.hasOwnProperty(property)) {
            var key = obj[property];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
        }
        return acc;
    }, {});
}

const groupBy2 = (objectArray, property, value) => {
    if (objectArray === undefined) {
        console.error('objectArray is undefined')
        return {}
    }
    return objectArray.reduce(function (acc, obj) {
        if (obj.hasOwnProperty(property)) {
            var key = obj[property];            
            if (key === value || value === '') {
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(obj);
            }
        }
        return acc;
    }, {});
}

export const getGroupBy = (obj) => {
    let data = []
    Object.keys(obj).forEach(k => {
        let d = {}
        d['name'] = k
        d['value'] = obj[k].length
        data.push(d)
    })
    return data
}


/*
* nested grouping of an array by properties in groupByList
*/
export const hierGroupBy = (arr, groupByList) => {
    let grpby = groupByList[0]
    let o = groupBy(arr, grpby)
    //console.log(o)
    let groupByListCopy = groupByList.slice(0)
    groupByListCopy.splice(0, 1)
    //console.log(arr)
    //console.log(groupByListCopy)
    if (groupByListCopy.length > 0) {
        Object.keys(o).forEach(k => {
            //let copy = Object.assign(o[k])  
            //let r = hierGroupBy(copy, local)
            //if (Object.keys(r).length > 0)
            //o[k] = r  
            o[k] = hierGroupBy(o[k], groupByListCopy)
        })
    }
    return o
}

export const hierGroupBy2 = (arr, gbo) => {
    let groupByObject = {...gbo} //clone gbo so it doesn't get changed; //Object.assign(gbo) does not work
    let grpby = Object.keys(groupByObject)[0]
    let grpByValue = groupByObject[grpby]
    let o = groupBy2(arr, grpby, grpByValue)
    delete groupByObject[grpby]
    if (Object.keys(groupByObject).length > 0) {
        Object.keys(o).forEach(k => {
            o[k] = hierGroupBy2(o[k], groupByObject)
        })
    }
    return o
}

/*
* flatten an object's values to an array recursively
*/
export const objToArray = (obj) => {
    let arr = []
    Object.values(obj).forEach(v => {
        if (Array.isArray(v)) {
            arr = arr.concat(v)
        } else {
            let a = objToArray(v)
            arr = arr.concat(a)
        }
    })
    return arr
}

/*
* flatten an object's values to an array
* e.g. o = {k1:{k11:arr1, k12:arr2}, k2:{k21:arr3}}
*  objToArray2(o) = [arr1, arr2, arr3]
*/
export const objToArray2 = (obj) => {
    let arr = []
    Object.values(obj).forEach(v => {
        if (Array.isArray(v)) {
            arr.push(v)
        } else {
            let a = objToArray2(v)
            arr.push(...a)
        }
    })
    return arr
}