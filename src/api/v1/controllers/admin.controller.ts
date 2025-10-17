// External Imports

import { Request, Response } from "express";

// Internal Imports

import { setCustomUserClaims } from "../services/auth.service";

// Controller: Set Role

export const setRole = async (req: Request, res: Response) => {
    const { uid, role } = req.body as { uid: string; role: string };

    if (!uid || !role) {
        return res.status(400).json({ message: "uid and role are required" });
    }

    await setCustomUserClaims(uid, { role });

    res.json({ message: `Role '${role}' set for user ${uid}` });
};
