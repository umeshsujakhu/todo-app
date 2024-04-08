import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err: any) {
      const customError = err.errors.map((err: any) => {
        return {
          path: err.path[1],
          message: err.message,
        };
      });

      return res
        .status(400)
        .json({ success: false, data: null, errors: customError });
    }
  };

export default validate;
