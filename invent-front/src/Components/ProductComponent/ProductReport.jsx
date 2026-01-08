import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getALLProducts, deleteProductById } from '../../Services/ProductService';
import { getUserDetails } from '../../Services/LoginService';
import '../../DisplayView.css';

const ProductReport = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState(null); 
    const [productList, setProductList] = useState([]);

    
    const fetchUserRole = async () => {
        try {
            const res = await getUserDetails(); 
            if (res.data && res.data.role) {
                setRole(res.data.role); 
            } else {
                console.error("User role not found:", res.data);
                navigate('/login'); 
            }
        } catch (err) {
            console.error("Failed to fetch user role:", err);
            navigate('/login'); 
        }
    };

    
    const fetchProducts = async () => {
        try {
            const res = await getALLProducts();
            setProductList(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Failed to fetch products:", err);
            setProductList([]);
        }
    };

    useEffect(() => {
        fetchUserRole();
    }, []);

  
    useEffect(() => {
        if (role) {
            fetchProducts();
        }
    }, [role]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await deleteProductById(id);
            setProductList(prev => prev.filter(p => p.productId !== id));
        } catch (err) {
            console.error('Failed to delete product:', err);
        }
    };

    const renderStockStatus = (stock, reorderLevel) =>
        stock > reorderLevel
            ? <span style={{ color: 'blue', fontWeight: 'bold' }}>Permitted to Issue</span>
            : <span style={{ color: 'red', fontWeight: 'bold' }}>Reorder Level Reached</span>;

    if (!role) return <h2 className="text-center">Loading user info...</h2>;

    return (
        <div className="product-report-wrapper">
        <div className="product-report-header">
            <h1 className="mb-3">{role} Product List</h1>
        </div>
            {/*<hr style={{ height: "4px", borderWidth: 0, backgroundColor: "red" }} />*/}

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Product ID</th>
                        <th>SKU ID</th>
                        <th>Product Name</th>
                        <th>Vendor ID</th>
                        <th>Purchase Price</th>
                        <th>Sales Price</th>
                        <th>Stock</th>
                        <th>Reorder Level</th>
                        <th>Stock Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {productList.length > 0 ? (
                        productList.map((product, index) => (
                            <tr key={product.productId}>
                                <td>{index + 1}</td>
                                <td>{product.productId}</td>
                                <td>{product.skuId}</td>
                                <td>{product.productName}</td>
                                <td>{product.vendorId}</td>
                                <td>{product.purchasePrice}</td>
                                <td>{product.salesPrice}</td>
                                <td>{product.stock}</td>
                                <td>{product.reorderLevel}</td>
                                <td>{renderStockStatus(product.stock, product.reorderLevel)}</td>
                                <td>
                                    <button
                                    className="btn btn-warning btn-sm me-1"
                                    disabled={product.stock <= product.reorderLevel}
                                    onClick={() => navigate(`/edit-stock/${product.productId}/2`)}
                                     >
                                     Issue
                                    </button>

                                    <button className="btn btn-success btn-sm me-1"
                                    onClick={() => navigate(`/edit-stock/${product.productId}/1`)}>
                                        Purchase
                                    </button>

                                    {role === 'Admin' && (
                                        <>
                                            <button
                                                className="btn btn-secondary btn-sm me-1"
                                                onClick={() =>
                                                    navigate(`/update-product/${product.productId}`,{
      state: { product }
    })
                                                }
                                            >
                                                Price Update
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(product.productId)}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="11">No products found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <button className="btn btn-success mt-3" onClick={() => navigate(-1)}>
                Return
            </button>
       
        </div>
    );
};

export default ProductReport;
