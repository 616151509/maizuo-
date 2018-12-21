var express = require('express');
var app = express();
var filmRouter = require('./routes/film.js');
var userRouter = require('./routes/user.js');
var detail = require('./routes/detail.js');
var cinema = require('./routes/cinema.js');
var city = require('./routes/city.js');

app.use('/api/film',filmRouter);
app.use('/api/user',userRouter);
app.use('/api/detail',detail);
app.use('/api/cinema',cinema);
app.use('/api/city',city);

app.listen(3000);

console.log('服务启动成功');
