const express = require('express');
const path = require('path');
const bodyParser=require('body-parser');
const adminRouter= require('./routes/admin');
const shopRouter = require('./routes/shop');
const db = require('./util/database');
const notFoundController=require('./controllers/404');

const app=express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')))

app.use('/admin',adminRouter);
app.use(shopRouter);


app.use(notFoundController.notFound)
app.listen(process.env.PORT || 3000);