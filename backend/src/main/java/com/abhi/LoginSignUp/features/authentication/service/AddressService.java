package com.abhi.LoginSignUp.features.authentication.service;



import com.abhi.LoginSignUp.features.authentication.model.Address;
import com.abhi.LoginSignUp.features.authentication.model.AuthUser;
import com.abhi.LoginSignUp.features.authentication.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    public Address saveAddress(Address address, AuthUser user) {
        address.setUser(user);
        return addressRepository.save(address);
    }

    public List<Address> getUserAddresses(String email) {
        return addressRepository.findByUserEmail(email);
    }

    public boolean deleteAddress(Long id) {
        if (addressRepository.existsById(id)) {
            addressRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

