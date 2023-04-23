const router = require('express').Router();
const Category = require('../models/category');

//post request
router.post('/categories', async (req, res) => {
  try {
    const category = new Category();
    category.type = req.body.type;
    await category.save();
    res.status(200).json({
      success: true,
      message: 'Category created successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// get request
router.get('/categories', async (req, res) => {
  try {
    let categories = await Category.find();
    res.json({
      success: true,
      categories: categories
    })
  }
  catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
})

module.exports = router;
