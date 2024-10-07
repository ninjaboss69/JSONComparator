const { diffJSON } = require("./index");

const obj1 = {
  person: {
    name: "Ninjaboss",
    age: 23,
    address: {
      city: "New York",
      zip: "10001",
      street: "123 Main St",
    },
    contacts: [
      {
        type: "email",
        value: "john@example.com",
      },
      {
        type: "phone",
        value: "123-456-7890",
      },
    ],
  },
};

const obj2 = {
  person: {
    name: "Gabby",
    age: 24,
    height: "5' 9''",
    address: {
      city: "Yangon",
      zip: "10005",
      street: "123 Main St",
    },
    contacts: [
      {
        type: "email",
        value: "laminoak286@gmail.com",
      },
    ],
  },
  newKey: "newValue",
  newNestedKey: {
    newNestedKey1: "nested key 1",
    newNestedKey2: "nested key 2",
  },
};
const result = diffJSON(obj1, obj2);

console.dir(result, { depth: null });
