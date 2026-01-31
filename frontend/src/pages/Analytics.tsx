import React, { useState, useEffect } from 'react';
import { analyticsAPI } from '../services/api';
import '../charts.css';

interface AnalyticsData {
  topProducts: Array<{
    _id: string;
    name: string;
    sold: number;
    price: number;
    category: string;
  }>;
  categoryStats: Array<{
    _id: string;
    totalSold: number;
    totalRevenue: number;
    productCount: number;
  }>;
  overallStats: {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
  };
  lowStockProducts: Array<{
    _id: string;
    name: string;
    stock: number;
    category: string;
  }>;
}

const Analytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await analyticsAPI.getAnalytics();
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-spinner">Loading analytics...</div>;
  if (!analytics) return <div>Error loading analytics</div>;

  // Sort products by sales for top and low sellers
  const sortedProducts = [...analytics.topProducts].sort((a, b) => b.sold - a.sold);
  const topSellers = sortedProducts.slice(0, 3);
  const lowSellers = sortedProducts.slice(-2);
  const maxSold = Math.max(...analytics.topProducts.map(p => p.sold));
  const maxRevenue = Math.max(...analytics.categoryStats.map(c => c.totalRevenue));

  // Line chart data (simulated monthly sales)
  const monthlyData = [
    { month: 'Jan', sales: 120 },
    { month: 'Feb', sales: 150 },
    { month: 'Mar', sales: 180 },
    { month: 'Apr', sales: 140 },
    { month: 'May', sales: 200 },
    { month: 'Jun', sales: 250 }
  ];
  const maxMonthlySales = Math.max(...monthlyData.map(d => d.sales));

  return (
    <div className="analytics-page">
      <h1>📊 Sales Analytics Dashboard</h1>

      {/* Overall Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>📦 Total Products</h3>
          <p className="stat-number">{analytics.overallStats.totalProducts}</p>
        </div>
        <div className="stat-card">
          <h3>🛒 Total Orders</h3>
          <p className="stat-number">{analytics.overallStats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>💰 Total Revenue</h3>
          <p className="stat-number">${analytics.overallStats.totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Top Sellers Bar Chart */}
      <div className="analytics-section">
        <h2>🏆 Top Sellers</h2>
        <div className="bar-chart">
          <div className="chart-grid">
            {topSellers.map((product, index) => (
              <div key={product._id} className="bar-column">
                <div className="bar-container">
                  <div 
                    className="bar-fill top-seller"
                    style={{ 
                      height: `${(product.sold / maxSold) * 100}%`,
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    <span className="bar-value">{product.sold}</span>
                  </div>
                </div>
                <div className="bar-label">{product.name}</div>
                <div className="bar-category">{product.category}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Low Sellers Bar Chart */}
      <div className="analytics-section">
        <h2>📉 Low Sellers</h2>
        <div className="bar-chart">
          <div className="chart-grid">
            {lowSellers.map((product, index) => (
              <div key={product._id} className="bar-column">
                <div className="bar-container">
                  <div 
                    className="bar-fill low-seller"
                    style={{ 
                      height: `${(product.sold / maxSold) * 100}%`,
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    <span className="bar-value">{product.sold}</span>
                  </div>
                </div>
                <div className="bar-label">{product.name}</div>
                <div className="bar-category">{product.category}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Line Chart - Monthly Sales Trend */}
      <div className="analytics-section">
        <h2>📈 Monthly Sales Trend</h2>
        <div className="line-chart">
          <div className="chart-area">
            <svg className="line-svg" viewBox="0 0 600 300">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map(i => (
                <line 
                  key={i}
                  x1="50" 
                  y1={50 + i * 50} 
                  x2="550" 
                  y2={50 + i * 50} 
                  stroke="#333" 
                  strokeWidth="1"
                />
              ))}
              
              {/* Line path */}
              <polyline
                fill="none"
                stroke="#ff9900"
                strokeWidth="3"
                points={monthlyData.map((data, index) => 
                  `${50 + index * 100},${250 - (data.sales / maxMonthlySales) * 200}`
                ).join(' ')}
                className="line-path"
              />
              
              {/* Data points */}
              {monthlyData.map((data, index) => (
                <g key={index}>
                  <circle
                    cx={50 + index * 100}
                    cy={250 - (data.sales / maxMonthlySales) * 200}
                    r="6"
                    fill="#ff9900"
                    className="data-point"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  />
                  <text
                    x={50 + index * 100}
                    y={280}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="12"
                  >
                    {data.month}
                  </text>
                  <text
                    x={50 + index * 100}
                    y={240 - (data.sales / maxMonthlySales) * 200}
                    textAnchor="middle"
                    fill="#ff9900"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {data.sales}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Category Performance Bar Chart */}
      <div className="analytics-section">
        <h2>🎯 Category Performance</h2>
        <div className="horizontal-bar-chart">
          {analytics.categoryStats.map((category, index) => (
            <div key={category._id} className="h-bar-item">
              <div className="h-bar-label">{category._id}</div>
              <div className="h-bar-container">
                <div 
                  className="h-bar-fill"
                  style={{ 
                    width: `${(category.totalRevenue / maxRevenue) * 100}%`,
                    backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
                    animationDelay: `${index * 0.3}s`
                  }}
                >
                  <span className="h-bar-value">${category.totalRevenue.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Low Stock Alert */}
      <div className="analytics-section alert-section">
        <h2>⚠️ Stock Alert</h2>
        <div className="stock-alerts">
          {analytics.lowStockProducts.map((product) => (
            <div key={product._id} className="stock-alert-card">
              <div className="alert-icon">📦</div>
              <div className="alert-info">
                <h4>{product.name}</h4>
                <p>{product.category}</p>
                <div className={`stock-level ${product.stock === 0 ? 'out-of-stock' : 'low-stock'}`}>
                  {product.stock === 0 ? 'OUT OF STOCK' : `${product.stock} LEFT`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;