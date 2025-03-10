import { createRouter } from 'next-connect';
import passport from 'passport';
import {passportMiddlewares, sessionMiddleware} from "@/lib/middleware";
import '../../../../lib/passportConfig'

const router = createRouter();

router.use(sessionMiddleware);
passportMiddlewares.forEach((mw) => router.use(mw));

// Initiate the Steam authentication process
router.get((req, res, next) => {
    passport.authenticate('steam')(req, res, next);
});

export default router.handler();
