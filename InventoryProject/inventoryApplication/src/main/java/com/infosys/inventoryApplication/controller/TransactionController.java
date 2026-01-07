package com.infosys.inventoryApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.inventoryApplication.bean.ProductSale;
import com.infosys.inventoryApplication.bean.Transaction;
import com.infosys.inventoryApplication.dao.TransactionDao;
import com.infosys.inventoryApplication.service.TransactionService;

@RestController
@RequestMapping("/invent")
@CrossOrigin(origins = "http://localhost:3131", allowCredentials = "true")

public class TransactionController {
	
@Autowired
private TransactionDao transactionDao;
 
@Autowired
private TransactionService service;

//@PostMapping("/stock")
//public void saveTransaction(@RequestBody Transaction transaction) {
//	transactionDao.saveTransaction(transaction);
//}
@PostMapping("/stock")
public Transaction saveTransaction(@RequestBody Transaction transaction) {
    return transactionDao.saveTransaction(transaction);
}

@GetMapping("/stock/{id}")
public Transaction findTransactionById(@PathVariable Long id) {
	return transactionDao.findTransactionById(id);
}

@GetMapping("/stock")
public List<Transaction> showAllTransaction() {
	return transactionDao.showAllTransaction();
}

@DeleteMapping("/stock/{id}")
public void removeTransactionById(@PathVariable Long id) {
	transactionDao.removeTransactionById(id);
}

@GetMapping("/trans")
public Long generateId() {
	return service.generateId();
}

@GetMapping("/trans/{type}")
public List<Transaction> findTransactionsByType(@PathVariable String type){
	return transactionDao.findTransactionsByType(type);
}

@GetMapping("/analysis/{id}")
public List<Double> getDemandByProduct(@PathVariable String id){
	return transactionDao.getDemandByProduct(id);
}

@GetMapping("/analysis")
public List<ProductSale> getProductWiseTotalSale(){
	return transactionDao.getProductWiseTotalSale();
}

}
