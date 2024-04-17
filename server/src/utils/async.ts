import { NextFunction, Request, RequestHandler, Response } from "express";

/** Writing a custom express handler with an async handler,
 * Inspired by : https://zellwk.com/blog/async-await-express/
 * @param callback - The handler
 * @returns Async wrapped handler
 */
export function asyncWrapper(
  callback: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction): void {
    callback(req, res, next).catch(next);
  };
}
