package com.infosys.inventoryApplication.dao;

import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.infosys.inventoryApplication.bean.ProductSale;
import com.infosys.inventoryApplication.bean.Transaction;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@Service
@Repository

public class TransactionDaoImpl implements TransactionDao {
  @Autowired
  private TransactionRepository repository;
  
  @Override
  public Transaction findTransactionById(Long id) {
	  return repository.findById(id).get();
	  
  }
  @Override
  public Long findMaxTransactionId() {
	  return repository.findMaxTransactionId();
  }
  @Override
  public List<Transaction> showAllTransaction(){
	  return repository.findAll();
  }
  @Override
  public Transaction saveTransaction(Transaction transaction) {
	return repository.save(transaction);
	
  }
  @Override
  public List<Transaction> findTransactionsByType(String type) {
	
	return repository.findTransactionsByType(type);
  }
  @Override
  public void removeTransactionById(Long id) {
	repository.deleteById(id);
	
  }
  @Override
  public List<Double> getDemandByProduct(String productId) {
	
	return repository.getDemandByProduct(productId);
  }
  
  public List<ProductSale> getProductWiseTotalSale(){
	return repository.getProductWiseTotalSale();
	  
  }
  
}
