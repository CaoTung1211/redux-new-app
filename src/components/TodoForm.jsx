import React, { useState } from "react";
import { addTodo } from "../store/reducers/todosSlice";
import { useDispatch } from "react-redux";

const TodoForm = () => {
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();
    const ChangeTitle = (e) => {
        setTitle(e.target.value);
    };
    const addSingleTodo = (e) => {
        e.preventDefault();
        setTitle("");
        console.log(title);
        dispatch(addTodo(title));
    };

    return (
        <div>
            <form onSubmit={addSingleTodo}>
                <input value={title} type="text" onChange={ChangeTitle} />
                <input type="submit" value="Add" />
            </form>
        </div>
    );
};

export default TodoForm;
