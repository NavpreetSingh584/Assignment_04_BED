import { Request, Response } from 'express';
import { HTTP } from '../../constants/httpConstants';

export const getMe = (req: Request, res: Response) => {

  // populated by auth middleware
  const user = (req as any).user ?? null;
  return res.status(HTTP.OK).json({ user });
};
