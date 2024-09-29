import { Link } from 'react-router-dom';
import '../Styles/Login.scss'
import BgImg from "../assets/login_bg.jpg"
import GoogleLogo from "../assets/search.png"
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

const Login = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
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
    navigate('/');
    // API call to Login user here
  };

  return (
    <div className="LogIn">
      <div className="left">
        <div className="wrapper">
          <h1>Welcome Back! <span>Connect </span>and Trade with Confidence. </h1>
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
              <label htmlFor="userType">Log in as:</label>
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
              <button type="submit">Log in </button>
              <button>
                <img src={GoogleLogo} alt="" />
                Login With Google
              </button>
              <Link to='/SignUp'>Don't have an account? Sign up </Link>
            </div>

          </form>
        </div>
      </div>



      <div className="right">
        <img src={BgImg} alt="" />

      </div>
    </div>
  )
}

export default Login