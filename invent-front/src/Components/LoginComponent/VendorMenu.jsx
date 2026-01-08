import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import '../../DisplayView.css';
import { logoutUser, getUserDetails, getRole, getUsersByRole, getUserId } from '../../Services/LoginService';

const VendorMenu = () => {
    const navigate = useNavigate();
    const [vendor, setVendor] = useState({
        name: '',
        email: '',
        username: '',
        role: '',
        age: 0
    });

    const handleLogout = () => {
        logoutUser()
            .then(() => {
                localStorage.clear();
                sessionStorage.clear();
                navigate('/');
            });
    };

    
useEffect(() => {
        const fetchVendor = async () => {
            try {
               
                const userRes = await getUserDetails();

                setVendor({
                    name: userRes.data?.username || 'Unknown',
                    email: userRes.data?.email || 'unknown@example.com',
                    username: userRes.data?.username || 'Unknown',
                    role: 'Vendor',
                    age: Math.floor(Math.random() * 20) + 25 
                });
            } catch (err) {
                console.error('Error fetching vendor info', err);
            }
        };
        fetchVendor();
    }, []);

    return (
        <div className="container-fluid">
            <div className="row justify-content-center mt-4">
                <div className="col-md-5">
                    <div className="card vendor-menu-card shadow-lg">
                        <div className="card-header bg-warning text-dark text-center">
                            <h1>Vendor Profile</h1>
                        </div>
                        <div className="card-body">
                            <div className="text-center mb-4">
                                <i className="fas fa-user-circle fa-5x mb-3 text-info"></i>
                            </div>
                            <table className="table table-borderless">
                                <tbody>
                                    <tr>
                                        <th>Name:</th>
                                        <td>{vendor.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Username:</th>
                                        <td>{vendor.username}</td>
                                    </tr>
                                    <tr>
                                        <th>Email:</th>
                                        <td>{vendor.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Role:</th>
                                        <td>{vendor.role}</td>
                                    </tr>
                                    <tr>
                                        <th>Age:</th>
                                        <td>{vendor.age}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-center mt-4">
                                <button 
                                    className="btn btn-danger btn-lg"
                                    onClick={handleLogout}
                                >
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

export default VendorMenu;

