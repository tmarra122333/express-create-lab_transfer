const express = require('express');
const res = require('express/lib/response');
const app = express();
const products = require('./models/products.js');

const PORT = 3000;
console.log("this is working!!!!")


// middleware
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.use((req, res, next)=>{
  console.log(`${req.method} ${req.originalUrl}`);
  next();
})

// product index route


// app.get('/products', (req, res) => {
//   res.render(products);
// });

app.get('/products', (req, res)=>{
  const allProducts = products.find();
  res.render('index.ejs', {products: allProducts});
});

app.get('/products/new', (req, res) => {
  res.render("create.ejs");
});

app.get('products/:productId')
// const context = {products: allProducts};
// res.render()

// app.get('/products', (req, res) => {
//   res.send(products);
// });


// app.get('/products/new/car', (req, res) => {
//   res.render("create.ejs");
// });




// product show route
app.get('/products/:productId', (req, res) => {
    products.findById(req.params.productId, (error, foundProduct) => {
        if (error) {
            console.log(error);
            req.error = error;
            return next();
        }
        /* 
        1. the first param of render() is the .ejs file 
        that we want to inject data into.
        
        2. the second param is the data that we want 
        to inject into the .ejs file (it must be an object)
        */

        /*	
        there will be a variable available inside
        the show.ejs file called product, 
        and its value the foundItem
       */
        res.render('show.ejs', {product: foundProduct});
    });
    
});
;

// res.send(products[req.params.id]);
// product create route
// app.post('/products', (req, res) => {
//   console.log('CREATE route accessed');
//   console.log('Data within req.body: ', req.body);
//   products.push(req.body);
//   res.redirect('/products');
// });

app.post('/products/', (req, res) =>{
  products.create(req.body, (error, createdProduct) =>{
      if(error) return console.log(error);

       console.log(createdProduct);
       return res.redirect('/products');
  })
});

app.listen(PORT, () => {
  console.log("App is running on port: ", PORT);
});


