import axios from 'axios';

const SKU_URL =  'http://localhost:9191/invent/sku';


   // Save SKU
export const saveSKU = (sku) => {
    return axios.post(SKU_URL, sku, 
        {
        withCredentials: true
    }
    );
};

   // Get all SKUs
export const getAllSKUs = () => {
    return axios.get(SKU_URL, 
        {
        withCredentials: true
    }
);
};
    
   
   // Get SKU by ID
export const getSKUById = (id) => {
    return axios.get(`${SKU_URL}/${id}`, 
        {
        withCredentials: true
    }
);
};
       
    
//  Delete SKU by ID
export const deleteSKUById = (id) => {
    return axios.delete(`${SKU_URL}/${id}`,
         {
        withCredentials: true
    }
);
};

// Update SKU
export const updateSKU = (sku) => {
  return axios.put(SKU_URL, sku, { withCredentials: true });
};

