let express=require('express');
let path = require('path');

let adminRouter= require('./routes/admin');
let shopRouter = require('./routes/shop');
let notFoundController=require('./controllers/404')

let bodyParser=require('body-parser');

let app=express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')))

app.use('/admin',adminRouter);
app.use(shopRouter);


app.use(notFoundController.notFound)
app.listen(3000);