const { open, define, DataType } = require("ffi-rs");

open({
  library: "libsample_ffi",
  path: "./target/release/libsample_ffi.dylib",
});

const MyStruct = {
  x: DataType.I32,
  y: DataType.I32,
};

const lib = define({
  struct_return_by_ptr: {
    library: "libsample_ffi",
    retType: MyStruct,
    paramsType: [],
  },
});

console.log(lib.struct_return_by_ptr());
