//package com.abhi.LoginSignUp.features.agroagency.controller;

//import com.abhi.LoginSignUp.features.agroagency.model.Product;
//import com.abhi.LoginSignUp.features.agroagency.service.ProductService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//import java.io.IOException;
//import java.util.List;
//import java.util.Optional;

//@RestController
//@RequestMapping("/api/products")
//public class ProductController {

//    @Autowired
//    private ProductService productService;
//
//    @PostMapping("/add")
//    public ResponseEntity<Product> addProducts(
//            @RequestPart("product") Product product,
//            @RequestPart(value = "image", required = false) MultipartFile imageFile) throws IOException {
//        return ResponseEntity.ok(productService.addProduct(product, imageFile));
//    }

//    @GetMapping("/all")
//    public ResponseEntity<List<Product>> getAllProducts(){
//        return ResponseEntity.ok(productService.getAllProduct());
//    }

//    @GetMapping("/{id}")
//    public ResponseEntity<Product> getProductById(@PathVariable Long id){
//        Optional<Product> product = productService.getProductById(id);
//        return product.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//    }

//    @PutMapping("/{id}/update")
//    public ResponseEntity<Product> updateProduct(
//            @PathVariable Long id,
//            @RequestPart("product") Product updatedProduct,
//            @RequestPart(value = "image", required = false) MultipartFile imageFile
//    ) throws IOException {
//        return ResponseEntity.ok(productService.updateProduct(id, updatedProduct, imageFile));
//    }

//    @DeleteMapping("/{id}/delete")
//    public ResponseEntity<String> deleteProduct(@PathVariable Long id){
//        productService.deleteProduct(id);
//        return ResponseEntity.ok("Product deleted successfully");
//    }



//}
