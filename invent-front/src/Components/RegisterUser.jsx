import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DisplayView.css';
import { registerNewUser } from '../Services/LoginService';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterUser = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inventoryUser, setInventoryUser] = useState({
    username: '',
    password: '',
    personalName: '',
    email: '',
    role: ''
  });
  
  const [flag, setFlag] = useState(false);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  useEffect(() => {
    setFlag(false);
  }, []);
  const onChangeHandler = (e) => {
    setInventoryUser({ ...inventoryUser, [e.target.name]: e.target.value });
  };

  const createNewUser = (e) => {
    e.preventDefault();
    registerNewUser(inventoryUser).then(() => {
      setFlag(true);
      // alert('User is registered successfully... Go For Login');
      // navigate('/');
    });
  };

  const handleValidation = (e) => {
    e.preventDefault();
    let tempErrors = {};
    let valid = true;

    if (!inventoryUser.username.trim()) {
      tempErrors.username = 'User Name is required'; valid = false;
    }
    if (!inventoryUser.password.trim()) {
      tempErrors.password = 'Password is required'; valid = false;
    } else if (inventoryUser.password.length < 5 || inventoryUser.password.length > 10) {
      tempErrors.password = 'Password must be 5–10 characters long'; valid = false;
    } else if (inventoryUser.password !== confirmPassword) {
      tempErrors.password = 'Passwords do not match'; valid = false;
    }
    if (!confirmPassword.trim()) {
      tempErrors.confirmPassword = 'Confirm Password is required'; valid = false;
    }
    if (!inventoryUser.personalName.trim()) {
      tempErrors.personalName = 'Personal Name is required'; valid = false;
    }
    if (!inventoryUser.email.trim()) {
      tempErrors.email = 'Email is required'; valid = false;
    } else if (!emailPattern.test(inventoryUser.email)) {
      tempErrors.email = 'Invalid Email Format'; valid = false;
    }
    if (!inventoryUser.role.trim()) {
      tempErrors.role = 'Role is required'; valid = false;
    }

    setErrors(tempErrors);
    if (valid) createNewUser(e);
  };

  const returnBack=()=>{
    navigate('/');
  }

  return (
    <div className="login-bg d-flex align-items-center justify-content-center vh-100">
      <div className="card glass-box shadow-lg" style={{ maxWidth: '900px', width: '100%', borderRadius: '20px' }}>
        <div className="row g-0">

          {/* Animation side (smaller) */}
          <div className="col-md-4 d-none d-md-flex align-items-center justify-content-center">
            <video
              autoPlay
              loop
              muted
              className="w-100 h-100"
              style={{ borderRadius: '20px 0 0 20px', objectFit: 'cover' }}
            >
              <source
                src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/inventory-animation-gif-download-13004115.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          {/* Form side (larger) */}
          <div className="col-md-8 p-5">
            <h1 className="text-center fw-bolder display-6 mb-4">Create An Account</h1>
            {/* <p className="text-center text-muted mb-4">AI-Based Inventory Forecast & Auto Restock</p> */}

            <form>
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    className="form-control glass-input"
                    placeholder="Username"
                    name="username"
                    value={inventoryUser.username}
                    onChange={onChangeHandler}
                  />
                  {errors.username && <small className="text-danger">{errors.username}</small>}
                </div>

                <div className="col-md-6">
                  <input
                    className="form-control glass-input"
                    placeholder="Personal Name"
                    name="personalName"
                    value={inventoryUser.personalName}
                    onChange={onChangeHandler}
                  />
                  {errors.personalName && <small className="text-danger">{errors.personalName}</small>}
                </div>

                <div className="col-md-6">
                  <input
                    type="password"
                    className="form-control glass-input"
                    placeholder="Password"
                    name="password"
                    value={inventoryUser.password}
                    onChange={onChangeHandler}
                  />
                  {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>

                <div className="col-md-6">
                  <input
                    type="password"
                    className="form-control glass-input"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                </div>

                <div className="col-md-6">
                  <input
                    className="form-control glass-input"
                    placeholder="Email"
                    name="email"
                    value={inventoryUser.email}
                    onChange={onChangeHandler}
                  />
                  {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>

                <div className="col-md-6">
                  <input
                    list="roles"
                    className="form-control glass-input"
                    placeholder="Select Role"
                    name="role"
                    value={inventoryUser.role}
                    onChange={onChangeHandler}
                  />
                  <datalist id="roles">
                    <option value="Admin" />
                    <option value="Manager" />
                    <option value="Vendor" />
                  </datalist>
                  {errors.role && <small className="text-danger">{errors.role}</small>}
                </div>
              </div>

              <button className="btn btn-primary w-100 mt-4" onClick={handleValidation}>
                Register
              </button>
              <br/>
             <div>
                {flag && <p style={{ color: "blue" }}>New User Created...Go To Login:<button className='btn btn-success' onClick={returnBack}>Login</button> </p>}
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
