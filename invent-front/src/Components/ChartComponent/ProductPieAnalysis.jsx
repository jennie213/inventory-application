import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProductWiseTotalSale } from "../../Services/TransactionService";
import "../../DisplayView.css";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProductPieAnalysis = () => {
  const navigate = useNavigate();
  const [productSale, setProductSale] = useState([]);

  useEffect(() => {
    getProductWiseTotalSale()
      .then((response) => setProductSale(response.data))
      .catch((error) => {
        alert("Error occurred while loading data: " + error);
      });
  }, []);

  const chartData = {
    labels: productSale.map((p) => p.productName),
    datasets: [
      {
        data: productSale.map((p) => p.totalSaleValue),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white text-center">
          <h4 className="mb-0">Product Sale Dashboard</h4>
        </div>

        <div className="card-body">
          <div className="row">
           
            <div className="col-md-7 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-light fw-bold">
                  Product-wise Sales
                </div>
                <div className="card-body p-0">
                  <table className="table table-bordered table-hover mb-0">
                    <thead className="table-secondary">
                      <tr className="text-center">
                        <th>Product Name</th>
                        <th>Sales Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productSale.map((p, i) => (
                        <tr key={i} className="text-center">
                          <td>{p.productName}</td>
                          <td>{Number(p.totalSaleValue).toFixed(2)}</td>
                        </tr>
                      ))}
                      {productSale.length === 0 && (
                        <tr>
                          <td colSpan="2" className="text-center text-muted">
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

           
            <div className="col-md-5 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-light fw-bold text-center">
                  Total Sale per Product
                </div>
                <div className="card-body d-flex justify-content-center align-items-center">
                  <div style={{ width: "280px" }}>
                    <Pie data={chartData} />
                  </div>
                </div>
              </div>
            </div>
          </div>

         
          <div className="text-end mt-3">
            <button
              className="btn btn-success px-4"
              onClick={() => navigate("/AdminMenu")}
            >
              Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPieAnalysis;
