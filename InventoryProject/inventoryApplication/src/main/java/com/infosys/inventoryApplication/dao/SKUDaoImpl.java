package com.infosys.inventoryApplication.dao;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.infosys.inventoryApplication.bean.SKU;

@Repository
public class SKUDaoImpl implements SKUDao {

    @Autowired
    private SKURepository repository;

    @Override
    public void saveSKU(SKU sku) {
        repository.save(sku);
    }

    @Override
    public List<SKU> getAllSKUs() {
        return repository.findAll();
    }

    @Override
    public SKU getSKUById(String id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void deleteSKUByID(String id) {
        repository.deleteById(id);
    }
    
    public void updateSKU(SKU sku) {
        repository.save(sku);
    }
   
}