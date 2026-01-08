// import React, { useEffect, useState } from "react";
// import { findTransactionsByType, showAllTransactions }  from "../../Services/TransactionService";
// import { useParams, useNavigate } from "react-router-dom";


// const TransactionReport = () => {

//     const [transactions, setTransactions] = useState([]);
//     const navigate = useNavigate();
//     const { type } = useParams();

//     useEffect(() => {
//     if (type) {
//         findTransactionsByType(type)
//             .then(res => setTransactions(res.data));
//     } else {
//         showAllTransactions()
//             .then(res => setTransactions(res.data));
//     }
//     }, [type]);


//     return (
//         <div className="container mt-4">
//             <h2 className="text-center mb-4">Transaction Report</h2>

//             <table className="table table-bordered table-striped text-center">
//                 <thead className="table-dark">
//                     <tr>
//                         <th>Transaction ID</th>
//                         <th>Type</th>
//                         <th>Product ID</th>
//                         <th>Rate</th>
//                         <th>Quantity</th>
//                         <th>Transaction Value</th>
//                         <th>User ID</th>
//                         <th>Transaction Date</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {transactions.length === 0 ? (
//                         <tr>
//                             <td colSpan="8">No Transactions Found</td>
//                         </tr>
//                     ) : (
//                         transactions.map((tx) => (
//                             <tr key={tx.transactionId}>
//                                 <td>{tx.transactionId}</td>
//                                 <td>
//                                     {tx.transactionType === "IN" ? (
//                                         <span className="text-success"><b>PURCHASE</b></span>
//                                     ) : (
//                                         <span className="text-danger"><b>ISSUE</b></span>
//                                     )}
//                                 </td>
//                                 <td>{tx.productId}</td>
//                                 <td>₹{tx.rate}</td>
//                                 <td>{tx.quantity}</td>
//                                 <td><b>₹{tx.transactionValue}</b></td>
//                                 <td>{tx.userId}</td>
//                                 <td>
//                                     {new Date(tx.transactionDate).toLocaleDateString()}
//                                 </td>
//                             </tr>
//                         ))
//                     )}
//                 </tbody>
//             </table>
//             <div className="text-center mt-4">
//     <button
//         className="btn btn-danger"
//         onClick={() => navigate(-1)}
//     >
//         Return
//     </button>
// </div>

//         </div>
//     );
// };

// export default TransactionReport;

import React, { useEffect, useState } from "react";
import { findTransactionsByType, showAllTransactions } from "../../Services/TransactionService";
import { useParams, useNavigate } from "react-router-dom";

const TransactionReport = () => {
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();
    const { type } = useParams();

    useEffect(() => {
        if (type) {
            findTransactionsByType(type)
                .then(res => setTransactions(res.data));
        } else {
            showAllTransactions()
                .then(res => setTransactions(res.data));
        }
    }, [type]);

    // Dynamic heading based on transaction type
    const getHeading = () => {
        if (type === "IN") return "Stock Purchase Report";
        if (type === "OUT") return "Stock Issue Report";
        return "Transaction Report";
    }

    return (
        <div className="product-report-wrapper">
            <div className="product-report-header">
                <h1>{getHeading()}</h1>
            </div>

            <table className="table table-bordered table-striped text-center">
                <thead className="table-dark">
                    <tr>
                        <th>Transaction ID</th>
                        <th>Type</th>
                        <th>Product ID</th>
                        <th>Rate</th>
                        <th>Quantity</th>
                        <th>Transaction Value</th>
                        <th>User ID</th>
                        <th>Transaction Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length === 0 ? (
                        <tr>
                            <td colSpan="8">No Transactions Found</td>
                        </tr>
                    ) : (
                        transactions.map((tx) => (
                            <tr key={tx.transactionId}>
                                <td>{tx.transactionId}</td>
                                <td>
                                    {tx.transactionType === "IN" ? (
                                        <span className="text-success"><b>PURCHASE</b></span>
                                    ) : (
                                        <span className="text-danger"><b>ISSUE</b></span>
                                    )}
                                </td>
                                <td>{tx.productId}</td>
                                <td>₹{tx.rate}</td>
                                <td>{tx.quantity}</td>
                                <td><b>₹{tx.transactionValue}</b></td>
                                <td>{tx.userId}</td>
                                <td>{new Date(tx.transactionDate).toLocaleDateString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="text-center mt-4">
                <button
                    className="btn btn-danger"
                    onClick={() => navigate(-1)}
                >
                    Return
                </button>
            </div>
        </div>
    );
};

export default TransactionReport;
