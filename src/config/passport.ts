import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";

import { UserHandler } from "../models/User";

const LocalStrategy = passportLocal.Strategy;
const handler = new UserHandler();

passport.serializeUser<any, any>((user, done) => {
    done(undefined, user.username);
});

passport.deserializeUser((username: string, done) => {
    handler.get(username, (err, user) => {
        done(err, user);
    })
});

passport.use(new LocalStrategy({ usernameField: "username" }, (username, password, done) => {
    handler.get(username, (err, user: any) => {
        if (err) return done(err);
        if (!user) {
            return done(undefined, false, { message: `Username ${username} not found.` });
        }
        console.log(password);
        user.comparePassword(password, (err: Error, isMatch: boolean) => {
            if (err) return done(err);
            console.log(isMatch);
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, { message: "Invalid username or password." });
        });
    });
}));

export const isAuthenticated = (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
