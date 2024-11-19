use std::ffi::{c_char, CString};

#[repr(C)]
#[derive(Debug)]
pub struct MyStruct {
    pub x: i32,
    pub y: i32,
}

#[repr(C)]
#[derive(Debug)]
pub struct Polygon {
    pub triangle: [MyStruct; 3],
}

#[no_mangle]
/// # Safety
pub unsafe extern "C" fn string_return() -> *const c_char {
    let s = "Hello from Rust!";
    let c_str = CString::new(s).unwrap();
    c_str.into_raw()
}

#[no_mangle]
pub extern "C" fn struct_return_by_val() -> MyStruct {
    MyStruct { x: 1, y: 2 }
}

#[no_mangle]
/// # Safety
pub unsafe extern "C" fn struct_return_by_ptr() -> *const MyStruct {
    let s = Box::new(MyStruct { x: 3, y: 4 });
    Box::into_raw(s)
}

#[no_mangle]
/// # Safety
pub unsafe extern "C" fn array_struct_return_by_val_val() -> *const MyStruct {
    let arr = vec![MyStruct { x: 5, y: 6 }, MyStruct { x: 7, y: 8 }];
    let arr = arr.into_boxed_slice();
    let arr_ptr = Box::into_raw(arr);
    arr_ptr as *const MyStruct
}

#[no_mangle]
pub extern "C" fn get_polygon() -> Polygon {
    Polygon {
        triangle: [
            MyStruct { x: 1, y: 2 },
            MyStruct { x: 3, y: 4 },
            MyStruct { x: 5, y: 6 },
        ],
    }
}
