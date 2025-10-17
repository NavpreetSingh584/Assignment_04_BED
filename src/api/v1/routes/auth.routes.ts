import { Router } from 'express';
import { getMe, getUser} from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/me', authenticate, getMe);
router.get("/users/:uid", getUser);
export default router;
