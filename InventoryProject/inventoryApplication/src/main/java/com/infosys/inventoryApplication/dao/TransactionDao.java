package com.infosys.inventoryApplication.dao;

import com.infosys.inventoryApplication.bean.ProductSale;
import com.infosys.inventoryApplication.bean.Transaction;
import java.util.List;

public interface TransactionDao {
   public Transaction saveTransaction(Transaction transaction);
   public Transaction findTransactionById(Long id);
   public Long findMaxTransactionId();
   public List<Transaction> showAllTransaction();
   public List<Transaction> findTransactionsByType(String type);
   public void removeTransactionById(Long id);
   public List<Double> getDemandByProduct(String productId);
   public List<ProductSale> getProductWiseTotalSale();
   
   
}
