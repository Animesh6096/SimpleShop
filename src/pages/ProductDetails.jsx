import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="container">
      <div className="back-navigation">
        <Link to="/" className="back-button compact">← Back to Products</Link>
      </div>

      <div className="product-details">
        <div className="product-gallery">
          <div className="product-main-image">
            <img src={product.images[selectedImage]} alt={product.name} />
          </div>
          <div className="product-thumbnails">
            {product.images.map((img, index) => (
              <div
                key={index}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.name} view ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="product-details-info">
          <div className="product-header">
            <h2>{product.name}</h2>
            <p className="price">${product.price}</p>
          </div>
          <p className="description">{product.description}</p>
          <button onClick={() => addToCart(product)} className="add-to-cart-button">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
