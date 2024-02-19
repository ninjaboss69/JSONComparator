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
  supportingObject,
  reversing
) => {
  const keysArray = manipulatedString.split(KC);

  for (let i = 0; i < keysArray.length; i++) {
    const nestedArray = keysArray[i].split(NKC);

    let consumerObject = scannedObject;

    // parallelObject is the one to compare aka new value

    let cloneSupporting = supportingObject;

    for (let j = 0; j < nestedArray.length; j++) {
      if (nestedArray[j].length === 0) return;
      const key = nestedArray[j];
      consumerObject = readObject(key, consumerObject);
      if (cloneSupporting !== undefined)
      cloneSupporting = readObject(key, cloneSupporting);

      if (consumerObject && cloneSupporting === undefined) {
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

      if (isPlainValue(reversing, consumerObject, cloneSupporting))
        activityLogArray.push({
          change: {
            key: `${nestedArray}`,
            from: `${consumerObject}`,
            to: `${cloneSupporting}`,
          },
        });
    }
    valueArray.push(consumerObject);
  }
};

const isPlainValue = (reversing, consumerObject, cloneSupporting) => {
  return (
    reversing === undefined &&
    consumerObject !== undefined &&
    cloneSupporting !== undefined &&
    typeof consumerObject !== OBJECT_TYPE &&
    typeof cloneSupporting !== OBJECT_TYPE &&
    !Array.isArray(consumerObject) &&
    !Array.isArray(cloneSupporting) &&
    consumerObject !== cloneSupporting
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

const diffJSON = (oldObject, newObject) => {
  const returnedObject = {};
  scanObject(oldObject);
  const nko = globalStorage.split(KC);
  nko.pop();
  oldObjectKeys =nko;
  readScannedObject(globalStorage, oldObject, newObject);
  scanObject(newObject);
  const oko=globalStorage.split(KC);
  oko.pop();
  newObjectKeys = oko;
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




exports.diffJSON = diffJSON;