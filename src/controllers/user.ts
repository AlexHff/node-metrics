import passport from "passport";
import { User, UserHandler } from "../models/User";

const handler = new UserHandler();

/**
 * GET /login
 * Log in
 * @param req 
 * @param res 
 */
export const getLogin = (req: any, res: any) => {
    if (req.user) {
        return res.redirect("/");
    }
    res.render("login", {
        user: req.user
    });
};

/**
 * POST /login
 * Log in locally
 * @param req 
 * @param res 
 * @param next 
 */
export const postLogin = async (req: any, res: any, next: any) => {
    passport.authenticate("local", (err: Error, user: User) => {
        //if (err) return next(err);
        if (err || !user) {
            return res.redirect("/login");
        }
        req.logIn(user, (err: Error) => {
            if (err) return next(err);
            res.redirect(req.session.returnTo || "/");
        });
    })(req, res, next);
};

/**
 * GET /logout
 * Log out
 * @param req 
 * @param res 
 */
export const logout = (req: any, res: any) => {
    req.logout();
    res.redirect("/");
};

/**
 * GET /signup
 * Signup page
 * @param req 
 * @param res 
 */
export const getSignup = (req: any, res: any) => {
    if (req.user) {
        return res.redirect("/");
    }
    
    res.render("signup", {
        user: req.user
    });
};

/**
 * POST /signup
 * Create new account
 * @param req 
 * @param res 
 * @param next 
 */
export const postSignup = (req: any, res: any, next: any) => {
    const user = new User(req.body.username, req.body.email, req.body.password);
    handler.get(user.username, (err, exists) => {
        if (err) res.redirect("/"); 
        if (exists) {
            req.flash("errors", { msg: "User already exists." });
            return res.redirect("/signup");
        }
        handler.save(user, (err) => {
            if (err) return next(err);
            req.logIn(user, (err: Error) => {
                if (err) return next(err);
            });
        });
    });
};

/**
 * GET /user
 * User profile
 * @param req 
 * @param res 
 */
export const getProfile = (req: any, res: any) => {
    res.render("user/profile", {
        user: req.user
    });
};
