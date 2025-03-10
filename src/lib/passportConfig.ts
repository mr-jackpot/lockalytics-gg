import passport from 'passport';
import SteamStrategy from 'passport-steam';

// Set up Passport serialization/deserialization
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Configure the Steam strategy
passport.use(
    new SteamStrategy(
        {
            returnURL: process.env.STEAM_RETURN_URL || 'http://localhost:3000/api/auth/steam/return',
            realm: process.env.STEAM_REALM || 'http://localhost:3000/',
            apiKey: process.env.STEAM_API_KEY!,
        },
        (identifier, profile, done) => {
            // Process the Steam profile if needed, then return the user object
            done(null, profile);
        }
    )
);
