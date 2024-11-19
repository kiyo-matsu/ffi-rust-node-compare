const ffi = require("ffi-napi");

const lib = ffi.Library("./target/release/libsample_ffi.dylib", {
  string_return: ["string", []],
});

console.log(lib.string_return());
