import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const getProductImages = (productId) => {
    const product = products.find(p => p.id === productId);
    return product?.images?.[0] || product?.image;
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.price * (item.quantity || 1));
    }, 0);
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="container">
        <div className="empty-cart-container">
          <h2 className="page-title">Your Cart is Empty</h2>
          <p className="empty-cart-message">Add some products to your cart</p>
          <Link to="/" className="back-button compact">← Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
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
                <h3 className="item-title">{item.name}</h3>
                <p className="item-description">{item.description}</p>
              </div>
              <div className="cart-item-quantity">
                <p className="price">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                <div className="quantity">Qty: {item.quantity || 1}</div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="remove-button compact">
                Remove
              </button>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <div className="cart-total">
            <h3>Total: ${calculateTotal().toFixed(2)}</h3>
            <Link to="/checkout" className="checkout-button">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
