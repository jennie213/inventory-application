package com.infosys.inventoryApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.inventoryApplication.dao.TransactionDao;

@Service
public class TransactionService {
  @Autowired
  private TransactionDao transactionDao;
  
  public Long generateId() {
	 Long id = transactionDao.findMaxTransactionId();
	 if(id==null)
		 id = 100001L;
	 else {
		 id++;
	 }
	 return id;
  }
}
