const OBJECT_TYPE = "object",
  NKC = "#",
  KC = "/",
  valueArray = [],
  activityLogArray = [];
let globalStorage = "";
const recursivelyScanObject = (e, r) => {
    "object" == typeof e
      ? (Array.isArray(e) ||
          Object.keys(e).map((a) => {
            let t = "";
            (t = r ? r + "#" + a : a), recursivelyScanObject(e[a], t);
          }),
        Array.isArray(e) &&
          e.map((e, a) => {
            let t = "";
            recursivelyScanObject(e, (t = r ? r + "#" + a : a));
          }))
      : r && (globalStorage += r + KC);
  },
  getValueFromKeys = (e, r, a) =>
    "object" == typeof a || Array.isArray(a)
      ? getValueFromKeys(e, r + 1, a[e[r]])
      : a,
  readObject = (e, r) => r[e],
  process = (e, r, a, t) => {
    const o = e.split(KC);
    for (let e = 0; e < o.length; e++) {
      const c = o[e].split("#");
      let s = r,
        y = a;
      for (let e = 0; e < c.length; e++) {
        if (0 === c[e].length) return;
        const a = c[e];
        if (
          ((s = readObject(a, s)),
          void 0 !== y && (y = readObject(a, y)),
          s && void 0 === y)
        ) {
          void 0 === t
            ? activityLogArray.push(
                `Value ${getValueFromKeys(
                  c,
                  0,
                  r
                )} is deleted where key is ${c}`
              )
            : !0 === t &&
              activityLogArray.push(
                `Value ${getValueFromKeys(c, 0, r)} is added where key is ${c}`
              );
          break;
        }
        void 0 !== t ||
          void 0 === s ||
          void 0 === y ||
          "object" == typeof s ||
          "object" == typeof y ||
          Array.isArray(s) ||
          Array.isArray(y) ||
          s === y ||
          activityLogArray.push(
            `from ${s} to ${"" === y ? "empty string" : y} where key is ${c}`
          );
      }
      valueArray.push(s);
    }
  },
  scanObject = (e) => {
    (globalStorage = ""), recursivelyScanObject(e);
  },
  readScannedObject = (e, r, a, t) => {
    process(e, r, a, t);
  },
  compareTwoObject = (e, r) => {
    scanObject(e),
      readScannedObject(globalStorage, e, r),
      scanObject(r),
      readScannedObject(globalStorage, r, e, !0),
      console.log(activityLogArray);
  },
  obj1 = {
    test1: "awh1",
    fav: 1,
    arr: ["a", "b", "c"],
    arrobj: [
      { 1: 1, 2: 2 },
      { 2: 1, 4: 2 },
    ],
  },
  obj2 = {
    test1: "kaungminkhant",
    fav: 1,
    arr: ["a", "b", "efg"],
    arrobj: [{ 1: 1, 2: 34532342 }],
    newObj: [{ abc: "def", hijklmn: "opqrstuvewxyz" }],
  };
compareTwoObject(obj1, obj2);
