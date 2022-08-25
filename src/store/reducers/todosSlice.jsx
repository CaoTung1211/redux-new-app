import { createSlice, nanoid } from "@reduxjs/toolkit";
import * as axios from "axios";

/**
 * đầu tiên đặt ra 1 hăng hay còn gọi là cái kho todosSlice = createSlice(trong này cta sẽ truyền 1 cái object)
 * trong object chứa cái name: là tên của action
 * và initialStates chứa tất cả công việc của cta
 */
const todosSlice = createSlice({
    name: "todos",
    initialState: {
        allTodos: [],
    },
    reducers: {
        addTodo: {
            reducer(state, action) {
                state.allTodos.push(action.payload);
            },
            prepare(title) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        completed: false,
                    },
                };
            },
        },
        markCompleted(state, action) {
            const todoId = action.payload;
            state.allTodos = state.allTodos.map((todo) => {
                if (todo.id === todoId) {
                    todo.completed = !todo.completed;
                }
                return todo;
            });
        },
        deleteTodo(state, action) {
            const deleteId = action.payload;
            state.allTodos = state.allTodos.filter(
                (todo) => todo.id !== deleteId
            );
        },
        todosFetched(state, action) {
            state.allTodos = action.payload;
        },
    },
});
// console.log(todosSlice);

/** Create reducer , bởi vì với mỗi 1 state thì có 1 reducer chịu
 * trách nhiệm thay đổi state
 */

// async action creator, action and reducer dispatch
export const getTodos = () => {
    const getTodosAsync = async (dispatch) => {
        try {
            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/todos?_limit=5"
            );
            dispatch(todosFetched(response.data));
            // console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    return getTodosAsync;
};
//reducer
const todosReducer = todosSlice.reducer;
// selector
export const todosSelector = (state) =>
    state.todosReducer.allTodos; /** todosReducer import in index*/
// console.log(todosSelector);
// action export
export const { addTodo, markCompleted, deleteTodo, todosFetched } =
    todosSlice.actions;

// export
export default todosReducer;
