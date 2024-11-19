const koffi = require("koffi");

const lib = koffi.load("./target/release/libsample_ffi.dylib");

const string_return = lib.func("string_return", "str", []);

console.log(string_return());
