const koffi = require("koffi");
const { promisify } = require("util");

const lib = koffi.load("./target/release/libsample_ffi.dylib");

const MyStruct = koffi.struct("MyStruct", {
  x: "int32",
  y: "int32",
});

const Polygon = koffi.struct("Polygon", {
  triangle: koffi.array(MyStruct, 3, "Array"),
});

const get_polygon = promisify(lib.func("get_polygon", Polygon, []).async);

console.log(koffi.introspect(Polygon));

const run = async () => {
  console.log(await get_polygon());
};

run().then(console.log);
