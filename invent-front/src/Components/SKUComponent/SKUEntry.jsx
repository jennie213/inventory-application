import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveSKU } from '../../Services/SKUService';
import { getRole } from '../../Services/LoginService';
import '../../DisplayView.css';

const SKUEntry = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const [skuData, setSkuData] = useState({
    skuId: "",
    skuDescription: ""
  });

  useEffect(() => {
    getRole().then(res => setRole(res.data));
  }, []);

  const handleChange = (e) => {
    setSkuData({ ...skuData, [e.target.name]: e.target.value });
  };

  const handleValidation = (e) => {
    e.preventDefault();
    let errorList = {};
    let valid = true;

    if (!skuData.skuId.trim()) {
      errorList.skuId = "SKU ID is required";
      valid = false;
    }
    if (!skuData.skuDescription.trim()) {
      errorList.skuDescription = "SKU Description is required";
      valid = false;
    }

    setErrors(errorList);
    if (valid) createSKU(e);
  };

  const createSKU = (event) => {
    event.preventDefault();
    saveSKU(skuData)
      .then(response => {
        alert("New SKU Added");
        if (role === 'Admin') navigate('/AdminMenu');
        else if (role === 'Manager') navigate('/ManagerMenu');
      })
      .catch(() => alert("Error adding SKU"));
  };

  // const handleReturn = () => {
  //   if (role === "Admin") navigate("/AdminMenu");
  //   else if (role === "Manager") navigate("/ManagerMenu");
  // };

  return (
    <div className="d-flex justify-content-center align-items-center mt-4">
      <div className="glass-box p-4 col-md-6">
        <h2 className="text-center mb-4 fw-bold">New SKU Entry</h2>
        <form onSubmit={handleValidation}>
          <div className="mb-3">
            <label className="fw-semibold">SKU ID</label>
            <input
              type="text"
              name="skuId"
              value={skuData.skuId}
              onChange={handleChange}
              className="form-control glass-input"
            />
            {errors.skuId && <p className="text-danger">{errors.skuId}</p>}
          </div>

          <div className="mb-3">
            <label className="fw-semibold">SKU Description</label>
            <input
              type="text"
              name="skuDescription"
              value={skuData.skuDescription}
              onChange={handleChange}
              className="form-control glass-input"
            />
            {errors.skuDescription && <p className="text-danger">{errors.skuDescription}</p>}
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-success" onClick={() => navigate(-1)}>Return</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SKUEntry;
