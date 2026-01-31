import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { productsAPI } from '../services/api';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const filterProducts = React.useCallback(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'i');
      filtered = filtered.filter(product => 
        regex.test(product.name) || 
        regex.test(product.category) || 
        regex.test(product.description)
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll();
      setProducts(response.data);
      const uniqueCategories = Array.from(new Set(response.data.map((p: Product) => p.category))) as string[];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
  };

  return (
    <div className="home">
      <div className="hero-banner">
        <div className="hero-content">
          <h1>Welcome to Shopping</h1>
          <p>Find everything you need at unbeatable prices</p>
          <div className="hero-features">
            <span>✓ Free Shipping</span>
            <span>✓ Easy Returns</span>
            <span>✓ 24/7 Support</span>
          </div>
        </div>
      </div>

      <div className="search-filter-section">
        <div className="search-container-home">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input-home"
          />
        </div>
      </div>

      <div className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div 
                key={category}
                className={`category-card ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </div>
            ))
          ) : (
            ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Beauty', 'Automotive', 'Toys', 'Food & Beverages', 'Health & Wellness', 'Jewelry', 'Pet Supplies'].map((category) => (
              <div 
                key={category}
                className={`category-card ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="products-section">
        <h2>
          {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
          {searchQuery && ` - "${searchQuery}"`}
        </h2>
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading amazing products...</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="no-products">
                <h3>No products found</h3>
                <p>Try different search terms or categories</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;