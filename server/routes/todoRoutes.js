import { Router } from "express";
import { completeTodo, createTodo, deleteTodo, getAllTodos, updateTodo } from "../controllers/todoController.js";

const router = Router();

router.route("/createTodo").post(createTodo);

router.route("/getAllTodos").get(getAllTodos);

router.route("/updateTodo/:id").put(updateTodo);

router.route("/completeTodo/:id").post(completeTodo);

router.route("/deleteTodo/:id").delete(deleteTodo);

export default router;