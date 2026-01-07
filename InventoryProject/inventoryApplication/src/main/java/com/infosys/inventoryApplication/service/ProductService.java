//package com.infosys.inventoryApplication.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.infosys.inventoryApplication.bean.Product;
//import com.infosys.inventoryApplication.dao.ProductDao;
//
//@Service
//public class ProductService{
//	@Autowired
//	private ProductDao productDao;
//	
//	public Product setSalesPrice(Product product) {
//		double purchasePrice = product.getPurchasePrice();
//		double salesPrice = purchasePrice + purchasePrice * 0.20;
//		product.setSalesPrice(salesPrice);
//		return product;
//	}
//	
//	public String generateProductId() {
//		String id = productDao.getMaxProductId();
//		if(id == null) {
//			id = "P10001";	
//		}
//		else {
//			int x = Integer.parseInt(id.substring(1));
//			x++;
//			id = "P"+x;
//		}
//		return id;
//	}
//	
//	public Product stockEdit(Product product, Double qty, int flag) {
//      double stock = product.getStock();
//      boolean status = product.getStatus();
//       if(flag == 2){
//    	    stock = stock - qty;
//       }
//       else if(flag == 1) {
//    	    stock = stock + qty;
//       }
//       else {
//    	    status = false;
//       }
//       product.setStock(stock);
//       product.setStatus(status);
//      
//		
//		return product;
//	}
//}

package com.infosys.inventoryApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.inventoryApplication.bean.Product;
import com.infosys.inventoryApplication.dao.ProductDao;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductDao productDao;

    // 1️⃣ Auto-generate Product ID
//    public String generateProductId() {
//        String id = productDao.getMaxProductId();
//
//        if (id == null) {
//            return "P10001";
//        } else {
//            int x = Integer.parseInt(id.substring(1));
//            return "P" + (++x);
//        }
//    }
    public String generateProductId() {
        String id = productDao.getMaxProductId();

        
        if (id == null || id.isEmpty()) {
            return "P10001";
        }

       
        try {
            int num = Integer.parseInt(id.substring(1));
            return "P" + (num + 1);
        } catch (NumberFormatException e) {
           
            return "P10001";
        }
    }



    // 2️⃣ Calculate sales price
    public Product setSalesPrice(Product product) {
        double purchasePrice = product.getPurchasePrice();
        double salesPrice = purchasePrice + (purchasePrice * 0.20);
        product.setSalesPrice(salesPrice);
        return product;
    }

    // 3️⃣ Save product 
    public void addProduct(Product product) {
        product = setSalesPrice(product);
        product.setStatus(true);   // active by default
        productDao.saveProduct(product);
    }

    // 4️⃣ Stock edit 
    public Product stockEdit(Product product, Double qty, int flag) {
        double stock = product.getStock();
        boolean status = product.getStatus();

        if (flag == 2) {
            stock -= qty;
        } else if (flag == 1) {
            stock += qty;
        } else {
            status = false;
        }

        product.setStock(stock);
        product.setStatus(status);
        return product;
    }
    
    public List<Product> getALLProducts() {
        return productDao.getALLProducts();
    }

    public Product getProductById(String productId) {
        return productDao.getProductById(productId);
    }

    public void deleteProductById(String productId) {
        productDao.deleteProductById(productId);
    }

    public void updateProduct(Product product) {
        setSalesPrice(product);
        productDao.saveProduct(product);
    }

}
