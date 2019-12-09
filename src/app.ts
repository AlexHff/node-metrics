import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import * as indexController from "./controllers/index";
import * as userController from "./controllers/user";

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.use(expressLayouts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("port", process.env.PORT || 8000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.get("/", indexController.index);
app.get("/login", userController.getLogin);

export default app;
