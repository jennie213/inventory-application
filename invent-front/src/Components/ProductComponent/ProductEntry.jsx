// const nextEntry=()=>{
//         navigate('/dummy');
//     }


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveProduct } from '../../Services/ProductService';
import { getUsersByRole } from '../../Services/LoginService';
import { getAllSKUs } from '../../Services/SKUService';
import '../../DisplayView.css';

const ProductEntry = () => {
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        productId: '',
        productName: '',
        skuId: '',
        purchasePrice: 0.0,
        salesPrice: 0.0,
        stock: 0.0,
        reorderLevel: 0.0,
        vendorId: '',
        status: true
    });

    const [vendors, setVendors] = useState([]);
    const [skus, setSkus] = useState([]);
    const [savedFlag, setSavedFlag] = useState(false);

    useEffect(() => {
        const fetchProductId = async () => {
        try {
            const res = await axios.get(
                'http://localhost:9191/invent/product/generate-id',
                { withCredentials: true }
            );
            
            setProduct(product => ({ 
                ...product, 
                productId: res.data 
            }));
        } catch (err) {
            console.error('Product ID fetch failed', err);
        }
    };

        const fetchVendors = async () => {
            try {
                const res = await getUsersByRole("Vendor");
                setVendors(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error(err);
                setVendors([]);
            }
        };

        const fetchSkus = async () => {
            try {
                const res = await getAllSKUs();
                setSkus(Array.isArray(res.data) ? res.data : []);
                if (res.data.length > 0) {
                    setProduct(prev => ({
                        ...prev,
                        skuId: prev.skuId || res.data[0].skuId
                    }));
                }
            } catch (err) {
                console.error(err);
                setSkus([]);
            }
        };

        fetchProductId();
        fetchVendors();
        fetchSkus();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: ['purchasePrice', 'stock', 'reorderLevel'].includes(name) ? Number(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await saveProduct(product);
            setSavedFlag(true);
        } catch (err) {
            console.error(err);
            alert('Error adding product');
        }
    };

    const handleNewEntry = async () => {
        setSavedFlag(false);
        try {
            const res = await axios.get('http://localhost:3131/invent/product/generate-id', { withCredentials: true });
            setProduct({
                productId: res.data,
                productName: '',
                skuId: skus.length > 0 ? skus[0].skuId : '',
                purchasePrice: 0.0,
                salesPrice: 0.0,
                stock: 0.0,
                reorderLevel: 0.0,
                vendorId: '',
                status: true
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <div className="glass-box p-4 col-md-8 shadow-lg rounded-4">
                <h2 className="text-center mb-4 fw-bold">Add Product</h2>

                {!savedFlag ? (
                    <form onSubmit={handleSubmit}>
                        <div className="row gx-3">
                            <div className="col-md-6 mb-3">
                                <label className="fw-semibold">Product ID</label>
                                <input
                                    type="text"
                                    value={product.productId}
                                    readOnly
                                    className="form-control glass-input"
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="fw-semibold">Product Name</label>
                                <input
                                    type="text"
                                    name="productName"
                                    value={product.productName}
                                    onChange={handleChange}
                                    className="form-control glass-input"
                                    required
                                />
                            </div>
                        </div>

                        <div className="row gx-3">
                            <div className="col-md-6 mb-3">
                                <label className="fw-semibold">Select SKU</label>
                                <select
                                    name="skuId"
                                    value={product.skuId}
                                    onChange={handleChange}
                                    className="form-control glass-input"
                                    required
                                >
                                    <option value="">-- Choose SKU --</option>
                                    {skus.map(sku => (
                                        <option key={sku.skuId} value={sku.skuId}>
                                            {sku.skuDescription}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="fw-semibold">Purchase Price</label>
                                <input
                                    type="number"
                                    name="purchasePrice"
                                    value={product.purchasePrice}
                                    onChange={handleChange}
                                    className="form-control glass-input"
                                    required
                                />
                            </div>
                        </div>

                        <div className="row gx-3">
                            <div className="col-md-6 mb-3">
                                <label className="fw-semibold">Stock</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={product.stock}
                                    onChange={handleChange}
                                    className="form-control glass-input"
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="fw-semibold">Reorder Level</label>
                                <input
                                    type="number"
                                    name="reorderLevel"
                                    value={product.reorderLevel}
                                    onChange={handleChange}
                                    className="form-control glass-input"
                                    required
                                />
                            </div>
                        </div>

                        <div className="row gx-3">
                            <div className="col-md-6 mb-3">
                                <label className="fw-semibold">Vendor</label>
                                <select
                                    name="vendorId"
                                    value={product.vendorId}
                                    onChange={handleChange}
                                    className="form-control glass-input"
                                    required
                                >
                                    <option value="">-- Choose Vendor --</option>
                                    {vendors.map(v => (
                                        <option key={v} value={v}>{v}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between mt-4">
                            <button className="btn btn-success col-md-3">Save</button>
                            <button type="button" onClick={handleNewEntry} className="btn btn-warning col-md-3">Reset</button>
                            <button type="button" onClick={() => navigate(-1)} className="btn btn-danger col-md-3">Return</button>
                        </div>
                    </form>
                ) : (
                    <div className="text-center">
                        <h4 className="text-success mb-3">Product Saved</h4>
                        <button className="btn btn-primary" onClick={handleNewEntry}>
                            Add New Product
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductEntry;
