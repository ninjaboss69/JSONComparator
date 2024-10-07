const { diffJSON } = require("./index");

describe("diffJSON", () => {
  it("should return the correct diff result for two objects", () => {
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

    const expectedResult = {
      logs: [
        { change: { key: "person->name", from: "Ninjaboss", to: "Gabby" } },
        { change: { key: "person->age", from: "23", to: "24" } },
        {
          change: {
            key: "person->address->city",
            from: "New York",
            to: "Yangon",
          },
        },
        {
          change: { key: "person->address->zip", from: "10001", to: "10005" },
        },
        {
          change: {
            key: "person->contacts->0->value",
            from: "john@example.com",
            to: "laminoak286@gmail.com",
          },
        },
        { delete: { key: "person->contacts->1->type", value: "phone" } },
        {
          delete: { key: "person->contacts->1->value", value: "123-456-7890" },
        },
        { add: { key: "person->height", value: "5' 9''" } },
        { add: { key: "newKey", value: "newValue" } },
        {
          add: { key: "newNestedKey->newNestedKey1", value: "nested key 1" },
        },
        {
          add: { key: "newNestedKey->newNestedKey2", value: "nested key 2" },
        },
      ],
      oldObjectKeys: [
        "person->name",
        "person->age",
        "person->address->city",
        "person->address->zip",
        "person->address->street",
        "person->contacts->0->type",
        "person->contacts->0->value",
        "person->contacts->1->type",
        "person->contacts->1->value",
      ],
      newObjectKeys: [
        "person->name",
        "person->age",
        "person->height",
        "person->address->city",
        "person->address->zip",
        "person->address->street",
        "person->contacts->0->type",
        "person->contacts->0->value",
        "newKey",
        "newNestedKey->newNestedKey1",
        "newNestedKey->newNestedKey2",
      ],
      oldFastMap: {
        "person->name": "Ninjaboss",
        "person->age": 23,
        "person->address->city": "New York",
        "person->address->zip": "10001",
        "person->address->street": "123 Main St",
        "person->contacts->0->type": "email",
        "person->contacts->0->value": "john@example.com",
        "person->contacts->1->type": "phone",
        "person->contacts->1->value": "123-456-7890",
      },
      newFastMap: {
        "person->name": "Gabby",
        "person->age": 24,
        "person->height": "5' 9''",
        "person->address->city": "Yangon",
        "person->address->zip": "10005",
        "person->address->street": "123 Main St",
        "person->contacts->0->type": "email",
        "person->contacts->0->value": "laminoak286@gmail.com",
        newKey: "newValue",
        "newNestedKey->newNestedKey1": "nested key 1",
        "newNestedKey->newNestedKey2": "nested key 2",
      },
    };

    const result = diffJSON(obj1, obj2);

    expect(result).toEqual(expectedResult);
  });
});
