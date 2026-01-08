import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllSKUs, deleteSKUById } from '../../Services/SKUService'; 
import { getUserDetails } from '../../Services/LoginService';
import '../../DisplayView.css';

const SKUReport = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [skuList, setSkuList] = useState([]);

    
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
            console.error("Failed to fetch user details:", err);
            navigate('/login');
        }
    };

   
    const fetchSKUs = async () => {
        try {
            const res = await getAllSKUs();
            setSkuList(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Failed to fetch SKUs:", err);
            setSkuList([]);
        }
    };

    useEffect(() => {
        fetchUserRole();
    }, []);

    useEffect(() => {
        if (role) fetchSKUs();
    }, [role]);

    const handleDeleteSKU = async (id) => {
        try {
            await deleteSKUById(id);
            setSkuList(prev => prev.filter(sku => sku.skuId !== id));
        } catch (err) {
            console.error("Failed to delete SKU:", err);
        }
    };

    if (!role) return <h2 className="text-center">Loading user info...</h2>;

    return (
        <div className="product-report-wrapper">
            <div className="product-report-header">
                <h1 className="mb-3">{role} SKU List</h1>
            </div>

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>SKU Id</th>
                        <th>Description</th>
                        {role === 'Admin' && <th>Update SKU</th>}
                        {role === 'Admin' && <th>Delete SKU</th>}
                    </tr>
                </thead>
                <tbody>
                    {skuList.length > 0 ? (
                        skuList.map((sku, index) => (
                            <tr key={sku.skuId}>
                                <td>{index + 1}</td>
                                <td>{sku.skuId}</td>
                                <td>{sku.skuDescription}</td>
                                {role === 'Admin' && (
                                    <td>
                                        <Link to={`/update-sku/${sku.skuId}`}>
                                            <button className="btn btn-info">Update</button>
                                        </Link>
                                    </td>
                                )}
                                {role === 'Admin' && (
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteSKU(sku.skuId)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={role === 'Admin' ? 5 : 3}>No SKUs found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="mt-3 text-center">
                <button className="btn btn-success" onClick={() => navigate(-1)}>Return</button>
            </div>
        </div>
    );
};

export default SKUReport;
