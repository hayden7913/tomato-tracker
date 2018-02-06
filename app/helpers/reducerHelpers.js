Array.prototype.mapAndFindById = function(idKey, id, callback) {
  return this.map((element, index) => {
    if (element[idKey] === id) {
      return callback(element, index);
    }

    return element;
  });
};

Array.prototype.sliceDelete = function(index) {
  return [
    ...this.slice(0, index),
    ...this.slice(index + 1)
  ];
};

export const keymap = {
  17: 'CONTROL',
  27: 'ESCAPE',
  38: 'ARROW_UP',
  40: 'ARROW_DOWN',
  68: 'D',
  78: 'N',
  88: 'X',
  71: 'G',
};

export function findIndices(arr, callback) {
  const resultArray = [];

  arr.forEach((element, i) => {
    if(callback(element)) {
      resultArray.push(i);
    }
  });

  return resultArray;
}

export const filterConsec = (arr) => {
  let hasMatchStarted = false;
  let hasMatchStopped = false;

  return arr.filter((currElement, index, array) => {
    if(hasMatchStopped) {
      return false;
    }

    if(index === 0) {
      hasMatchStarted = true;
      return currElement + 1 === array[1];
    }

    if(index < array.length) {
      if (hasMatchStarted && (currElement + 1 !== array[index + 1])) {
        hasMatchStopped = true;
      }

      if (currElement - 1 === array[index - 1] || currElement + 1 === array[index + 1]) {
        hasMatchStarted = true;
        return true;
      }
    }
  });
};

export function shiftElementsUp(arr, startIndex, endIndex) {
  const shiftElements = arr.slice(startIndex, endIndex + 1);
  const displacedElement = arr[startIndex - 1];
  const beginArray = arr.slice(0, startIndex - 1, );
  const endArray = arr.slice(endIndex + 1, arr.length);

  if (startIndex === 0) {
    return arr;
  }

  return([
    ...beginArray,
    ...shiftElements,
    displacedElement,
    ...endArray
  ]);
}

export function shiftElementsDown(arr, startElement, endElement) {
  const shiftElements = arr.slice(startElement, endElement + 1);
  const displacedElement = arr[endElement + 1];
  const beginArray = arr.slice(0, startElement);
  const endArray = arr.slice(endElement + 2, arr.length);

  if (endElement === arr.length - 1) {
    return arr;
  }

  return([
    ...beginArray,
    displacedElement,
    ...shiftElements,
    ...endArray
  ]);
}

export function normalize(dataArray, idKey, objTranformer) {
  if (!dataArray || dataArray.length === 0) {
    return {};
  }

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

// function updateProjectNameName() {
//   return projects.mapAndFindById('shortId', '456', (project, index) => {
//
//     return Object.assign({}, project, {projectName: 'API Hack'})
//     });
// }
//
// function deleteTask(idKey, projectId, taskId) {
//   return projects.mapAndFindById(idKey, projectId, (project) => {
//     const deleteIndex = project.tasks.findIndex(task => task[idKey] === taskId);
//     const newTasks = project.tasks.sliceDelete(deleteIndex);
//
//     return Object.assign({}, project, {tasks: newTasks})
//   });
// }
