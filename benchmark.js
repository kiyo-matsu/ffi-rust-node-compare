const { Suite } = require("bench-node");

const suite = new Suite();
{
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

  suite.add("ffi-rs", () => {
    lib.struct_return_by_ptr();
  });
}

{
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

  suite.add("koffi", () => {
    koffi.decode(struct_return_by_ptr(), MyStruct);
  });
}

suite.run();
