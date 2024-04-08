import { TypeOf, object, string, boolean } from "zod";

export const todoSchema = object({
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    completed: boolean({
      required_error: "Completed field is required",
    }),
  }),
});

export const updateTodoSchema = object({
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    completed: boolean({
      required_error: "Completed field is required",
    }),
  }),
  params: object({
    id: string({
      required_error: "ID is required",
    }),
  }),
});

export const updateTodoStatusSchema = object({
  body: object({
    completed: boolean({
      required_error: "Completed field is required",
    }),
  }),
  params: object({
    id: string({
      required_error: "ID is required",
    }),
  }),
});

export const paramIdTodoSchema = object({
  params: object({
    id: string({
      required_error: "ID is required",
    }),
  }),
});

export type CreateTodoSchema = TypeOf<typeof todoSchema>;
export type UpdateTodoSchema = TypeOf<typeof updateTodoSchema>;
export type ParamIdTodoSchema = TypeOf<typeof paramIdTodoSchema>;
export type UpdateTodoStatusSchema = TypeOf<typeof updateTodoStatusSchema>;
