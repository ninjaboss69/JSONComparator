// NKC ---> nested key connector
// KC ---> key connector

const OBJECT_TYPE = "object";

const NKC = "#";

const KC = "/";

let valueArray = [];

let activityLogArray = [];

let oldObjectKeys = [];

let newObjectKeys = [];

let globalStorage = "";

let res = [];

const recursivelyScanObject = (aValue, parent) => {
  if (typeof aValue === OBJECT_TYPE) {
    // if a value is an object, it can be nested-json or array, ignoring all other cases

    if (!Array.isArray(aValue)) {
      // recursive this object

      Object.keys(aValue).map((key) => {
        let current = "";
        if (parent) current = parent + NKC + key;
        else current = key;
        recursivelyScanObject(aValue[key], current);
      });
    }

    if (Array.isArray(aValue)) {
      aValue.map((ele, i) => {
        let current = "";
        if (parent) current = parent + NKC + i;
        else current = i;
        recursivelyScanObject(ele, current);
      });
    }
  } else {
    if (parent) globalStorage += parent + KC;
  }
};

const getValueFromKeys = (keysArray, index, obj) => {
  if (typeof obj === OBJECT_TYPE || Array.isArray(obj)) {
    return getValueFromKeys(keysArray, index + 1, obj[keysArray[index]]);
  }
  return obj;
};

const readObject = (key, obj) => {
  return obj[key];
};

const process = (
  manipulatedString,
  scannedObject,
  paralleledObject,
  reversing
) => {
  const keysArray = manipulatedString.split(KC);

  for (let i = 0; i < keysArray.length; i++) {
    const nestedArray = keysArray[i].split(NKC);

    let consumerObject = scannedObject;

    // parallelObject is the one to compare aka new value

    let parallelObject = paralleledObject;

    for (let j = 0; j < nestedArray.length; j++) {
      if (nestedArray[j].length === 0) return;
      const key = nestedArray[j];
      consumerObject = readObject(key, consumerObject);
      if (parallelObject !== undefined)
        parallelObject = readObject(key, parallelObject);

      if (consumerObject && parallelObject === undefined) {
        if (reversing === undefined) {
          activityLogArray.push({
            delete: {
              key: `${nestedArray}`,
              value: `${getValueFromKeys(nestedArray, 0, scannedObject)}`,
            },
          });
        } else if (reversing === true)
          activityLogArray.push({
            add: {
              key: `${nestedArray}`,
              value: `${getValueFromKeys(nestedArray, 0, scannedObject)}`,
            },
          });

        break;
      }

      if (isPlainValue(reversing, consumerObject, parallelObject))
        activityLogArray.push({
          change: {
            key: `${nestedArray}`,
            from: `${consumerObject}`,
            to: `${parallelObject}`,
          },
        });
    }
    valueArray.push(consumerObject);
  }
};

const isPlainValue = (reversing, consumerObject, parallelObject) => {
  return (
    reversing === undefined &&
    consumerObject !== undefined &&
    parallelObject !== undefined &&
    typeof consumerObject !== OBJECT_TYPE &&
    typeof parallelObject !== OBJECT_TYPE &&
    !Array.isArray(consumerObject) &&
    !Array.isArray(parallelObject) &&
    consumerObject !== parallelObject
  );
};

const scanObject = (aValue) => {
  globalStorage = "";
  recursivelyScanObject(aValue);
};
const readScannedObject = (
  manipulatedString,
  scannedObject,
  paralleledObject,
  reversing
) => {
  process(manipulatedString, scannedObject, paralleledObject, reversing);
};

const compareTwoObject = (oldObject, newObject) => {
  const returnedObject = {};
  scanObject(oldObject);
  oldObjectKeys = globalStorage.split(KC);
  readScannedObject(globalStorage, oldObject, newObject);
  scanObject(newObject);
  newObjectKeys = globalStorage.split(KC);
  readScannedObject(globalStorage, newObject, oldObject, true);

  returnedObject.oldObjectKeys = oldObjectKeys;
  returnedObject.newObjectKeys = newObjectKeys;
  returnedObject.activityLog = activityLogArray;

  // reset all data : mandatory
  valueArray = [];

  activityLogArray = [];

  oldObjectKeys = [];

  newObjectKeys = [];

  globalStorage = "";

  res = [];

  return returnedObject;
};

const obj1 = {
  test1: "awh1",
  fav: 1,
  arr: ["a", "b", "c"],
  arrobj: [
    { 1: 1, 2: 2 },
    { 2: 1, 4: 2 },
  ],
};

const obj2 = {
  test1: "kaungmin khant",

  fav: 2,

  arr: ["a", "b", "efg"],

  arrobj: [{ 1: 1, 2: 34532342 }],

  newObj: [{ abc: "def", hijklmn: "opqrstuvewxyz" }],
};
console.log(compareTwoObject(obj1, obj2));
