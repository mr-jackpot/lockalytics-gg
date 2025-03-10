// pages/api/auth/session.ts
import { createRouter } from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import {passportMiddlewares, sessionMiddleware} from "@/lib/middleware";

interface NextApiRequestWithUser extends NextApiRequest {
    user?: any;
}

const router = createRouter<NextApiRequestWithUser, NextApiResponse>();

router.use(sessionMiddleware);
passportMiddlewares.forEach((mw) => router.use(mw));

router.get((req, res) => {
    res.status(200).json({ user: req.user || null });
});

export default router.handler();
