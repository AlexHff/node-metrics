import passport from "passport";
import passportLocal from "passport-local";

import { UserHandler } from "../models/User";

const LocalStrategy = passportLocal.Strategy;
const handler = new UserHandler();

passport.serializeUser<any, any>((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username: string, done) => {
    handler.get(username, (err, user) => {
        done(err, user);
    });
});

passport.use(new LocalStrategy({ usernameField: "username" }, (username, password, done) => {
    handler.get(username, (err, user: any) => {
        if (err) return done(err);
        if (!user) {
            return done(null, false, { message: "Username does not exist." });
        }
        user.comparePassword(password, (err: Error, isMatch: boolean) => {
            if (err) { return done(err); }
            if (isMatch) {
                return done(null, user, { message: "Sucess." });
            }
            return done(null, false, { message: "Invalid email or password." });
        });
    });
}));

export const isAuthenticated = (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
