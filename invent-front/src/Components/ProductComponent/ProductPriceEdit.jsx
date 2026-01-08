import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { getProductById, editProductPrice } from '../../Services/ProductService';
import '../../DisplayView.css';

const ProductPriceEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation(); 
    const [product, setProduct] = useState(null);
    const [newPurchasePrice, setNewPurchasePrice] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        
        if (location.state?.product) {
            setProduct(location.state.product);
            setNewPurchasePrice(location.state.product.purchasePrice);
            console.log("PriceEdit product from state:", location.state.product);
        } else {
            getProductById(id)
                .then(res => {
                    setProduct(res.data);
                    setNewPurchasePrice(res.data.purchasePrice);
                    console.log("PriceEdit product from backend:", res.data);
                })
                .catch(err => {
                    console.error(err);
                    setErrorMsg('Failed to load product details');
                });
        }
    }, [id, location.state]);

    const returnBack = () => navigate(-1);

    const onChangeHandler = (e) => setNewPurchasePrice(e.target.value);

    const updatePrice = (e) => {
        e.preventDefault();
        if (Number(newPurchasePrice) <= 0) {
            setErrorMsg('Enter a valid purchase price');
            return;
        }

        const updatedProduct = { ...product, purchasePrice: Number(newPurchasePrice) };

        editProductPrice(updatedProduct)
            .then(() => {
                setSuccessMsg('Purchase price updated successfully');
                setErrorMsg('');
                setTimeout(() => returnBack(), 1200);
            })
            .catch(err => {
                console.error(err);
                setErrorMsg('Price update failed');
            });
    };

    if (!product) return <p className="text-center mt-4">Loading...</p>;

    return (
        <div className="container my-5 d-flex justify-content-center">
            <div className="card col-md-6 shadow-lg rounded-4">
                <h3 className="text-center mt-3">Edit Purchase Price</h3>
                <div className="card-body">
                    {successMsg && <div className="alert alert-success">{successMsg}</div>}
                    {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

                    <div className="row mb-2"><b>Product ID:</b>&nbsp; {product.productId}</div>
                    <div className="row mb-2"><b>SKU:</b>&nbsp; {product.skuId}</div>
                    <div className="row mb-2"><b>Product Name:</b>&nbsp; {product.productName}</div>
                    <div className="row mb-2"><b>Sales Price:</b>&nbsp; {product.salesPrice}</div>
                    <div className="row mb-2"><b>Reorder Level:</b>&nbsp; {product.reorderLevel}</div>
                    <div className="row mb-2"><b>Stock:</b>&nbsp; {product.stock}</div>
                    <div className="row mb-3"><b>Vendor:</b>&nbsp; {product.vendorId}</div>

                    <div className="form-group mb-3">
                        <label><b>Purchase Price</b></label>
                        <input
                            type="number"
                            className="form-control"
                            value={newPurchasePrice}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>

                    <div className="text-center">
                        <button className="btn btn-success me-3" onClick={updatePrice}>Save</button>
                        <button className="btn btn-secondary" onClick={returnBack}>Return</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPriceEdit;
