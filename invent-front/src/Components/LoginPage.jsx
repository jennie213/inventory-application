import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateUser } from '../Services/LoginService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DisplayView.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [flag, setFlag] = useState(true);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const onChangeHandler = (e) => {
    setFlag(true);
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleValidation = (e) => {
    e.preventDefault();
    let tempErrors = {};
    let valid = true;

    if (!loginData.username.trim()) {
      tempErrors.username = 'User Name is required';
      valid = false;
    }
    if (!loginData.password.trim()) {
      tempErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(tempErrors);
    if (valid) validateLogin();
  };

  const validateLogin = () => {
    validateUser(loginData.username, loginData.password).then((response) => {
      const role = String(response.data);
      if (role === 'Admin') navigate('/AdminMenu');
      else if (role === 'Manager') navigate('/ManagerMenu');
      else if (role === 'Vendor') navigate('/VendorMenu');
      else setFlag(false);
    });
  };

  return (
    <div className="login-bg d-flex align-items-center justify-content-center vh-100">
      <div className="card glass-box shadow-lg" style={{ maxWidth: '900px', width: '100%', borderRadius: '20px' }}>
        <div className="row g-0">

          <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
            <video autoPlay loop muted className="w-100 h-100" style={{ borderRadius: '20px 0 0 20px', objectFit: 'cover' }}>
              <source src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/inventory-animation-gif-download-12752851.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="col-md-6 p-5">
            <h1 className="text-center fw-bolder display-6 mb-4">Inventory Login</h1>
            {/* <p className="text-center text-muted mb-4">AI-Based Inventory Forecast & Auto Restock</p> */}
            <form>
              <div className="form-group mb-3">
                <label>User Name</label>
                <input
                  type="text"
                  name="username"
                  className="form-control glass-input"
                  value={loginData.username}
                  onChange={onChangeHandler}
                />
                {errors.username && <small className="text-danger">{errors.username}</small>}
              </div>

              <div className="form-group mb-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control glass-input"
                  value={loginData.password}
                  onChange={onChangeHandler}
                  autoComplete="off"
                  
                />
                {errors.password && <small className="text-danger">{errors.password}</small>}
              </div>

              {!flag && <p className="text-danger">Invalid User Id or Password</p>}

              <button className="btn btn-primary w-100 mt-2" onClick={handleValidation}>Submit</button>
            </form>

            <div className="text-center mt-4">
              <button className="btn btn-info" onClick={() => navigate('/Register')}>
                Register New User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;