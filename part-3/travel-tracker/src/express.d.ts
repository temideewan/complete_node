declare module 'express' {
  interface Request {
    user?: { userId: number };
  }
}
