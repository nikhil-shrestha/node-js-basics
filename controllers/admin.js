const mongodb = require('mongodb')
const Product = require("../models/product");

const ObjectId = mongodb.ObjectID;

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  console.log(req.body);
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price, description, imageUrl, null);

  product
    .save()
    .then(result => {
      // console.log(result);
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }

  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, price, description, imageUrl, prodId);

  product
    .save()
    .then(result => {
      // console.log(result);
      console.log("Updated Product");
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log(err);
    });

  // Product.findById(prodId)
  //   .then(product => {
  //     product.title = title;
  //     product.imageUrl = imageUrl;
  //     product.price = price;
  //     product.description = description;
  //     return product.save();
  //   })
  //   .then(result => {
  //     console.log("Updated Product!!!");
  //     res.redirect("/admin/products");
  //   })
  //   .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Add Product",
        path: "/admin/products"
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  console.log(req.body);
  const prodId = req.body.productId;

  Product.findById(prodId)
    .then(product => {
      return product.destroy();
    })
    .then(result => {
      console.log("Destroy Product");
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log(err);
    });
};
