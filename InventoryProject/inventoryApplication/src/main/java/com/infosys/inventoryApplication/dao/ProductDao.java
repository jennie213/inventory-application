package com.infosys.inventoryApplication.dao;

import java.util.List;
import com.infosys.inventoryApplication.bean.Product;

public interface ProductDao {
    public void saveProduct(Product prod);
    public List<Product> getALLProducts();
    public String getMaxProductId();
    public Product getProductById(String productId);
    public void deleteProductById(String productId);
     
}
