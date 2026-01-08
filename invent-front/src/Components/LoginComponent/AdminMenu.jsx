import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Services/LoginService";
import "../DisplayView.css";

const AdminMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    });
  };

  return (
    <div className="container-fluid d-flex justify-content-center min-vh-100">
      <div className="col-12">
        <div className="card admin-menu-card shadow-lg">
          <div className="card-header bg-primary text-white">
            <h2 className="text-center display-6 mb-0">Admin Dashboard</h2>
          </div>

          <div className="card-body">
            <div className="row justify-content-center">

              {/* MANAGE SKU */}
              <div className="col-md-3 mb-4">
                <div className="card menu-item-card h-100 text-center">
                  <div className="card-body">
                    <i className="fas fa-boxes fa-3x mb-3 text-primary"></i>
                    <h5>Manage SKU</h5>
                    <p className="text-muted">Create, view & edit SKUs</p>

                    <div className="dropdown">
                      <button
                        className="btn btn-primary dropdown-toggle w-100"
                        data-bs-toggle="dropdown"
                      >
                        SKU Actions
                      </button>
                      <ul className="dropdown-menu w-100 text-center">
                        <li>
                          <button className="dropdown-item" onClick={() => navigate("/skuentry")}>
                             SKU Entry
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item" onClick={() => navigate("/skureport")}>
                            SKU Report
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item" onClick={() => navigate("/update-sku/1")}>
                            Edit SKU
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* MANAGE PRODUCTS */}
              <div className="col-md-3 mb-4">
                <div className="card menu-item-card h-100 text-center">
                  <div className="card-body">
                    <i className="fas fa-cubes fa-3x mb-3 text-success"></i>
                    <h5>Manage Products</h5>
                    <p className="text-muted">Add, edit & view products</p>

                    <div className="dropdown">
                      <button
                        className="btn btn-success dropdown-toggle w-100"
                        data-bs-toggle="dropdown"
                      >
                        Product Actions
                      </button>
                      <ul className="dropdown-menu w-100 text-center">
                        <li>
                          <button className="dropdown-item" onClick={() => navigate("/product-add")}>
                            Product Entry
                          </button>
                        </li>
                        {/* <li>
                          <button className="dropdown-item" onClick={() => navigate("/update-product/1")}>
                            Price Edit
                          </button>
                        </li> */}
                        <li>
                          <button className="dropdown-item" onClick={() => navigate("/orders")}>
                            Product Report
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              
{/* TRANSACTION MANAGEMENT */}
<div className="col-md-3 mb-4">
  <div className="card menu-item-card h-100 text-center">
    <div className="card-body">
      <i className="fas fa-exchange-alt fa-3x mb-3 text-warning"></i>
      <h5>Transaction Reports</h5>
      <p className="text-muted">Stock issues & purchases</p>

      <div className="dropdown">
        <button
          className="btn btn-warning dropdown-toggle w-100"
          data-bs-toggle="dropdown"
        >
          Transaction Actions
        </button>

        <ul className="dropdown-menu w-100 text-center">
          <li>
            <button
              className="dropdown-item"
              onClick={() => navigate("/transactions")}
            >
              All Transactions
            </button>
          </li>

          <li>
            <button
              className="dropdown-item"
              onClick={() => navigate("/transactions/IN")}
            >
              Purchase Transactions
            </button>
          </li>

          <li>
            <button
              className="dropdown-item"
              onClick={() => navigate("/transactions/OUT")}
            >
              Issue Transactions
            </button>
          </li>
        </ul>

      </div>
    </div>
  </div>
</div>

              {/* ANALYTICS & REPORTS */}
<div className="col-md-3 mb-4">
  <div className="card menu-item-card h-100 text-center">
    <div className="card-body">
      <i className="fas fa-chart-line fa-3x mb-3 text-info"></i>
      <h5>Analytics & Reports</h5>
      <p className="text-muted">Insights & performance metrics</p>

      <button
        className="btn btn-info w-100"
        onClick={() => navigate("/reports")}
      >
        View Analytics
      </button>
    </div>
  </div>
</div>


            </div>

            {/* LOGOUT */}
            <div className="row mt-4">
              <div className="col-12 text-center">
                <button className="btn btn-danger btn-lg px-5" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;

