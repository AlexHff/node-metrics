import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import passport from "passport";
import levelSession from "level-session-store";
import session from "express-session";
import flash from "express-flash";

// Routes methods
import * as indexController from "./controllers/index";
import * as userController from "./controllers/user";
import * as metricController from "./controllers/metric";

// Passport
import * as passportConfig from "./config/passport";
import { Metric, MetricHandler } from "./models/Metric";

dotenv.config();

const app = express();
const levelStore = levelSession(session);

//app.use(express.static(path.join(__dirname, "../public")));
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
app.use(flash());

app.set("port", process.env.PORT || 8081);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.get("/", indexController.index);
app.get("/login", userController.getLogin);
app.post("/login", userController.postLogin);
app.get("/logout", userController.logout);
app.get("/signup", userController.getSignup);
app.post("/signup", userController.postSignup);
app.get("/user", passportConfig.isAuthenticated, userController.getProfile);
app.get("/metric", passportConfig.isAuthenticated, metricController.getAllMetrics);
app.get("/metric/:id", passportConfig.isAuthenticated, metricController.getMetric);
app.get("/new", passportConfig.isAuthenticated, metricController.getNewMetric);
app.post("/new", passportConfig.isAuthenticated, metricController.postNewMetric);
app.post("/update", passportConfig.isAuthenticated, metricController.postUpdateMetric);
app.post("/delete", passportConfig.isAuthenticated, metricController.postDeleteMetric);

app.get("/test", (req: any, res: any) => {
    const handler = new MetricHandler();
    handler.save(new Metric(0, 1, req.user.username), (err: Error | null) => {
        if (err) throw err;
    });
    handler.get(req.user.username, "1576007372", (err, metric: any) => {
        if (err) throw err;
    });
    res.end();
});

export default app;
