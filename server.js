const express = require('express');
const res = require('express/lib/response');
const app = express();

const PORT = 3000;
console.log("this is working!!!!")


// middleware
app.use(express.urlencoded({ extended: false }));

// db
const products = require('./models/products');

// product index route


app.get('/products', (req, res) => {
  res.send(products);
});

app.get('/products/new', (req, res) => {
  res.render("create.ejs");
});

// const context = {products: allProducts};
// res.render()

// app.get('/products', (req, res) => {
//   res.send(products);
// });


// app.get('/products/new/car', (req, res) => {
//   res.render("create.ejs");
// });




// product show route
app.get('/products/:id', (req, res) => {
  res.send(products[req.params.id]);
});

// product create route
app.post('/products', (req, res) => {
  console.log('CREATE route accessed');
  console.log('Data within req.body: ', req.body);
  products.push(req.body);
  res.redirect('/products');
});


app.listen(PORT, () => {
  console.log("App is running on port: ", PORT);
});


