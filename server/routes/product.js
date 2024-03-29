const router = require('express').Router();
const Product = require('../models/product');
const upload = require('../middlewares/upload-photo');

// post request - create a new product
router.post('/products', upload.single('photo'), async (req, res) => {
  try {
    let product = new Product();
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = req.body.photo;
    product.stockQuantity = req.body.stockQuantity;

    await product.save();

    res.json({
      status: true,
      message: 'Product created successfully'
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// get request - get all products
router.get('/products', async (req, res) => {
  try {
    let products = await Product.find();
    res.json({
      success: true,
      products: products
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// get request - get a single product
router.get('/products/:id', async (req, res) => {
  try {
    let product = await Product.findOne({
      _id: req.params.id
    });
    res.json({
      success: true,
      product: product
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// put request - put a single product
router.put('/products/:id', upload.single('photo'), async (req, res) => {
  try {
    let product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    //update informations product
    {
      $set: {
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        photo: req.body.photo,
        stockQuantity: req.body.stockQuantity,
        description: req.body.description,
        owner: req.body.owner
      }
    },
    { upsert: true }
    );
    res.json({
      success: true,
      product: product
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// delete request - delete a single product
router.delete('/products/:id', async (req, res) => {
  try {
    let deletedProduct = await Product.findOneAndDelete({ _id: req.params.id });
    if(deletedProduct) {
      res.json({
        status: true,
        message: 'Product deleted successfully'
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
