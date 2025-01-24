import { Link } from 'react-router-dom';
import { products } from '../data/products';

const Home = () => {
  return (
    <>
      <h1 className="page-title">Featured Products</h1>
      <div className="products-grid">
        {products.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="price">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;
