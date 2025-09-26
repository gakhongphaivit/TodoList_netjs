// src/auth/jwt-payload.interface.ts

/**
 * Đây là cấu trúc dữ liệu bạn encode vào JWT.
 * JwtAuthGuard sẽ decode token và gắn vào req.user
 */
export interface JwtPayload {
  sub: string;      // userId (hoặc ObjectId nếu bạn dùng MongoDB)
  email?: string;   // email của user (nếu bạn đưa vào token)
  role?: string;    // quyền (admin, user, ...)
  iat?: number;     // issued at (tự động có nếu bạn dùng jwt.sign)
  exp?: number;     // expiration (tự động có nếu bạn set expiresIn)
}
