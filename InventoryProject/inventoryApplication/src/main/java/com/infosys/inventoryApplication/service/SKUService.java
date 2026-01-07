package com.infosys.inventoryApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.inventoryApplication.bean.SKU;
import com.infosys.inventoryApplication.dao.SKUDao;

import java.util.List;

@Service
public class SKUService {

    @Autowired
    private SKUDao skuDao;

    public void saveSKU(SKU sku) {
        skuDao.saveSKU(sku);
    }

    public List<SKU> getAllSKUs() {
        return skuDao.getAllSKUs();
    }

    public SKU getSKUById(String id) {
        return skuDao.getSKUById(id);
    }

    public void deleteSKUByID(String id) {
        skuDao.deleteSKUByID(id);
    }
}
