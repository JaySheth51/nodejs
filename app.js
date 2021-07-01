const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
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

const adminData = require('./routes/admin');
const shopRouter = require('./routes/shop');
const rootDir = require('./utils/path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRouter);

app.use((req,res, next) => {
  res.status(404).render('404', { pageTitle: 'Not found' });
});

app.listen(3000);