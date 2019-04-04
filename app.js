const express = require("express");
const bodyParser = require('body-parser');
const jsonParser = express.json();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views','./views');
app.set('view engine','pug');

app.use(express.static('assets'));

//Подключаем файл с роутами:
require('./routes/routes')(app,    );///2-й аргумент надо?

let port = process.env.PORT || 3010;
app.listen(port, function() {
  console.log(`Server running on port: ${port}`);
});