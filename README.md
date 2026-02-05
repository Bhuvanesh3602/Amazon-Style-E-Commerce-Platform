# 🛒 Amazon-Style E-Commerce MERN Stack Application

A full-featured e-commerce web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring Amazon-like UI, advanced analytics, and complete shopping functionality..

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![React](https://img.shields.io/badge/Frontend-React%20TypeScript-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🌟 Features

### 🛍️ **E-Commerce Core**
- **User Authentication** - Secure login/register with JWT tokens
- **Product Catalog** - Browse 50+ products across 6 categories
- **Search & Filter** - Real-time product search with regex
- **Shopping Cart** - Add, remove, update quantities
- **Checkout System** - Complete order processing with stock management
- **Admin Dashboard** - Product management with CRUD operations

### 📊 **Advanced Analytics Dashboard**
- **📈 Top Sellers Chart** - Visual bar chart showing best-performing products
- **📉 Low Sellers Chart** - Identify underperforming products
- **📊 Line Chart** - Monthly sales trends with smooth animations
- **🎯 Category Performance** - Horizontal bar chart for revenue analysis
- **⚠️ Stock Alerts** - Real-time low inventory warnings
- **💰 Revenue Tracking** - Complete financial overview

### 🎨 **Modern UI/UX**
- **Amazon-Style Design** - Professional e-commerce interface
- **Dark Theme** - Modern dark color scheme with orange accents
- **Responsive Design** - Mobile-first approach, works on all devices
- **Smooth Animations** - CSS animations for charts and interactions
- **Loading States** - User feedback during operations

## 🚀 Tech Stack

### Frontend
- **React.js** with TypeScript
- **React Router** for navigation
- **Context API** for state management
- **Axios** for API calls
- **Custom CSS** with animations

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **Multer** for file uploads

### Database
- **MongoDB** - NoSQL database
- **Collections**: Users, Products, Orders
- **Indexes** for optimized queries

## 📁 Project Structure

```
mern-stack-main/
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema
│   │   ├── Product.js       # Product schema
│   │   └── Order.js         # Order schema
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   ├── products.js      # Product CRUD routes
│   │   ├── orders.js        # Order processing
│   │   └── analytics.js     # Analytics endpoints
│   ├── middleware/
│   │   └── auth.js          # JWT middleware
│   ├── public/              # Static images
│   ├── uploads/             # User uploaded files
│   └── server.js            # Express server
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Cart.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   └── Analytics.tsx
│   │   ├── context/
│   │   │   ├── AuthContext.tsx
│   │   │   └── CartContext.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── charts.css       # Chart styling
├── .env                     # Environment variables
├── package.json
├── seed.js                  # Database seeding
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

### 1. Clone Repository
```bash
git clone <repository-url>
cd mern-stack-main
```

### 2. Install Dependencies
```bash
# Install all dependencies
npm run install-all

# Or install separately
npm install                    # Backend dependencies
cd frontend && npm install     # Frontend dependencies
```

### 3. Environment Setup
Create `.env` file in root directory:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/shopping_db
JWT_SECRET=your_jwt_secret_key_here
PORT=5001
NODE_ENV=development
```

### 4. Database Setup
```bash
# Start MongoDB (if using local)
mongod

# Seed database with 50 products
npm run seed
```

### 5. Run Application
```bash
# Run both frontend and backend
npm run dev

# Or run separately
npm run server    # Backend only
npm run client    # Frontend only
```

## 🌐 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **Admin Dashboard**: http://localhost:3000/admin
- **Analytics**: http://localhost:3000/analytics

## 👥 Default Users

### Admin Account
- **Email**: `admin@example.com`
- **Password**: `admin123`
- **Access**: Full admin privileges, analytics dashboard

### Regular User
- **Email**: `john@example.com`
- **Password**: `user123`
- **Access**: Shopping, cart, checkout

## 📊 Product Categories

The application includes **50 products** across **6 categories**:

1. **📱 Electronics** (10 products) - $249-$1,299
2. **👕 Clothing** (10 products) - $35-$249
3. **📚 Books** (10 products) - $21-$29
4. **🍔 Food** (10 products) - $5-$20
5. **⚽ Sports** (10 products) - $15-$299
6. **🌱 Home & Garden** (10 products) - $12-$299

## 🔧 API Endpoints

### Authentication
```
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
```

### Products
```
GET    /api/products       # Get all products (with search)
GET    /api/products/:id   # Get single product
POST   /api/products       # Create product (Admin)
PUT    /api/products/:id   # Update product (Admin)
DELETE /api/products/:id   # Delete product (Admin)
```

### Orders
```
POST /api/orders           # Place order
GET  /api/orders/my-orders # User's orders
GET  /api/orders           # All orders (Admin)
```

### Analytics
```
GET /api/analytics         # Get analytics data (Admin)
```

## 📈 Analytics Features

### Visual Charts
- **📊 Vertical Bar Charts** - Top and low sellers comparison
- **📈 Line Chart** - Monthly sales trends with animation
- **📊 Horizontal Bar Chart** - Category revenue performance
- **⚠️ Alert Cards** - Low stock warnings with pulse animation

### Key Metrics
- Total products, orders, and revenue
- Best and worst performing products
- Category-wise performance analysis
- Inventory management alerts

## 🔒 Security Features

- **Password Hashing** with bcrypt
- **JWT Token Authentication**
- **Protected Routes** (client & server)
- **Role-Based Access Control**
- **Input Validation** and sanitization
- **CORS** configuration

## 🎯 Key Functionalities

### For Customers
1. **Browse Products** - View 50+ products with images
2. **Search & Filter** - Find products quickly
3. **Shopping Cart** - Manage cart items
4. **Secure Checkout** - Place orders with stock validation
5. **User Account** - Personal dashboard

### For Admins
1. **Product Management** - Add, edit, delete products
2. **Inventory Control** - Track stock levels
3. **Sales Analytics** - Visual charts and reports
4. **Order Management** - View all customer orders
5. **User Management** - Monitor user activity

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production Build
```bash
# Build frontend
cd frontend && npm run build

# Start production server
npm start
```

### Environment Variables for Production
```env
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_strong_jwt_secret
PORT=5001
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 Scripts

```bash
npm run dev          # Run both frontend and backend
npm run server       # Run backend only
npm run client       # Run frontend only
npm run seed         # Seed database with sample data
npm run clear-db     # Clear all database data
npm run install-all  # Install all dependencies
```

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
```bash
# Make sure MongoDB is running
mongod

# Or check connection string in .env
```

**Port Already in Use**
```bash
# Kill process using port 5001
npx kill-port 5001
```

**Dependencies Issues**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **MongoDB** for the database
- **React** team for the amazing frontend library
- **Express.js** for the backend framework
- **JWT** for secure authentication
- **Chart.js** inspiration for analytics

## 📞 Support

For support, email bhuvanesh.s2024aids@sece.ac.in or create an issue in the repository.

---

**⭐ Star this repository if you found it helpful!**

Built with ❤️ using the MERN Stack
