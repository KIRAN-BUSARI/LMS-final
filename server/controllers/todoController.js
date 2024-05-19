import { Todo } from "../models/todoModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import zod from "zod";

const todoSchema = zod.object({
    title: zod.string().min(1),
    description: zod.string().min(1),
});

const createTodo = asyncHandler(async (req, res) => {
    try {
        const { title, description } = req.body;

        const validation = todoSchema.safeParse(req.body);

        if (!validation.success) {
            throw new ApiError(400, validation.error.issues[0].message);
        }

        if (!title || !description) {
            throw new ApiError(400, "Title and Description Are Required");
        }

        const todoExists = await Todo.findOne({ title });

        if (todoExists) {
            throw new ApiError(400, "Todo Already Exists With The Same Title");
        }

        const todo = await Todo.create({
            title,
            description
        });

        res
            .status(200)
            .json(new ApiResponse(200, todo, "Todo Created Successfully"));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const getAllTodos = asyncHandler(async (req, res) => {
    try {
        const todos = await Todo.find();
        res
            .status(200)
            .json(new ApiResponse(200, todos, "Todos Fetched Successfully"));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const updateTodo = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const { title, description } = req.body;

        // if (!title || !description) {
        //     throw new ApiError(400, "All Fields Are Required")
        // }

        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            {
                $set: {
                    title,
                    description
                }
            },
            { new: true }
        )

        res
            .status(200)
            .json(new ApiResponse(200, updatedTodo, "Todo Updated Successfully"))

    } catch (error) {
        throw new ApiError(500, error.message)
    }
})

const completeTodo = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const completedTodo = await Todo.findByIdAndUpdate(
            id, // Corrected parameter name
            {
                $set: {
                    completed: true
                }
            },
            { new: true }
        );

        if (!completedTodo) {
            throw new ApiError(404, 'Todo not found');
        }

        res.status(200).json(new ApiResponse(200, completedTodo, "Todo Completed Successfully"));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const deleteTodo = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            throw new ApiError(404, 'Todo not found');
        }
        res.status(200).json(new ApiResponse(200, deletedTodo, "Todo Deleted Successfully"));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

export {
    createTodo,
    getAllTodos,
    updateTodo,
    completeTodo,
    deleteTodo
}