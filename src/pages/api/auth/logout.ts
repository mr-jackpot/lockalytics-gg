import { createRouter } from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import { sessionMiddleware, passportMiddlewares } from '../../../lib/middleware';

const router = createRouter<NextApiRequest, NextApiResponse>();

// Use the same session and passport middlewares
router.use(sessionMiddleware);
passportMiddlewares.forEach((mw) => router.use(mw));

router.get((req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        // Optionally destroy the session to clear all session data
        req.session.destroy((err) => {
            if (err) return next(err);
            // Redirect back to the homepage after logout
            res.redirect('/');
        });
    });
});

export default router.handler();
