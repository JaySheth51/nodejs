const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars');

const app = express();

//For handlebars template enginge
// app.engine('handlebars', expressHbs({
//   layoutsDir: 'views/layouts/',
//   defaultLayout: 'main-layout',
//   extname: 'handlebars'
// }));
// app.set('view engine', 'handlebars');

app.set('view engine', 'ejs');

app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRouter = require('./routes/shop');
const rootDir = require('./utils/path');
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRouter);

app.use(errorController.get404);

app.listen(3000);