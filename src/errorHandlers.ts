import express from 'express';
import HttpException from './exceptions';

export const error404 = (req: express.Request, res: any, next: express.NextFunction) => res
  .status(404)
  .json({
    message: 'Not Found',
    error: {},
  });

export default (development: boolean) => {
  if (development) {
    return (err: HttpException, req: express.Request, res: express.Response) => res
      .status(err.status || 500)
      .json({
        message: err.message,
        error: err,
      });
  } else {
    return (err: HttpException, req: express.Request, res: express.Response) => res
      .status(err.status || 500)
      .json({
        message: err.message,
        error: {},
      });
  }
};
