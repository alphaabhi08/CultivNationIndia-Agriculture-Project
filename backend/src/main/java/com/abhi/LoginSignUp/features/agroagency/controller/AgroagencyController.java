package com.abhi.LoginSignUp.features.agroagency.controller;

import com.abhi.LoginSignUp.features.agroagency.model.Agroagency;
import com.abhi.LoginSignUp.features.agroagency.model.Product;
import com.abhi.LoginSignUp.features.agroagency.service.AgroagencyService;
import com.abhi.LoginSignUp.features.agroagency.service.ProductService;
import com.abhi.LoginSignUp.features.authentication.dto.AuthResponseBody;
import com.abhi.LoginSignUp.features.authentication.utils.JsonWebToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/agroagency")
public class AgroagencyController {

    @Autowired
    private AgroagencyService agroagencyService;
    @Autowired
    private JsonWebToken jsonWebToken;
    @Autowired
    private ProductService productService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseBody> register (
            @RequestPart("agroagency") Agroagency agroagency,
            @RequestPart("certificateImage") MultipartFile certificateImage
            ) {
        if(certificateImage == null || certificateImage.isEmpty()){
            throw new IllegalArgumentException("Certificate image is required");
        }
        try {
            AuthResponseBody response = agroagencyService.register(agroagency, certificateImage);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(new AuthResponseBody(null, "Error processing image: " + e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new AuthResponseBody(null, e.getMessage()));
        }
    }

//    @PostMapping("/login")
//    public ResponseEntity<AuthResponseBody> login(@RequestBody Agroagency agroagency) {
//        try {
//            AuthResponseBody response = agroagencyService.login(agroagency.getEmail(), agroagency.getPassword());
//            return ResponseEntity.ok(response);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                    .body(new AuthResponseBody(null, e.getMessage()));
//        } catch (Exception e) {
//            e.printStackTrace(); // Log the full stack trace
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new AuthResponseBody(null, "An error occurred during login: " + e.getMessage()));
//        }
//    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseBody> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        try {
            AuthResponseBody response = agroagencyService.login(email, password);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponseBody(null, e.getMessage()));
        }
    }


    @GetMapping("/agro-profile")
    public Agroagency getAgro(@RequestAttribute("authenticatedAgro") Agroagency agroagency){
        return agroagencyService.getAgroUser(agroagency.getEmail());
    }



    @PutMapping("/{agroId}/update")
    public ResponseEntity<Agroagency> updateAgroProfile(@PathVariable Long agroId, @RequestBody Agroagency updateAgroDetails) {
        Agroagency updatedAgro = agroagencyService.updateAgroProfile(agroId, updateAgroDetails);
        return ResponseEntity.ok(updatedAgro);
    }

    @PostMapping("/products/add")
    public ResponseEntity<Product> addProducts(
            @RequestPart("product") Product product,
            @RequestPart(value = "prodImage", required = false) MultipartFile imageFile) throws IOException {
        return ResponseEntity.ok(productService.addProduct(product, imageFile));
    }

    @GetMapping("/products/all")
    public ResponseEntity<List<Product>> getAllProducts(){
        return ResponseEntity.ok(productService.getAllProduct());
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id){
        Optional<Product> product = productService.getProductById(id);
        return product.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PutMapping("/products/{id}/update")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestPart("product") Product updatedProduct,
            @RequestPart(value = "image", required = false) MultipartFile imageFile
    ) throws IOException {
        return ResponseEntity.ok(productService.updateProduct(id, updatedProduct, imageFile));
    }

    @DeleteMapping("/products/{id}/delete")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id){
        productService.deleteProduct(id);

        Map<String, String> response = new HashMap<>();
        response.put("Message", "Product deleted successfully!");

        return ResponseEntity.ok(response.toString());

    }

}
