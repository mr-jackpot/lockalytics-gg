import { createRouter } from 'next-connect';
import passport from 'passport';
import SteamStrategy from 'passport-steam';
import {passportMiddlewares, sessionMiddleware} from "@/lib/middleware";

// Configure Passport
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(
    new SteamStrategy(
        {
            returnURL: 'http://localhost:3000/api/auth/steam/return',
            realm: 'http://localhost:3000/',
            apiKey: process.env.STEAM_API_KEY!,
        },
        (identifier, profile, done) => {
            // Process the Steam profile here and pass the user object
            return done(null, profile);
        }
    )
);

const router = createRouter();

router.use(sessionMiddleware);
passportMiddlewares.forEach((mw) => router.use(mw));

// Initiate the Steam authentication process
router.get((req, res, next) => {
    passport.authenticate('steam')(req, res, next);
});

export default router.handler();
