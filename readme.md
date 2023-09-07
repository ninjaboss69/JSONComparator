### Tired of comparing two `JSON` object by eyes, or you just want to know what's changes when a new object about to overrides the old one. Use this. You don't have to worry about same property or not. Just compare two objects in simplest way.

You can start by copying index.js whole file.

1. Put two objects you want to compare within `compareTwoObject()`.
2. You can get `activityLogArray` to see what's going on.

By configuring `scanObject()` or `readScannedObject()` ,you can get all keys from the object or values from the object.

You can also configure custom array instead of connecting with `#` or `/`.

### Example Output

```
[
"from awh1 to kaungminkhant where key is test1",
"from c to efg where key is arr,2",
"from 2 to 34532342 where key is arrobj,0,2",
"Value 1 is deleted where key is arrobj,1,2",
"Value 2 is deleted where key is arrobj,1,4",
"Value def is added where key is newObj,0,abc",
"Value opqrstuvewxyz is added where key is newObj,0,hijklmn"
]
```

Contributions, issues, and feature requests are welcome!
