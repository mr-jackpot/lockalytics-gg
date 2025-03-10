import { createRouter } from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import { sessionMiddleware, passportMiddlewares } from '../../../lib/middleware';
import '../../../lib/passportConfig';

interface NextApiRequestWithLogout extends NextApiRequest {
    user?: any;
    logout: (callback: (err?: any) => void) => void;
}

const router = createRouter<NextApiRequestWithLogout, NextApiResponse>();

router.use(sessionMiddleware);
passportMiddlewares.forEach((mw) => router.use(mw));

router.get((req, res, next) => {
    // Call passport's logout method
    req.logout((err) => {
        if (err) {
            console.error('Logout error:', err);
            return next(err);
        }
        // Destroy the session after logging out
        req.session.destroy((err) => {
            if (err) {
                console.error('Session destroy error:', err);
                return next(err);
            }
            res.redirect('/');
        });
    });
});

export default router.handler();
