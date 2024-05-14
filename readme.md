### Tired of comparing two javascript object by eyes, or you just want to know what's changes when a new object about to overrides the old one. Use this. You don't have to worry about identical keys or not. Just compare two objects in simplest way.

You can install the package with npm

```

npm i diff-nested-json

```

Then you can use diffJSON right away.

```

const {diffJSON} = require("diff-nested-json")

```

### OR

You can start by copying index.js whole file.

### OR

If you clone this repo, you can check with

```

node example.js

```

### Example Usage

```

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


```

##### Then

```

const res = diffJSON(obj1,obj2)

```

### Example Output

if we output the res,

```
{
  oldObjectKeys: [
    'person#name',
    'person#age',
    'person#address#city',
    'person#address#zip',
    'person#address#street',
    'person#contacts#0#type',
    'person#contacts#0#value',
    'person#contacts#1#type',
    'person#contacts#1#value'
  ],
  newObjectKeys: [
    'person#name',
    'person#agb',
    'person#height',
    'person#address#city',
    'person#address#zip',
    'person#address#street',
    'person#contacts#0#type',
    'person#contacts#0#value',
    'another_person#name',
    'another_person#agb',
    'another_person#height',
    'another_person#address#city',
    'another_person#address#zip',
    'another_person#address#street',
    'another_person#contacts#0#type',
    'another_person#contacts#0#value'
  ],
  activityLog: [
    { change: { key: 'person->name', from: 'Ninjaboss', to: 'Gabby' } },
    { delete: { key: 'person->age', value: '23' } },
    {
      change: {
        key: 'person->address->city',
        from: 'New York',
        to: 'San Franscio'
      }
    },
    {
      change: { key: 'person->address->zip', from: '10001', to: '10005' }
    },
    {
      change: {
        key: 'person->contacts->0->value',
        from: 'john@example.com',
        to: 'laminoak286@gmail.com'
      }
    },
    { delete: { key: 'person->contacts->1->type', value: 'phone' } },
    {
      delete: { key: 'person->contacts->1->value', value: '123-456-7890' }
    },
    { add: { key: 'person->agb', value: '24' } },
    { add: { key: 'person->height', value: "5' 9''" } },
    { add: { key: 'another_person->name', value: 'John' } },
    { add: { key: 'another_person->agb', value: '25' } },
    { add: { key: 'another_person->height', value: "5' 10''" } },
    {
      add: { key: 'another_person->address->city', value: 'San Franscio' }
    },
    { add: { key: 'another_person->address->zip', value: '10005' } },
    {
      add: { key: 'another_person->address->street', value: '123 Main St' }
    },
    {
      add: { key: 'another_person->contacts->0->type', value: 'email' }
    },
    {
      add: {
        key: 'another_person->contacts->0->value',
        value: 'john@gmail.com'
      }
    }
  ]
}

```

Note : When it comes to array, the package will compare with index side by side.

##### You can generate a minified version if you want, which can save some space. If you are using webpack or other bundlers, they will be minifed the package automatically.

`Inspired by react reconciliation algorithm,
 object with key is not index sensitive but array will be.;`

Contributions, issues, and feature requests are welcome!
