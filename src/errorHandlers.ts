import express from 'express'
// import createError from 'http-errors'
import HttpException from './exceptions'

// export const error404 = (req: express.Request, res: any, next: express.NextFunction) => next(createError(404));
export const error404 = (req: express.Request, res: any, next: express.NextFunction) => res
  .status(404)
  .json({
    message: 'Not Found',
    error: {},
  });

export default (err: HttpException, req: express.Request, res: express.Response) => res
  .status(err.status || 500)
  .json({
    message: err.message,
    error: (req.app.get('env') === 'development')
      ? err
      : undefined,
  });
