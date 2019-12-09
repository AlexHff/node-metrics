import level from "level";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

var dbPath = process.env.DB_PATH;
var options = {
    keyEncoding: "binary",
    valueEncoding: "json"
};
var db = level(dbPath, options);

export default db;

