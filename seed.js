const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('./backend/models/User');
const Product = require('./backend/models/Product');

// Sample users data
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'user123',
    role: 'user'
  }
];

// 50 Products with stock and sold data
const products = [
  // Electronics (10 products)
  { name: 'iPhone 15 Pro', description: 'Latest iPhone with advanced features', price: 999, category: 'Electronics', image: '/public/laptop.png', stock: 25, sold: 45 },
  { name: 'Samsung Galaxy S24', description: 'Premium Android smartphone', price: 899, category: 'Electronics', image: '/public/laptop.png', stock: 30, sold: 38 },
  { name: 'MacBook Air M3', description: 'Ultra-thin laptop with M3 chip', price: 1299, category: 'Electronics', image: '/public/laptop.png', stock: 15, sold: 22 },
  { name: 'iPad Pro 12.9', description: 'Professional tablet for creators', price: 1099, category: 'Electronics', image: '/public/laptop.png', stock: 20, sold: 18 },
  { name: 'Sony WH-1000XM5', description: 'Noise-canceling headphones', price: 399, category: 'Electronics', image: '/public/laptop.png', stock: 40, sold: 55 },
  { name: 'Dell XPS 13', description: 'Premium ultrabook laptop', price: 1199, category: 'Electronics', image: '/public/laptop.png', stock: 12, sold: 15 },
  { name: 'Apple Watch Series 9', description: 'Advanced smartwatch', price: 399, category: 'Electronics', image: '/public/laptop.png', stock: 35, sold: 42 },
  { name: 'Nintendo Switch', description: 'Portable gaming console', price: 299, category: 'Electronics', image: '/public/laptop.png', stock: 50, sold: 65 },
  { name: 'AirPods Pro 2', description: 'Wireless earbuds with ANC', price: 249, category: 'Electronics', image: '/public/laptop.png', stock: 60, sold: 78 },
  { name: 'Samsung 4K TV 55"', description: 'Smart 4K television', price: 799, category: 'Electronics', image: '/public/laptop.png', stock: 8, sold: 12 },

  // Clothing (10 products)
  { name: 'Nike Air Max 270', description: 'Comfortable running shoes', price: 150, category: 'Clothing', image: '/public/burger.png', stock: 45, sold: 67 },
  { name: 'Adidas Ultraboost 22', description: 'High-performance running shoes', price: 180, category: 'Clothing', image: '/public/burger.png', stock: 38, sold: 52 },
  { name: 'Levi\'s 501 Jeans', description: 'Classic straight-fit jeans', price: 89, category: 'Clothing', image: '/public/burger.png', stock: 75, sold: 89 },
  { name: 'North Face Jacket', description: 'Waterproof outdoor jacket', price: 249, category: 'Clothing', image: '/public/burger.png', stock: 22, sold: 28 },
  { name: 'Champion Hoodie', description: 'Comfortable cotton hoodie', price: 65, category: 'Clothing', image: '/public/burger.png', stock: 55, sold: 73 },
  { name: 'Ray-Ban Sunglasses', description: 'Classic aviator sunglasses', price: 199, category: 'Clothing', image: '/public/burger.png', stock: 30, sold: 41 },
  { name: 'Converse Chuck Taylor', description: 'Classic canvas sneakers', price: 75, category: 'Clothing', image: '/public/burger.png', stock: 65, sold: 82 },
  { name: 'Under Armour T-Shirt', description: 'Athletic performance shirt', price: 35, category: 'Clothing', image: '/public/burger.png', stock: 80, sold: 95 },
  { name: 'Timberland Boots', description: 'Durable work boots', price: 189, category: 'Clothing', image: '/public/burger.png', stock: 25, sold: 33 },
  { name: 'Polo Ralph Lauren Shirt', description: 'Classic polo shirt', price: 89, category: 'Clothing', image: '/public/burger.png', stock: 40, sold: 48 },

  // Books (10 products)
  { name: 'Atomic Habits', description: 'Life-changing book about habits', price: 25, category: 'Books', image: '/public/Atomic Habits book.png', stock: 100, sold: 125 },
  { name: 'Rich Dad Poor Dad', description: 'Financial education book', price: 22, category: 'Books', image: '/public/poor dad book.png', stock: 85, sold: 98 },
  { name: 'The 7 Habits', description: 'Highly effective people guide', price: 28, category: 'Books', image: '/public/Atomic Habits book.png', stock: 70, sold: 87 },
  { name: 'Think and Grow Rich', description: 'Success and wealth mindset', price: 24, category: 'Books', image: '/public/poor dad book.png', stock: 60, sold: 72 },
  { name: 'The Lean Startup', description: 'Entrepreneurship guide', price: 26, category: 'Books', image: '/public/Atomic Habits book.png', stock: 45, sold: 58 },
  { name: 'Good to Great', description: 'Business excellence book', price: 29, category: 'Books', image: '/public/poor dad book.png', stock: 55, sold: 63 },
  { name: 'The Power of Now', description: 'Spiritual awakening guide', price: 23, category: 'Books', image: '/public/Atomic Habits book.png', stock: 75, sold: 89 },
  { name: 'Sapiens', description: 'Brief history of humankind', price: 27, category: 'Books', image: '/public/poor dad book.png', stock: 40, sold: 52 },
  { name: 'The Alchemist', description: 'Inspirational fiction novel', price: 21, category: 'Books', image: '/public/Atomic Habits book.png', stock: 90, sold: 105 },
  { name: 'Mindset', description: 'Psychology of success', price: 25, category: 'Books', image: '/public/poor dad book.png', stock: 65, sold: 78 },

  // Food (10 products)
  { name: 'Delicious Burger', description: 'Fresh beef burger with toppings', price: 12, category: 'Food', image: '/public/burger.png', stock: 200, sold: 245 },
  { name: 'Margherita Pizza', description: 'Classic Italian pizza', price: 18, category: 'Food', image: '/public/pizza.png', stock: 150, sold: 189 },
  { name: 'Crispy Samosa', description: 'Traditional Indian snack', price: 5, category: 'Food', image: '/public/samosa.png', stock: 300, sold: 378 },
  { name: 'Chicken Biryani', description: 'Aromatic rice dish', price: 15, category: 'Food', image: '/public/burger.png', stock: 120, sold: 145 },
  { name: 'Caesar Salad', description: 'Fresh green salad', price: 10, category: 'Food', image: '/public/pizza.png', stock: 80, sold: 92 },
  { name: 'Chocolate Cake', description: 'Rich chocolate dessert', price: 8, category: 'Food', image: '/public/samosa.png', stock: 60, sold: 75 },
  { name: 'Fish Tacos', description: 'Mexican-style fish tacos', price: 14, category: 'Food', image: '/public/burger.png', stock: 90, sold: 108 },
  { name: 'Pasta Carbonara', description: 'Creamy Italian pasta', price: 16, category: 'Food', image: '/public/pizza.png', stock: 70, sold: 85 },
  { name: 'Sushi Roll', description: 'Fresh Japanese sushi', price: 20, category: 'Food', image: '/public/samosa.png', stock: 50, sold: 63 },
  { name: 'Greek Gyro', description: 'Mediterranean wrap', price: 11, category: 'Food', image: '/public/burger.png', stock: 110, sold: 128 },

  // Sports (10 products)
  { name: 'Cricket Bat', description: 'Professional cricket bat', price: 89, category: 'Sports', image: '/public/bat.png', stock: 35, sold: 42 },
  { name: 'Tennis Racket', description: 'Professional tennis racket', price: 125, category: 'Sports', image: '/public/bat.png', stock: 28, sold: 35 },
  { name: 'Basketball', description: 'Official size basketball', price: 45, category: 'Sports', image: '/public/bat.png', stock: 60, sold: 78 },
  { name: 'Soccer Ball', description: 'FIFA approved soccer ball', price: 35, category: 'Sports', image: '/public/bat.png', stock: 75, sold: 92 },
  { name: 'Golf Club Set', description: 'Complete golf club set', price: 299, category: 'Sports', image: '/public/bat.png', stock: 15, sold: 18 },
  { name: 'Yoga Mat', description: 'Non-slip exercise mat', price: 25, category: 'Sports', image: '/public/bat.png', stock: 85, sold: 105 },
  { name: 'Dumbbells 20kg', description: 'Adjustable dumbbells', price: 89, category: 'Sports', image: '/public/bat.png', stock: 40, sold: 48 },
  { name: 'Bicycle Helmet', description: 'Safety cycling helmet', price: 55, category: 'Sports', image: '/public/bat.png', stock: 50, sold: 62 },
  { name: 'Swimming Goggles', description: 'Anti-fog swimming goggles', price: 15, category: 'Sports', image: '/public/bat.png', stock: 95, sold: 118 },
  { name: 'Running Shoes', description: 'Lightweight running shoes', price: 120, category: 'Sports', image: '/public/bat.png', stock: 45, sold: 58 },

  // Home & Garden (10 products)
  { name: 'Indoor Plant', description: 'Beautiful indoor decoration plant', price: 35, category: 'Home & Garden', image: '/public/plant.png', stock: 65, sold: 82 },
  { name: 'Garden Tools Set', description: 'Complete gardening toolkit', price: 75, category: 'Home & Garden', image: '/public/plant.png', stock: 30, sold: 38 },
  { name: 'Flower Pot Large', description: 'Ceramic decorative pot', price: 25, category: 'Home & Garden', image: '/public/plant.png', stock: 80, sold: 95 },
  { name: 'Lawn Mower', description: 'Electric grass cutting machine', price: 299, category: 'Home & Garden', image: '/public/plant.png', stock: 12, sold: 15 },
  { name: 'Garden Hose', description: 'Flexible watering hose', price: 45, category: 'Home & Garden', image: '/public/plant.png', stock: 55, sold: 68 },
  { name: 'Outdoor Chair', description: 'Weather-resistant patio chair', price: 89, category: 'Home & Garden', image: '/public/plant.png', stock: 25, sold: 32 },
  { name: 'Solar Lights', description: 'LED garden pathway lights', price: 35, category: 'Home & Garden', image: '/public/plant.png', stock: 70, sold: 88 },
  { name: 'Fertilizer Organic', description: 'Natural plant fertilizer', price: 18, category: 'Home & Garden', image: '/public/plant.png', stock: 90, sold: 112 },
  { name: 'Watering Can', description: 'Metal watering container', price: 22, category: 'Home & Garden', image: '/public/plant.png', stock: 60, sold: 75 },
  { name: 'Garden Gloves', description: 'Protective gardening gloves', price: 12, category: 'Home & Garden', image: '/public/plant.png', stock: 100, sold: 125 }
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect('mongodb://127.0.0.1:27017/shopping_db');
    console.log('Connected to MongoDB successfully');

    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    console.log('Creating users...');
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      }))
    );

    await User.insertMany(hashedUsers);
    console.log('Users inserted successfully');

    console.log('Creating 50 products...');
    await Product.insertMany(products);
    console.log('50 Products inserted successfully');

    console.log('Database seeded successfully with 50 products!');
    console.log('Categories: Electronics, Clothing, Books, Food, Sports, Home & Garden');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();