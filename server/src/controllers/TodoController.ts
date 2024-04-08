import { Request, Response, NextFunction } from "express";
import Todo, { ITodo } from "../model/Todo";
import { errorResponse, successResponse } from "../utils/response";
import { StatusCodes } from "http-status-codes";
import {
  CreateTodoSchema,
  UpdateTodoSchema,
  UpdateTodoStatusSchema,
} from "../schema/TodoSchema";

export const createTodo = async (
  req: Request<unknown, unknown, CreateTodoSchema["body"]>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const todo: ITodo = new Todo(req.body);
    await todo.save();
    successResponse({
      res,
      statusCode: StatusCodes.OK,
      message: "Todo created successfully",
      data: todo.toJSON(),
    });
  } catch (error) {
    errorResponse({
      res,
      statusCode: StatusCodes.BAD_REQUEST,
      message: error.message || "An error occurred while updating the todo",
    });
  }
};

export const updateTodo = async (
  req: Request<UpdateTodoSchema["params"], unknown, UpdateTodoSchema["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const { title, completed } = req.body;

    const updateFields: Partial<ITodo> = {};

    if (title) updateFields.title = title;
    if (completed !== undefined) updateFields.completed = completed;

    const updatedTodo = await Todo.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    // Check if the todo with given id exists
    if (!updatedTodo) {
      return errorResponse({
        res,
        statusCode: StatusCodes.NOT_FOUND,
        message: "Todo not found",
      });
    }

    successResponse({
      res,
      statusCode: StatusCodes.OK,
      message: "Todo updated successfully",
      data: updatedTodo.toJSON(),
    });
  } catch (error) {
    errorResponse({
      res,
      statusCode: StatusCodes.BAD_REQUEST,
      message: error.message || "An error occurred while updating the todo",
    });
  }
};

export const listTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos: ITodo[] = await Todo.find();

    successResponse({
      res,
      statusCode: StatusCodes.OK,
      message: "Todo listed successfully",
      data: todos,
    });
  } catch (error) {
    errorResponse({
      res,
      statusCode: StatusCodes.BAD_REQUEST,
      message: error.message || "An error occurred while fetching the todos",
    });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleteTodo = await Todo.findByIdAndDelete(req.params.id);

    // Check if the todo with given id exists
    if (!deleteTodo) {
      return errorResponse({
        res,
        statusCode: StatusCodes.NOT_FOUND,
        message: "Todo not found",
      });
    }

    successResponse({
      res,
      statusCode: StatusCodes.OK,
      message: "Todo deleted successfully",
      data: null,
    });
  } catch (error) {
    errorResponse({
      res,
      statusCode: StatusCodes.BAD_REQUEST,
      message: error.message || "An error occurred while deleting the todo",
    });
  }
};

export const updateTodoStatus = async (
  req: Request<
    UpdateTodoStatusSchema["params"],
    unknown,
    UpdateTodoStatusSchema["body"]
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { completed } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed },
      { new: true }
    );

    // Check if the todo with given id exists
    if (!updatedTodo) {
      return errorResponse({
        res,
        statusCode: StatusCodes.NOT_FOUND,
        message: "Todo not found",
      });
    }

    successResponse({
      res,
      statusCode: StatusCodes.OK,
      message: "Todo status updated successfully",
      data: updatedTodo.toJSON(),
    });
  } catch (error) {
    errorResponse({
      res,
      statusCode: StatusCodes.BAD_REQUEST,
      message:
        error.message || "An error occurred while updating the todo status",
    });
  }
};
