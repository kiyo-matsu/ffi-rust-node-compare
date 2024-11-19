const ffi = require("ffi-napi");
const ref = require("ref-napi");
const StructType = require("ref-struct-di")(ref);

const MyStruct = StructType({
  x: ref.types.int32,
  y: ref.types.int32,
});
const MyStructPtr = ref.refType(MyStruct);

console.log(MyStruct, MyStructPtr);

const lib = ffi.Library("./target/release/libsample_ffi.dylib", {
  struct_return_by_ptr: [MyStructPtr, []],
});

const result = lib.struct_return_by_ptr();

// not work
console.log(result.x, result.y);
