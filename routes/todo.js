import { Router } from "express";
import TodoController from "../controllers/todo.js";

const todoRouter = Router();

todoRouter.get("/",TodoController.getTodos);
todoRouter.get("/search",TodoController.getTodoById);
todoRouter.post("/create",TodoController.createTodo);
todoRouter.put("/update/:id",TodoController.updateTodo)
todoRouter.delete("/delete/:id",TodoController.deleteTodo)

export default todoRouter;
