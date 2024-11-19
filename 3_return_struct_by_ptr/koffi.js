const koffi = require("koffi");

const lib = koffi.load("./target/release/libsample_ffi.dylib");

const MyStruct = koffi.struct("MyStruct", {
  x: "int32",
  y: "int32",
});

const struct_return_by_ptr = lib.func(
  "struct_return_by_ptr",
  koffi.pointer(MyStruct),
  []
);

console.log(koffi.introspect(MyStruct));
{
  const data = koffi.decode(struct_return_by_ptr(), MyStruct);

  // correct
  console.log(data);
}

console.log(koffi.stats());
