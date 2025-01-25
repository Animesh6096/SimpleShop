import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { getCartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <span className="logo-text">
            Simple<span style={{ color: 'var(--light)' }}>Shop</span>
          </span>
        </Link>
        
        <Link to="/cart" className="cart-button">
          <span role="img" aria-label="cart">🛒</span>
          <span>Cart ({getCartCount()})</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
