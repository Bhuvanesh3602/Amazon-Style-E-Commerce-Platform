const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// Get analytics data (admin only)
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Get 5 random products with sales data
    const products = await Product.find().limit(5);
    
    // Generate random analytics data
    const topProducts = products.map(product => ({
      _id: product._id,
      name: product.name,
      sold: Math.floor(Math.random() * 100) + 10,
      price: product.price,
      category: product.category
    }));

    // Generate category stats
    const categoryStats = [
      { _id: 'Food', totalSold: 150, totalRevenue: 2500, productCount: 4 },
      { _id: 'Electronics', totalSold: 45, totalRevenue: 15000, productCount: 2 },
      { _id: 'Books', totalSold: 80, totalRevenue: 1800, productCount: 3 },
      { _id: 'Sports', totalSold: 25, totalRevenue: 2200, productCount: 2 },
      { _id: 'Automotive', totalSold: 12, totalRevenue: 25000, productCount: 2 }
    ];

    // Overall stats
    const overallStats = {
      totalProducts: await Product.countDocuments(),
      totalOrders: Math.floor(Math.random() * 200) + 50,
      totalRevenue: Math.floor(Math.random() * 50000) + 10000
    };

    // Low stock products
    const lowStockProducts = await Product.find({ stock: { $lt: 20 } })
      .select('name stock category')
      .limit(5);

    res.json({
      topProducts,
      categoryStats,
      overallStats,
      lowStockProducts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;