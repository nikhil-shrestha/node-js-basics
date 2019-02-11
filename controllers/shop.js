const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "My Shop",
        path: "/"
      });
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "My Shop",
        path: "/products"
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll({ where: { id: prodId } })
  //   .then(product => {
  //     console.log(product);
  //     res.render("shop/product-details", {
  //       product: product[0],
  //       pageTitle: product[0].title,
  //       path: "/products"
  //     });
  //   })
  //   .catch(err => console.log(err));
  Product.findById(prodId)
    .then(product => {
      console.log(product);
      res.render("shop/product-details", {
        product: product,
        pageTitle: product.title,
        path: "/products"
      });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        pageTitle: "My Cart",
        path: "/cart",
        products: cartProducts
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("[Product Id]", prodId);
  Product.findById(prodId, product => {
    console.log("[Price]", product);
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout"
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "My Shop",
    path: "/orders"
  });
};
