import express = require('express');
import path = require('path');

const app = express();
const port: string = process.env.PORT || '8080';
app.use(express.static(path.join(__dirname, '/../public')));

app.set('views', __dirname + "/../views");
app.set('view engine', 'ejs');

app.get('/', (req: any, res: any) => {
  res.write('Hello world');
  res.end();
})

app.get('/hello/:name', (req: any, res: any) => {
  res.render('hello.ejs', {name: req.params.name});
});

app.listen(port, (err: Error) => {
  if (err) throw err;
  console.log(`Server is running on http://localhost:${port}`);
});

