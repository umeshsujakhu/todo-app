import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  listTodo,
  updateTodo,
  updateTodoStatus,
} from "../controllers/TodoController";
import validate from "../middleware/validate";
import {
  todoSchema,
  updateTodoSchema,
  updateTodoStatusSchema,
} from "../schema/TodoSchema";

const router = Router();

router.post("/", validate(todoSchema), createTodo);
router.get("/", listTodo);
router.put("/:id", validate(updateTodoSchema), updateTodo);
router.patch("/:id/status", validate(updateTodoStatusSchema), updateTodoStatus);
router.delete("/:id", deleteTodo);

export default router;
