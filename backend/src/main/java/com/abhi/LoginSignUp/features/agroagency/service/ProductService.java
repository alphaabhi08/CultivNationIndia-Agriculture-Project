package com.abhi.LoginSignUp.features.agroagency.service;

import com.abhi.LoginSignUp.features.agroagency.model.Product;
import com.abhi.LoginSignUp.features.agroagency.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;



    public Product addProduct(Product product, MultipartFile imageFile) throws IOException {
        if(imageFile != null && !imageFile.isEmpty()){
            product.setImageName(imageFile.getOriginalFilename());
            product.setImageType(imageFile.getContentType());
            product.setImageData(imageFile.getBytes());
        }
        return productRepository.save(product);
    }

    public List<Product> getAllProduct(){
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id){
        return productRepository.findById(id);
    }

    public Product updateProduct(Long id, Product updatedProduct, MultipartFile imageFile) throws IOException {
        return productRepository.findById(id).map(product -> {
            product.setProdName(updatedProduct.getProdName());
            product.setProdTypes(updatedProduct.getProdTypes());
            product.setCurrMarketPrice(updatedProduct.getCurrMarketPrice());
            product.setBestPrice(updatedProduct.getBestPrice());
            product.setDescription(updatedProduct.getDescription());
            product.setInStock(updatedProduct.getInStock());

            if(imageFile != null && !imageFile.isEmpty()){
                try{
//                product.setImageName(imageFile.getOriginalFilename());
//                product.setImageType(imageFile.getContentType());
//                product.setImageData(imageFile.getBytes());
                    product.setImageName(imageFile.getOriginalFilename());
                    product.setImageType(imageFile.getContentType());
                    product.setImageData(imageFile.getBytes());
                } catch (IOException e) {
                    throw new RuntimeException("Error updating image", e);

                }
            }
            return productRepository.save(product);
        }).orElseThrow(() -> new IllegalArgumentException("Product not found with the Id: " + id));
    }

    public void deleteProduct(Long id){
        productRepository.deleteById(id);
    }

}
