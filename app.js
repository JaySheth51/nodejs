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
const Product = require('./models/Product');
const User = require('./models/User');
const Cart = require('./models/Cart');
const CartItem = require('./models/cart-item');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => console.log(error));
});

app.use('/admin', adminRoutes);
app.use(shopRouter);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });  //one to many relationship
Product.belongsToMany(Cart, { through: CartItem }); //many to many relationship

sequelize
  // .sync({ force: true })
  .sync()
    .then(result => {
      return User.findByPk(1);
    })
    .then((user) => {
      if(!user) {
        return User.create({ name: 'Jay', email: 'test@gmail.com'});
      }
      return user;
    })
    .then((user) => {
      // console.log(user);
      return user.createCart()
    })
    .then((cart) => {
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