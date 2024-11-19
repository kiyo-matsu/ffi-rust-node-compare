const koffi = require("koffi");

const lib = koffi.load("./target/release/libsample_ffi.dylib");

const MyStruct = koffi.struct("MyStruct", {
  x: "int32",
  y: "int32",
});

const Polygon = koffi.struct("Polygon", {
  triangle: koffi.array(MyStruct, 3, "Array"),
});

const get_polygon = lib.func("get_polygon", Polygon, []);

console.log(koffi.introspect(Polygon));

console.log(get_polygon());
