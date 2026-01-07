package com.infosys.inventoryApplication.dao;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.infosys.inventoryApplication.bean.Product;

@Repository
public class ProductDaoImpl implements ProductDao {

    @Autowired
    private ProductRepository repository;

    @Override
    public void saveProduct(Product prod) {
        repository.save(prod);
    }

    @Override
    public List<Product> getALLProducts() {
        return repository.findAll();
    }

    @Override
    public Product getProductById(String productId) {
        return repository.findById(productId).orElse(null);
    }

    @Override
    public void deleteProductById(String productId) {
        repository.deleteById(productId);
    }
    
    @Override
    public String getMaxProductId() {
    	    return repository.getMaxProductId();
    }

    
}
