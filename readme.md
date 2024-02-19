### Tired of comparing two javascript object by eyes, or you just want to know what's changes when a new object about to overrides the old one. Use this. You don't have to worry about identical keys or not. Just compare two objects in simplest way.

You can install the package with npm

```

npm i diff-nested-json

```

Then you can use diffJSON right away.

```

const {diffJSON} = require("diff-nested-json)

```

### OR

You can start by copying index.js whole file.


### Example Usage 

```

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



```

##### Then

```

 diffJSON(obj1,obj2)

```

### Example Output

if we output the result,

```
{
  "oldObjectKeys": [
    "test1",
    "fav",
    "arr#0",
    "arr#1",
    "arr#2",
    "arrobj#0#1",
    "arrobj#0#2",
    "arrobj#1#2",
    "arrobj#1#4"
  ],
  "newObjectKeys": [
    "test1",
    "fav",
    "arr#0",
    "arr#1",
    "arr#2",
    "arrobj#0#1",
    "arrobj#0#2",
    "newObj#0#abc",
    "newObj#0#hijklmn"
  ],
  "activityLog": [
    {
      "change": {
        "key": "test1",
        "from": "awh1",
        "to": "kaungminkhant"
      }
    },
    {
      "change": {
        "key": "arr,2",
        "from": "c",
        "to": "efg"
      }
    },
    {
      "change": {
        "key": "arrobj,0,2",
        "from": "2",
        "to": "34532342"
      }
    },
    {
      "delete": {
        "key": "arrobj,1,2",
        "value": "1"
      }
    },
    {
      "delete": {
        "key": "arrobj,1,4",
        "value": "2"
      }
    },
    {
      "add": {
        "key": "newObj,0,abc",
        "value": "def"
      }
    },
    {
      "add": {
        "key": "newObj,0,hijklmn",
        "value": "opqrstuvewxyz"
      }
    }
  ]
}
```

##### You can generate a minifed version if you want, which can save some space. If you are using webpack or other module bundlers, they will be minifed the package automatically.

`Inspired by react reconciliation algorithm,
 object with key is not index sensitive but array will be.;`

Contributions, issues, and feature requests are welcome!