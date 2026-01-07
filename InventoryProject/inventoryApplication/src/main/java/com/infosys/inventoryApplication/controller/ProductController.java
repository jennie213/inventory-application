//package com.infosys.inventoryApplication.controller;
//
//import java.util.List;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import com.infosys.inventoryApplication.bean.Product;
//import com.infosys.inventoryApplication.dao.ProductDao;
//import com.infosys.inventoryApplication.service.ProductService;
//
//@RestController
//@RequestMapping("/invent/")
//@CrossOrigin(origins = "http://localhost:3131", allowCredentials = "true")
//public class ProductController {
//    
//    @Autowired
//    private ProductDao productDao;
//    
//    @Autowired
//    private ProductService productService;
//    
//    @GetMapping("/product/generate-id")
//    public String generateProductId() {
//        return productService.generateProductId();
//    }
//
//    @PostMapping("/product")
//    public void saveProduct(@RequestBody Product prod) {
//    	   productService.setSalesPrice(prod); //updated
//    	   productDao.saveProduct(prod);
//    }
//
//    @GetMapping("/product")
//    public List<Product> getALLProducts() {
//        return productDao.getALLProducts();
//    }
//
//    @GetMapping("/product/{id}")
//    public Product getProductById(@PathVariable String id) {
//        return productDao.getProductById(id);
//    }
//
//    @DeleteMapping("/product/{id}")
//    public void deleteProductById(@PathVariable String id) {
//        productDao.deleteProductById(id);
//    }
//    
//    @PutMapping("/product")
//    public void updateProduct(@RequestBody Product prod) {
//    	     productService.setSalesPrice(prod); //updated
//         productDao.saveProduct(prod);
//    }
//}
package com.infosys.inventoryApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.infosys.inventoryApplication.bean.Product;
import com.infosys.inventoryApplication.service.ProductService;

@RestController
@RequestMapping("/invent")
@CrossOrigin(origins = "http://localhost:3131", allowCredentials = "true")
public class ProductController {

    @Autowired
    private ProductService productService;

    // 1️⃣ Auto-generate Product ID 
    @GetMapping("/product/generate-id")
    public String generateProductId() {
        return productService.generateProductId();
    }

    // 2️⃣ Add new product
    @PostMapping("/product")
    public void saveProduct(@RequestBody Product product) {
        productService.addProduct(product);
    }

    // 3️⃣ Get all products
    @GetMapping("/product")
    public List<Product> getALLProducts() {
        return productService.getALLProducts();
    }

    // 4️⃣ Get product by ID
    @GetMapping("/product/{id}")
    public Product getProductById(@PathVariable String id) {
        return productService.getProductById(id);
    }

    // 5️⃣ Delete product
    @DeleteMapping("/product/{id}")
    public void deleteProductById(@PathVariable String id) {
        productService.deleteProductById(id);
    }

    // 6️⃣ Update product
    @PutMapping("/product")
    public void updateProduct(@RequestBody Product product) {
        productService.updateProduct(product);
    }
}
