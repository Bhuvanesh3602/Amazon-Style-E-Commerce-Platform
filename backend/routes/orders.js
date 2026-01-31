const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// Simple checkout - reduce stock
router.post('/', auth, async (req, res) => {
  try {
    const { items } = req.body;
    
    // Update stock for each item
    for (let item of items) {
      const product = await Product.findById(item.product);
      if (product && product.stock >= item.quantity) {
        product.stock -= item.quantity;
        product.sold = (product.sold || 0) + item.quantity;
        await product.save();
      }
    }

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;