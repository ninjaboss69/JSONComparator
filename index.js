const OBJECT_TYPE = "object";

// NKC ---> nested key connector
// KC ---> key connector

const NKC = "#";

const KC = "/";

const valueArray = [];

const activityLogArray = [];

let globalStorage = "";

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
          activityLogArray.push(
            `Value ${getValueFromKeys(
              nestedArray,
              0,
              scannedObject
            )} is deleted where key is ${nestedArray}`
          );
        } else if (reversing === true)
          activityLogArray.push(
            `Value ${getValueFromKeys(
              nestedArray,
              0,
              scannedObject
            )} is added where key is ${nestedArray}`
          );
        break;
      }

      if (
        reversing === undefined &&
        consumerObject !== undefined &&
        parallelObject !== undefined &&
        typeof consumerObject !== OBJECT_TYPE &&
        typeof parallelObject !== OBJECT_TYPE &&
        !Array.isArray(consumerObject) &&
        !Array.isArray(parallelObject) &&
        consumerObject !== parallelObject
      ) {
        activityLogArray.push(
          `from ${consumerObject} to ${
            parallelObject === "" ? "empty string" : parallelObject
          } where key is ${nestedArray}`
        );
      }
    }
    valueArray.push(consumerObject);
  }
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
  scanObject(oldObject);
  readScannedObject(globalStorage, oldObject, newObject);
  scanObject(newObject);
  readScannedObject(globalStorage, newObject, oldObject, true);
  console.log(activityLogArray);
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
  test1: "kaungminkhant",

  fav: 1,

  arr: ["a", "b", "efg"],

  arrobj: [{ 1: 1, 2: 34532342 }],

  newObj: [{ abc: "def", hijklmn: "opqrstuvewxyz" }],
};

compareTwoObject(obj1, obj2);
