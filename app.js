const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRouter = require('./routes/shop');
const errorController = require('./controllers/error');
const sequelize = require('./utils/database');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRouter);

app.use(errorController.get404);

sequelize.sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => console.log(err)); //sync() to create table in the database



//For handlebars template engine
// const expressHbs = require('express-handlebars');

// app.engine('handlebars', expressHbs({
//   layoutsDir: 'views/layouts/',
//   defaultLayout: 'main-layout',
//   extname: 'handlebars'
// }));
// app.set('view engine', 'handlebars');