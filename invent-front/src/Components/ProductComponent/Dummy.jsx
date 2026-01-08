import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Dummy = () => {
 let navigate = useNavigate();

 useEffect(() => {  
    navigate('/product-add');
 }, [navigate]);
};

export default Dummy;