import { Request, Response } from 'express';
import { HTTP } from '../../constants/httpConstants';
import { getUserById } from "../services/auth.service";

export const getMe = (req: Request, res: Response) => {

  // populated by auth middleware
  const user = (req as any).user ?? null;
  return res.status(HTTP.OK).json({ user });
};

export const getUser = async (req: Request, res: Response) => {
  const user = await getUserById(req.params.uid);
  res.json({ uid: user.uid, email: user.email, claims: user.customClaims ?? {} });
};