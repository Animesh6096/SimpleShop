import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <span className="logo-text">
            Simple<span style={{ color: 'var(--light)' }}>Shop</span>
          </span>
        </Link>
        
        <div className="nav-buttons">
          {!isHome && (
            <button onClick={() => navigate(-1)} className="back-button">
              ← Back
            </button>
          )}
          <Link to="/cart" className="cart-button">
            <span role="img" aria-label="cart">🛒</span>
            <span>Cart ({cart.length})</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
