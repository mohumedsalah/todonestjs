import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token =
      req.body.authorization ||
      req.query.authorization ||
      req.headers.authorization ||
      String(req.headers.referer).split('authorization=')[1];

    if (token) {
      try {
        const decoded = jwt.verify(token, 'find Med');
        req.body.user = decoded;
        return next();
      } catch (err) {
        return res
          .status(401)
          .json({ success: false, message: 'Failed to authenticate token.' });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: 'No token provided.'
      });
    }
  }
}
