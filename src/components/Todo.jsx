import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    todosSelector,
    markCompleted,
    deleteTodo,
    getTodos,
} from "./../store/reducers/todosSlice";
import TodoForm from "./TodoForm";

const Todo = () => {
    const todos = useSelector(todosSelector);
    const disPatch = useDispatch();
    const toggleCompleted = (todoId) => {
        console.log(todoId);
        disPatch(markCompleted(todoId));
    };
    const deleteSingleTodo = (deleteId) => {
        console.log(deleteId);
        disPatch(deleteTodo(deleteId));
    };
    useEffect(() => {
        // chỉ cho components chạy lần đầu tiên
        // dispatch
        disPatch(getTodos());
    }, [disPatch]);
    return (
        <div className="todo-list">
            <TodoForm />
            <ul>
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className={todo.completed ? "completed" : ""}
                    >
                        {todo.title}
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={toggleCompleted.bind(this, todo.id)}
                        />
                        <button onClick={deleteSingleTodo.bind(this, todo.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;
