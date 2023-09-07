const OBJECT_TYPE = "object";

// NKC ---> nested key connector
// KC ---> key connector

const NKC = "#";

const KC = "/";

const oldObject = {
  _id: "64b2e4aec61e9114262bcd28",
  SNCode: "SN20",
  Position: {
    lat: 16.7792355,
    lng: 96.154282681,
  },
  Splitter: [
    {
      _id: "64db047e85a1a099e370f6d0",
      name: "SPL0alsdjlajfldajldjaldfla1",
      OltId: "64d488775c879926260b3962",
      ServiceCardId: "64d488775c879926260b3961",
      ServicePort: 2,
      Ports: {
        count: 90,
        list: [
          {
            id: 1,
            isAvailable: true,
          },
          {
            id: 2,
            isAvailable: true,
          },
          {
            id: 3,
            isAvailable: true,
          },
          {
            id: 4,
            isAvailable: true,
          },
        ],
      },
      DnId: "",
      DnSplitterName: "",
      DnSplitterPort: 0,
      PreviousNodeId: "64d488775c879926260b3962",
      PreviousNodeType: "OLT",
      PreviousInterfaceId: "64d488775c879926260b3961",
      PreviousPortId: 1,
      NodeCode: "EMPTY-OLT02/2/1-EMPTY-SN01-SPL01",
    },
    {
      _id: "64db047e85a1a099e370f6d1",
      name: "SPL02",
      OltId: "",
      ServiceCard: "",
      ServicePort: 0,
      Ports: {
        count: 4,
        list: [
          {
            id: 1,
            isAvailable: true,
          },
          {
            id: 2,
            isAvailable: true,
          },
          {
            id: 3,
            isAvailable: true,
          },
          {
            id: 4,
            isAvailable: true,
          },
        ],
      },
      DnId: "64dafdf445a5a1bbc32158c4",
      DnSplitterId: "64dafdf445a5a1bbc32158c2",
      DnSplitterPort: 2,
      PreviousNodeId: "64dafdf445a5a1bbc32158c4",
      PreviousNodeType: "DN",
      PreviousInterfaceId: "64dafdf445a5a1bbc32158c2",
      PreviousPortId: 1,
      NodeCode: "AHL-Z1-EMPTY-DN01-EMPTY-SN01-SPL02",
    },
  ],
  TownshipId: "63f7345dd020e95dbc0ede3c",
  ZoneName: "Zone 1",
  NodeCode: "AHL-Z1-DN01-EMPTY-SN01",
};

const newObject = {
  _id: "64b2e4aec61e911426",
  SNCode: "SN21",
  Position: {
    lat: 16.99999,
    lng: 96.99,
  },
  Splitter: [
    {
      _id: "64db047e85a1a099e370f6d0",
      name: "asjfdlajflsdjlajf",
      OltId: "",
      ServiceCardId: "",
      ServicePort: 2,
      Ports: {
        count: 4,
        list: [
          {
            id: 1,
            isAvailable: true,
          },
        ],
      },
      DnId: "",
      DnSplitterName: "",
      DnSplitterPort: 0,
      PreviousNodeId: "64d488775c879926260b3962",
      PreviousNodeType: "OLT",
      PreviousInterfaceId: "64d488775c879926260b3961",
      PreviousPortId: 1,
      NodeCode: "EMPTY-OLT02/2/1-EMPTY-SN01-SPL01",
    },
  ],
  TownshipId: "",
  ZoneName: "Zone 1",
  NodeCode: "AHL-Z1-DN01-EMPTY-SN01",
};

// const testObject1 = {
//   _id: "1235",
//   Position: {
//     lat: 12,
//     lng: {
//       abc: "hello-123",
//       def: "kitty",
//       nested: {
//         arr: [
//           {
//             name: "my name is suzie",
//             age: "19",
//           },
//           {
//             name: "dreak",
//             age: "22",
//           },
//           [
//             {
//               nested1: "testing1",
//               nested1_1: "testing2",
//               array: [1, 2],
//             },
//           ],
//         ],
//       },
//       neted1: { lmn: "opqrs", tuv: "rstu" },
//     },
//   },
//   arr: [
//     {
//       isAvailable: true,
//       id: 1,
//     },
//     {
//       isAvailable: false,
//       id: 2,
//     },
//   ],
// };

// const testObject = {
//   _id: "123",
//   Position: {
//     lat: 12,
//     lng: {
//       abc: "hello",
//       def: "kitty",
//       nested: {
//         arr: [
//           {
//             name: "suzie",
//             age: "19",
//           },
//           {
//             name: "dreak",
//             age: "22",
//           },
//           [
//             {
//               nested1: "testing1",
//               nested1_1: "testing2",
//               array: [1, 2],
//             },
//           ],
//         ],
//       },
//       neted1: { lmn: "opggggqrs", tuv: "rstuabcdefg" },
//     },
//   },
//   arr: [
//     {
//       isAvailable: true,
//       id: 1,
//     },
//     {
//       isAvailable: false,
//       id: 2,
//     },
//   ],
// };

const valueArray = [];

const activityLogArray = [];

let globalStorage = "";

const recursivelyScanObject = (aValue, parent) => {
  if (typeof aValue === OBJECT_TYPE) {
    // if a value is an object, it can be json or array, ignoring all other cases

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
    // if not so, we just printed it out
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
  // test1: "awh1",
  // fav: 1,
  // arr: ["a", "b", "c"],
  // arrobj: [
  //   { 1: 1, 2: 2 },
  //   { 2: 1, 4: 2 },
  // ],
};
const obj2 = {
  test1: "kaungminkhant",

  fav: 1,

  arr: ["a", "b", "efg"],

  arrobj: [{ 1: 1, 2: 34532342 }],

  newObj: [{ abc: "def", hijklmn: "opqrstuvewxyz" }],
};

compareTwoObject(obj1, obj2);
