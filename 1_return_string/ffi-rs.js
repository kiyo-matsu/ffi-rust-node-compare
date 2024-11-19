const { open, define, DataType } = require("ffi-rs");

open({
  library: "libsample_ffi",
  path: "./target/release/libsample_ffi.dylib",
});

const lib = define({
  string_return: {
    library: "libsample_ffi",
    retType: DataType.String,
    paramsType: [],
  },
});

console.log(lib.string_return());
