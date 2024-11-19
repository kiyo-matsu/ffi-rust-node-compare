const koffi = require("koffi");

const lib = koffi.load("./target/release/libsample_ffi.dylib");

const MyStruct = koffi.struct("MyStruct", {
  x: "int32",
  y: "int32",
});

const MyStructArray = koffi.array(MyStruct, 2, "Array");

const array_struct_return_by_val_val = lib.func(
  "array_struct_return_by_val_val",
  koffi.pointer(MyStructArray),
  []
);

console.log(koffi.introspect(MyStructArray));

const ptr = array_struct_return_by_val_val();

const data = koffi.decode(ptr, MyStructArray);

// correct
console.log(ptr, data);
