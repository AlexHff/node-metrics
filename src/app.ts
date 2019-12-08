import express from "express";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "../public")))

app.set("port", process.env.PORT || 8000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.get("/", (req: any, res: any) => {
  res.write('Hello world');
  res.end();
})

app.get("/hello/:name", (req: any, res: any) => {
  res.render("hello.ejs", {name: req.params.name});
});

export default app;

