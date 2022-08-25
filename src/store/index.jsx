import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./reducers/todosSlice";

// Store: tạo hkho để lưu trữ giữ liệu của cta ở đây

const store = configureStore({
    reducer: {
        todosReducer: todosReducer,
    },
});

export default store;
