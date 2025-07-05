import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx?.switchToHttp()?.getRequest();
    if (!request.user) {
      throw new UnauthorizedException(
        'User is not authorized to take this action',
      );
    }
    return request.user;
  },
);

export type RequestUser = {
  userId: number;
};
