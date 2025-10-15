import { Router } from 'express';
import loansRoutes from './loans.routes';
import claimsRoutes from './claims.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use
        ('/loans', loansRoutes
);

router.use
        ('/claims', claimsRoutes
);

router.use
        ('/auth', authRoutes
 );

export default router;
