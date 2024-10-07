// This package only considers array and object(key value) and ignore functions and all other cases

const isArray = (val) => Array.isArray(val);

const isObject = (val) => typeof val === "object";

const powerCheck = (reversing, alpha, beta) =>
  reversing === undefined &&
  alpha !== undefined &&
  beta !== undefined &&
  typeof alpha !== "object" &&
  typeof beta !== "object" &&
  !Array.isArray(alpha) &&
  !Array.isArray(beta) &&
  alpha !== beta;

const valueFromKeys = (keys, index, current) => {
  if (isObject(current) || isArray(current))
    return valueFromKeys(keys, index + 1, current[keys[index]]);
  return current;
};

const traverse = (current, parent, keyStorage, map) => {
  if (isArray(current)) {
    current.map((ele, i) => {
      let np = "";
      if (parent) np = parent + "->" + i;
      else np = i;
      traverse(ele, np, keyStorage, map);
    });
  }
  if (isObject(current) && !isArray(current)) {
    Object.keys(current).map((key) => {
      let np = "";
      if (parent) np = parent + "->" + key;
      else np = key;
      traverse(current[key], np, keyStorage, map);
    });
  }

  // skipping main object's parent being undefined

  if (!isObject(current) && parent) {
    keyStorage.push(parent);
    map.set(parent, current);
  }
  return keyStorage;
};

// comparing from left side
const leftCompare = (
  keyStorage,
  fastMap,
  currentObject,
  referenceObject,
  reversing,
  logs
) => {
  keyStorage.map((key) => {
    const splitKeys = key.split("->");
    const referenceValue = valueFromKeys(splitKeys, 0, referenceObject);

    if (fastMap.get(key) && !referenceValue)
      if (reversing === undefined)
        logs.push({
          delete: {
            key: `${splitKeys.join("->")}`,
            value: `${fastMap.get(key)}`,
          },
        });
      else if (reversing === true)
        logs.push({
          add: {
            key: `${splitKeys.join("->")}`,
            value: `${valueFromKeys(splitKeys, 0, currentObject)}`,
          },
        });

    if (powerCheck(reversing, fastMap.get(key), referenceValue))
      logs.push({
        change: {
          key: `${splitKeys.join("->")}`,
          from: `${fastMap.get(key)}`,
          to: `${valueFromKeys(splitKeys, 0, referenceObject)}`,
        },
      });
  });
};

const diffJSON = (oldObject, newObject) => {
  const logs = [];
  const oldKeyStorage = [];
  const newKeyStorage = [];
  const oldFastMap = new Map();
  const newFastMap = new Map();

  traverse(oldObject, undefined, oldKeyStorage, oldFastMap);
  leftCompare(oldKeyStorage, oldFastMap, oldObject, newObject, undefined, logs);
  traverse(newObject, undefined, newKeyStorage, newFastMap);
  leftCompare(newKeyStorage, newFastMap, newObject, oldObject, true, logs);

  const returnedValue = {
    logs,
    oldObjectKeys: oldKeyStorage,
    newObjectKeys: newKeyStorage,
    oldFastMap: Object.fromEntries(oldFastMap),
    newFastMap: Object.fromEntries(newFastMap),
  };
  return returnedValue;
};

exports.diffJSON = diffJSON;
