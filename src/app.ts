import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import passport from "passport";
import levelSession from "level-session-store";
import session from "express-session";

import * as indexController from "./controllers/index";
import * as userController from "./controllers/user";

import * as passportConfig from "./config/passport";
import { UserHandler, User } from "./models/User";

dotenv.config();

const app = express();
const levelStore = levelSession(session);

app.use(express.static(path.join(__dirname, "../public")));
app.use(expressLayouts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "secret",
    store: new levelStore("./db/sessions")
}));
app.use(passport.initialize());
app.use(passport.session());

app.set("port", process.env.PORT || 8000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.get("/", indexController.index);
app.get("/login", userController.getLogin);
app.post("/login", userController.postLogin);
app.get("/user", passportConfig.isAuthenticated, userController.getProfile);

app.get("/test", (req: any, res: any) => {
    const handler = new UserHandler();
    handler.save(new User("bob", "bob@google.com", "1234"), (err: Error | null) => {
        if (err) throw err
    });
    handler.get("bob", (err, user: any) => {
        if (err) throw err;
        console.log(user);
    });
    handler.get("friedrich", (err, user: any) => {
        if (err) throw err;
        console.log(user);
    });
    res.end();
});

export default app;
