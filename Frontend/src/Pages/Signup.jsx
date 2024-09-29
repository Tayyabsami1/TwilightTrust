import { Link } from 'react-router-dom';
import '../Styles/Signup.scss'
import BgImg from "../assets/signUp_bg.jpg"
import GoogleLogo from "../assets/search.png"

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
    userType: 'Individual' // Default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // API call to register user here
    navigate('/');
  };

  return (
    <div className="SignIn">
      <div className="left">
        <img src={BgImg} alt="" />
      </div>
    


      <div className="right">
        <div className="wrapper">
        <h1>Join Our <span>Marketplace</span>- Connect, Buy, Sell Securely</h1>
        <form onSubmit={handleSubmit}>

          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="userType">Sign in as:</label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
            >
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
            </select>
          </div>

          <div className="btns">
            <button type="submit">Sign Up</button>
            <button>
                <img src={GoogleLogo} alt="" />
                Signup With Google
              </button>
            <Link to='/Login'>Already have an account? Login</Link>
          </div>

        </form>
      </div>
    </div>
    </div>
  )
}

export default SignUp