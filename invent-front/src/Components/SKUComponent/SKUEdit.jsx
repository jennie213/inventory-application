import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateSKU, getSKUById } from '../../Services/SKUService';
import '../../DisplayView.css';

const SKUEdit = () => {
    const navigate = useNavigate();
    const { skuno } = useParams();

    const [sku, setSku] = useState({});
    const [description, setDescription] = useState("");

    useEffect(() => {
        // Fetch SKU data on mount
        getSKUById(skuno).then((response) => {
            setSku(response.data);
            setDescription(response.data.skuDescription || "");
        }).catch((error) => {
            console.error("Error fetching SKU:", error);
            alert("Failed to fetch SKU data");
        });
    }, [skuno]);

    const editSKU = (event) => {
        event.preventDefault();

        const updatedSKU = {
            ...sku,
            skuDescription: description
        };

        updateSKU(updatedSKU)
            .then(() => {
                alert("SKU updated successfully");
                navigate('/skulist');
            })
            .catch((error) => {
                console.error("Error updating SKU:", error);
                alert("Error updating SKU");
            });
    };

    const returnBack = () => {
        navigate(-1);
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="card col-md-4">
                    <div className="login-box p-4">
                        <h2 className="text-center mb-3"><u>SKU Update</u></h2>
                        <form>
                            <div className="form-group mb-3">
                                <label>SKU ID:</label>
                                <input
                                    type="text"
                                    name="skuId"
                                    className="form-control"
                                    value={sku.skuId || ""}
                                    readOnly
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>SKU Description:</label>
                                <input
                                    type="text"
                                    name="skuDescription"
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="d-flex justify-content-between">
                                <button type="button" className="btn btn-success" onClick={returnBack}>
                                    Return
                                </button>
                                <button type="submit" className="btn btn-primary" onClick={editSKU}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SKUEdit;
