import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './Components/LoginPage'; 
import RegisterUser from './Components/RegisterUser';
import AdminMenu from './Components/LoginComponent/AdminMenu';
import VendorMenu from './Components/LoginComponent/VendorMenu';
import ManagerMenu from './Components/LoginComponent/ManagerMenu';
import SKUReport from "./Components/SKUComponent/SKUReport";
import SKUEntry from "./Components/SKUComponent/SKUEntry";
import SKUEdit from "./Components/SKUComponent/SKUEdit";
import ProductEntry from './Components/ProductComponent/ProductEntry'; 
import ProductReport from './Components/ProductComponent/ProductReport';
import ProductPriceEdit from './Components/ProductComponent/ProductPriceEdit';
import Dummy from './Components/ProductComponent/Dummy';
import ProductStockEdit from './Components/ProductComponent/ProductStockEdit';
import TransactionReport from './Components/ProductComponent/TransactionReport';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
       <Routes>
        
         <Route path="/" element={<LoginPage />} />
         <Route path="/Register" element={<RegisterUser />} />
         <Route path="/AdminMenu" element={<AdminMenu />} />
         <Route path="/ManagerMenu" element={<ManagerMenu />} />
         <Route path="/VendorMenu" element={<VendorMenu />} />
         <Route path="/skuentry" element={<SKUEntry />} />
         <Route path="/skureport" element={<SKUReport />} />
         <Route path="/update-sku/:skuno" element={<SKUEdit/>} />
         <Route path="/product-add" element={<ProductEntry />} />
         <Route path="/orders" element={<ProductReport />} />        
         <Route path="/update-product/:id" element={<ProductPriceEdit />} />    
         <Route path="/dummy" element={<Dummy />} />    
         <Route path="/edit-stock/:id/:no" element={<ProductStockEdit />} />
         <Route path="/transactions" element={<TransactionReport />} />
         <Route path="/transactions/:type" element={<TransactionReport />} />

      
       </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
