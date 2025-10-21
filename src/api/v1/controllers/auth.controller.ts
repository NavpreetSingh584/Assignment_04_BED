import { Request, Response, NextFunction } from "express";
import { HTTP } from "../../constants/httpConstants";
import { getUserById } from "../services/auth.service";
import { auth } from "../../../config/firebase";

export const getMe = (req: Request, res: Response) => {
  const user = (req as any).user ?? null;
  return res.status(HTTP.OK).json({ user });
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUserById(req.params.uid);
    res.json({
      uid: user.uid,
      email: user.email,
      claims: user.customClaims ?? {},
    });
  } catch (err) {
    next(err);
  }
};

export const setUserRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid, role } = req.body;

    // Validation
    if (!uid || !role) {
      return res.status(HTTP.BAD_REQUEST).json({ error: "UID and role are required" });
    }

    // Apply custom claim
    await auth.setCustomUserClaims(uid, { role });

    return res
      .status(HTTP.OK)
      .json({ message: `Role '${role}' successfully assigned to UID ${uid}` });
  } catch (err) {
    next(err);
  }
};


export const getUserInfo = getMe;
