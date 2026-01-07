package com.infosys.inventoryApplication.bean;

public class ProductSale {
private String productName;
private Double totalSaleValue;
public String getProductName() {
	return productName;
}

public ProductSale(){
	super();
}

public ProductSale(String productName, Double totalSaleValue) {
	super();
	this.productName = productName;
	this.totalSaleValue = totalSaleValue;
}

public void setProductName(String productName) {
	this.productName = productName;
}
public Double getTotalSaleValue() {
	return totalSaleValue;
}
public void setTotalSaleValue(Double totalSaleValue) {
	this.totalSaleValue = totalSaleValue;
}


}
