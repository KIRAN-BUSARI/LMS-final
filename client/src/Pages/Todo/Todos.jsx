import React, { useEffect, useState } from "react";
import axiosInstance from "../../Helper/axiosInstance";
import Todo from "./Todo";
import toast from "react-hot-toast";

function Todos() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = async () => {
        try {
            const { data } = await axiosInstance.get("/todo/getAllTodos");
            // console.log(data);
            toast.success(data.message)
            setTodos(data.data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const completeTodo = async (todoId) => {
        try {
            await axiosInstance.post(`/todo/completeTodo/${todoId}`);
            setTodos(prevTodos =>
                prevTodos.map(todo =>
                    todo._id === todoId ? { ...todo, completed: true } : todo
                )
            );
        } catch (error) {
            console.error("Error completing todo:", error);
        }
    };

    const deleteTodo = async (todoId) => {
        try {
            await axiosInstance.delete(`/todo/deleteTodo/${todoId}`);
            setTodos(prevTodos =>
                prevTodos.filter(todo => todo._id !== todoId)
            );
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    // const updateTodo = async (todoId) => {
    //     try {
    //         await axiosInstance.put(`/todo/updateTodo/${todoId}`, {
    //             title,
    //             description
    //         });
    //         setTodos(prevTodos =>
    //             prevTodos.map(todo =>
    //                 todo._id === todoId ? { ...todo, title, description } : todo
    //             )
    //         );
    //     } catch (error) {
    //         console.error("Error updating todo:", error);
    //     }
    // };


    return (
        <div className="h-screen">
            <div className="w-full grid grid-cols-2">
                {todos.map((todo) => (
                    <Todo
                        key={todo._id}
                        title={todo.title}
                        description={todo.description}
                        completed={todo.completed}
                        onComplete={() => completeTodo(todo._id)}
                        onDelete={() => deleteTodo(todo._id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Todos;
