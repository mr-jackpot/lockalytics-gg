import { createRouter } from 'next-connect';
import passport from 'passport';
import {passportMiddlewares, sessionMiddleware} from "@/lib/middleware";
import '../../../../lib/passportConfig'

const router = createRouter();

router.use(sessionMiddleware);
passportMiddlewares.forEach((mw) => router.use(mw));

router.get((req, res, next) => {
    passport.authenticate('steam', (err, user) => {
        if (err) return next(err);
        if (!user) return res.redirect('/');

        req.logIn(user, (err) => {
            if (err) return next(err);
            // Redirect to dashboard after successful login
            return res.redirect('/profile');
        });
    })(req, res, next);
});

export default router.handler();
