package com.infosys.inventoryApplication.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.infosys.inventoryApplication.bean.SKU;

@Repository
public interface SKURepository extends JpaRepository<SKU, String> {
}