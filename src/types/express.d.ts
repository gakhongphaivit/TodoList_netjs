import type { JwtPayload } from '../auth/jwt-payload.interface';
declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload; // user được JwtAuthGuard gắn vào request
  }
}
