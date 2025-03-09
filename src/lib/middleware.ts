import session from 'express-session';
import passport from 'passport';

export const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
});

export const passportMiddlewares = [passport.initialize(), passport.session()];
