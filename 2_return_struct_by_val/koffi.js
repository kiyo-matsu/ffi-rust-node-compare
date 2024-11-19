const koffi = require("koffi");

const lib = koffi.load("./target/release/libsample_ffi.dylib");

const MyStrut = koffi.struct("MyStruct", {
  x: "int32",
  y: "int32",
});

const struct_return_by_val = lib.func("struct_return_by_val", MyStrut, []);

console.log(koffi.introspect(MyStrut));

// correct
console.log(struct_return_by_val());
