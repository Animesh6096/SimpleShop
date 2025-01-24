import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const getProductImages = (productId) => {
    const product = products.find(p => p.id === productId);
    return product?.images[0] || product?.image;
  };

  return (
    <>
      <div className="back-navigation">
        <Link to="/" className="back-button">← Continue Shopping</Link>
      </div>
      
      <div className="cart">
        <h2 className="page-title">Shopping Cart</h2>
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={getProductImages(item.id)} alt={item.name} />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <p className="price">${item.price}</p>
              <button onClick={() => removeFromCart(item.id)} className="remove-button">
                Remove
              </button>
            </div>
          ))}
        </div>
        
        <div className="cart-total">
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={() => window.location.href='/checkout'} className="checkout-button">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
