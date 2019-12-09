import passport from "passport";
import { IVerifyOptions } from "passport-local";
import { User } from "../models/User";

export const getLogin = (req: any, res: any) => {
    if (req.user) {
        return res.redirect("/");
    }
    res.render("login");
};

export const postLogin = async (req: any, res: any, next: any) => {
    passport.authenticate("local", (err: Error, user: User, info: IVerifyOptions) => {
        if (err) { return next(err); }
        if (!user) {
            return res.redirect("/login");
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            res.redirect(req.session.returnTo || "/");
        });
    })(req, res, next);
};

export const getProfile = (req: any, res: any) => {
    res.render("user/profile");
};
