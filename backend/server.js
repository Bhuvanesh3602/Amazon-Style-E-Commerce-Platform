const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Simple checkout route
app.post('/api/orders', async (req, res) => {
  try {
    const Product = require('./models/Product');
    const { items } = req.body;
    
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

// Simple analytics route
app.get('/api/analytics', (req, res) => {
  const analytics = {
    topProducts: [
      { _id: '1', name: 'Burger', sold: 45, price: 12, category: 'Food' },
      { _id: '2', name: 'Pizza', sold: 30, price: 18, category: 'Food' },
      { _id: '3', name: 'Book', sold: 15, price: 25, category: 'Books' },
      { _id: '4', name: 'Laptop', sold: 12, price: 1299, category: 'Electronics' },
      { _id: '5', name: 'Bat', sold: 8, price: 89, category: 'Sports' }
    ],
    categoryStats: [
      { _id: 'Food', totalSold: 150, totalRevenue: 2500, productCount: 4 },
      { _id: 'Electronics', totalSold: 45, totalRevenue: 15000, productCount: 2 },
      { _id: 'Books', totalSold: 80, totalRevenue: 1800, productCount: 3 }
    ],
    overallStats: {
      totalProducts: 10,
      totalOrders: 125,
      totalRevenue: 25000
    },
    lowStockProducts: [
      { _id: '1', name: 'Plant', stock: 8, category: 'Home & Garden' },
      { _id: '2', name: 'Car', stock: 5, category: 'Automotive' }
    ]
  };
  
  res.json(analytics);
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});