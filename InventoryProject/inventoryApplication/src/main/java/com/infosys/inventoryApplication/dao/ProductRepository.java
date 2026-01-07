package com.infosys.inventoryApplication.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.infosys.inventoryApplication.bean.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
	
	@Query("select max(productId) from Product")
	public String getMaxProductId();
	
	
}