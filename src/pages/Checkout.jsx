import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    bkashTxID: ''
  });

  const validateForm = () => {
    const newErrors = {};
    
    // Validate First Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    // Validate Last Name
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    // Validate Email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Validate Phone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Validate Address
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    // Validate City
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    // Validate ZIP Code
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }
    
    // Validate bKash Transaction ID
    if (!formData.bkashTxID.trim()) {
      newErrors.bkashTxID = 'bKash Transaction ID is required';
    } else if (!/^[A-Z0-9]{8,}$/.test(formData.bkashTxID.toUpperCase())) {
      newErrors.bkashTxID = 'Please enter a valid transaction ID';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Order placed:', { items: cart, customer: formData });
      // Show success message
      alert('Order placed successfully!');
      // Redirect to home page
      navigate('/');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <>
      <div className="back-navigation">
        <Link to="/cart" className="back-button">← Back to Cart</Link>
      </div>

      <div className="checkout">
        <h2 className="page-title">Checkout</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? 'error' : ''}
              required
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>
          <div className="form-group">
            <label>Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? 'error' : ''}
              required
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>
          <div className="form-group full-width">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group full-width">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
              placeholder="e.g., +1 (234) 567-8900"
              required
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
          <div className="form-group full-width">
            <label>Address *</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? 'error' : ''}
              required
              rows="3"
            ></textarea>
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>
          <div className="form-group">
            <label>City *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={errors.city ? 'error' : ''}
              required
            />
            {errors.city && <span className="error-message">{errors.city}</span>}
          </div>
          <div className="form-group">
            <label>ZIP Code *</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className={errors.zipCode ? 'error' : ''}
              required
            />
            {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
          </div>
          <div className="form-group full-width payment-section">
            <h3 className="section-title">Payment Information</h3>
            <p className="payment-info">
              Please send payment to bKash number: <strong>01XXXXXXXXX</strong>
            </p>
            <label>bKash Transaction ID *</label>
            <input
              type="text"
              name="bkashTxID"
              value={formData.bkashTxID}
              onChange={handleChange}
              className={errors.bkashTxID ? 'error' : ''}
              placeholder="e.g., 8N7DXHT8KM"
              required
            />
            {errors.bkashTxID && <span className="error-message">{errors.bkashTxID}</span>}
            <p className="helper-text">Enter the Transaction ID received from bKash</p>
          </div>
          <button type="submit" className="full-width">Place Order</button>
        </form>
      </div>
    </>
  );
};

export default Checkout;
