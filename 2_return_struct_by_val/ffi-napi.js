const ffi = require("ffi-napi");
const ref = require("ref-napi");
const StructType = require("ref-struct-di")(ref);

const MyStruct = StructType({
  x: ref.types.int32,
  y: ref.types.int32,
});

const lib = ffi.Library("./target/release/libsample_ffi.dylib", {
  struct_return_by_val: [MyStruct, []],
});

const result = lib.struct_return_by_val();

console.log(result.x, result.y);
