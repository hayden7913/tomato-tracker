const _ = require('lodash');
const shortid = require('shortid');
const  projectsN = require('./projects-denormalized');

// not designed to handle data with second level deep arrays non-array objects as properties;
function normalize(dataArray, idKey, objTranformer) {
  const byId = {};
  const allIds = [];

  dataArray.forEach((item) => {
    const byIdProp = {};
    const newItem = objTranformer ? objTranformer(item) : item;
    allIds.push(newItem[idKey]);

    Object.keys(newItem).forEach((key) => {
      const itemKeyValue = newItem[key];

      if (Array.isArray(itemKeyValue)) {
        byIdProp[key] = newItem[key].map(subItem => subItem[idKey]);
      } else {
        byIdProp[key] = itemKeyValue;
      }
    });

    byId[newItem[idKey]] = byIdProp;
  });

  // const allIds = dataArray.map(item => item[idKey]);

  return {
    byId,
    allIds,
  };
}

const tasks = _.flatMap(projectsN.items, project => project.tasks)

// const addShortId = object => object.shortId
//   ? object
//   : Object.assign({}, object, { shortId: shortid.generate() });


const res = normalize(projectsN.items, 'shortId');
// const res = projectsN;

// Object.keys(res.byId).forEach(key => console.log(res.byId[key]));
console.log(JSON.stringify(res, null, 2));
