import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { getProductById, editProductStock } from '../../Services/ProductService';
import { getUserId } from '../../Services/LoginService';
import { transactionIdGenerate, saveTransaction } from '../../Services/TransactionService';

const ProductStockEdit = () => {    
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

    const [newId, setNewId] = useState(0);
    const [userId, setUserId] = useState('');
    const [flag, setFlag] = useState("");
    const [errors, setErrors] = useState({});
    const [warns, setWarns] = useState(null);
    const [tdate, setTdate] = useState(new Date());
    // const [tdate, setTdate] = useState(
    // new Date().toISOString().split("T")[0]
    // );

    const [transaction, setTransaction] = useState({
        transactionId: 0,
        transactionType: "",
        productId: "",
        rate: 0.0,
        quantity: 0.0,
        transactionValue: 0.0,
        userId: "",
        // transactionDate: new Date(),
        transactionDate: "",
    });

    let navigate = useNavigate();
    let params = useParams();
    let location = useLocation();  
    const [quantity, setQuantity] = useState(0.0);
    const [transValue, setTransValue] = useState(null);

    const setProductData = () => {
        if (location.state?.product) {
            setProduct(location.state.product);
            setFlag(params.no);
        } else {
            getProductById(params.id).then((response) => {
                setProduct(response.data);
                setFlag(params.no);
            });
        }
    }

    const setUserData = () => {
        getUserId().then((response) => {
            setUserId(response.data);
        });
    }

    const setTransactionId = () => {
        transactionIdGenerate().then((response) => {
            setNewId(response.data);
        });
    }

    useEffect(() => {
        setProductData();
        setUserData();
        setTransactionId();
    }, []);

    const returnBack = () => {
        navigate('/orders');
    }

    const clearAll = () => {
        setQuantity(0.0);
    }

    // const stockEdit = (e) => {
    //     e.preventDefault();
    //     transaction.transactionId = newId;
    //     transaction.productId = product.productId;
    //     transaction.quantity = quantity;
    //     transaction.userId = userId;
    //     transaction.transactionDate = tdate;
    //     if (flag === "1") {
    //         transaction.transactionType = "IN";
    //         transaction.rate = product.purchasePrice;
    //     } else if (flag === "2") {
    //         transaction.transactionType = "OUT";
    //         transaction.rate = product.salesPrice;
    //     }
    //     transaction.transactionValue = parseFloat(transaction.rate) * parseFloat(quantity);
    //     setTransValue(transaction.transactionValue);
    //     if (flag === "2") {
    //         let balance = product.stock - quantity;
    //         if (balance <= product.reorderLevel)
    //             setWarns("Warning: Stock reached the reorder level!...");
    //     }
    //     saveTransaction(transaction).then((response) => {
    //         setTransaction(response.data);
    //         returnBack();
    //     });

    //     editProductStock(product, quantity, flag).then((response) => {
    //         setProduct(response.data);
    //         setFlag("");
    //         clearAll();
    //     });
    // }
   
   const stockEdit = async (e) => {
  e.preventDefault();

  if (!userId) {
    alert("User not ready yet. Try again.");
    return;
  }

  const transactionToSave = {
    transactionId: newId,
    transactionType: flag === "1" ? "IN" : "OUT",
    productId: product.productId,
    rate: flag === "1" ? product.purchasePrice : product.salesPrice,
    quantity: parseFloat(quantity),
    transactionValue:
      parseFloat(quantity) *
      (flag === "1" ? product.purchasePrice : product.salesPrice),
    userId: userId,
    transactionDate: tdate
  };

  setTransValue(transactionToSave.transactionValue);

  if (flag === "2") {
    const balance = product.stock - parseFloat(quantity);
    if (balance <= product.reorderLevel) {
      setWarns("Warning: Stock reached the reorder level!...");
    }
  }

  try {
    await saveTransaction(transactionToSave);   

    const updatedProduct = await editProductStock(product, quantity, flag);
    setProduct(updatedProduct.data);
    setFlag("");
    clearAll();
    returnBack();
  } catch (err) {
    console.error("Error saving transaction:", err);
    
  }
};



    const handleValidation = (e) => {
        e.preventDefault();
        let tempErrors = {};
        let isValid = true;

        if (!quantity.toString().trim()) {
            tempErrors.quantity = "Transaction Quantity is required";
            isValid = false;
        } else if (parseFloat(quantity) <= 0) {
            tempErrors.quantity = "Transaction Quantity cannot be zero or negative";
            isValid = false;
        }

        if (flag === "2") {
            if (parseFloat(quantity) > product.stock) {
                tempErrors.quantity = "Issued Quantity cannot be greater than available stock";
                isValid = false;
            }
        }
        setErrors(tempErrors);
        if (isValid) {
            stockEdit(e);
        }
    }

  
    return (
        <div>
            
            <div className="card col-md-6 offset-md-3">
                <div className="card-body" align="center">
                    <div className="col-md-12 text-center" style={{ textAlign: "center" }}>
                {parseInt(flag) === 1 ? <h1 className="text-center">Stock Purchase Entry</h1> :
                    <h1 className="text-center">Stock Issue Entry</h1>}
            </div>
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                            <td> Product Id:</td>
                            <td>{product.productId}</td>
                        </tr>
                        <tr>
                            <td> SKU Id: </td>
                            <td>{product.skuId} </td>
                        </tr>
                        <tr>
                            <td> Product Name:</td>
                            <td>{product.productName} </td>
                        </tr>
                        <tr>
                            <td>
                                {parseInt(flag) === 1 ? <>Purchase-Price:</> : <>Sales-Price:</>}
                            </td>
                            <td>{parseInt(flag) === 1 ? product.purchasePrice : product.salesPrice}</td>
                        </tr>
                        <tr>
                            <td> Re Order Level: </td>
                            <td>{product.reorderLevel} </td>
                        </tr>
                        <tr>
                            <td> Stock:</td>
                            <td> {product.stock} </td>
                        </tr>
                        <tr>
                            <td> Vendor:</td>
                            <td>{product.vendorId} </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card col-md-6 offset-md-3">
                <div className="card-body" align="center">
                    <form>
                        <div className="row">
                            <div className="form-group">
                                <label>Transaction Id: </label>
                                <input name="transactionId" className="form-control" value={newId} readOnly/>
                            </div>
                            <div className="form-group">
                                <label> Select Transaction Date: </label>
                                <input type="date" placeholder="yyyy-mm-dd" className="form-control"
                                    value={tdate} onChange={(event) => setTdate(event.target.value)} />
                            </div>
                            <div className="form-group">
                                <b>
                                    {parseInt(flag) === 1 ? <label>Enter Purchased Stock Quantity: </label> :
                                        <label>Enter Issued Stock Quantity: </label>}
                                </b>
                                <input placeholder="quantity" name="quantity" className="form-control"
                                    value={quantity} onChange={(event) => setQuantity(event.target.value)} />
                                {errors.quantity && <p style={{ color: "red" }}>{errors.quantity}</p>}
                            </div>
                            <div>
                               
                                <button type="button" className="btn btn-success" onClick={handleValidation}>
    Save
</button>
                                &nbsp;&nbsp;  <button className="btn btn-secondary" onClick={clearAll}>Reset</button>
                                &nbsp;&nbsp; &nbsp;&nbsp;<button className="btn btn-success" onClick={returnBack}>Return</button>
                            </div>
                        </div>
                    </form>
                    {transValue !== null && (
                        <div style={{ textAlign: "center" }}><b>Transaction Value: ₹{transValue}</b></div>
                    )}
                    {warns !== null && (
                        <div style={{ textAlign: "center", color: "red" }}>
                            <b>{warns}</b>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductStockEdit;

