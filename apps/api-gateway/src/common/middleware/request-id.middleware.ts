import { v4 as uuid } from 'uuid';
import { Request, Response, NextFunction } from 'express';

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
    req['requestId'] = uuid();
    res.setHeader('X-Request-Id', req['requestId']);
    next();
}