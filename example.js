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
    agb: 24,
    height: "5' 9''",
    address: {
      city: "San Franscio",
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
  another_person: {
    name: "John",
    agb: 25,
    height: "5' 10''",
    address: {
      city: "San Franscio",
      zip: "10005",
      street: "123 Main St",
    },
    contacts: [
      {
        type: "email",
        value: "john@gmail.com",
      },
    ],
  },
};
const result = diffJSON(obj1, obj2);

console.dir(result, { depth: null });
