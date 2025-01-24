import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return <div>Product not found</div>;

  return (
    <>
      <div className="back-navigation">
        <Link to="/" className="back-button">← Back to Products</Link>
      </div>

      <div className="product-details">
        <div className="product-gallery">
          <div className="product-details-image">
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
          <h2>{product.name}</h2>
          <p className="description">{product.description}</p>
          <p className="price">${product.price}</p>
          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
