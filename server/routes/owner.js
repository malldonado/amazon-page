const router = require('express').Router();
const Owner = require('../models/Owner');

//post api
router.post('/owners', async (req, res) => {
  try {
    let owner = new Owner();
    owner.name = req.body.name;
    owner.about = req.body.about;
    await owner.save();

    res.status(200).json({
      success: true,
      message: 'Owner added successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

//get api
router.get('/owners', async (req, res) => {
  try {
    let owners = await Owner.find();
    res.status(200).json({
      owners: owners
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
