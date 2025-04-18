package com.abhi.LoginSignUp.features.agroagency.model;

import com.abhi.LoginSignUp.features.authentication.model.AuthUser.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Agroagency {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    private String agencyName;
    @Email
    @NotNull
    @Column(unique = true)
    private String email;
    private String password;
    private String mobile;
    private String district;
    private String town;
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.AGROAGENCY;

    private String imageName;
    private String imageType;

    @Lob
    @Basic(fetch = FetchType.LAZY)
//    @Basic(fetch = FetchType.EAGER)
    private byte[] imageData;

    @Enumerated(EnumType.STRING)
    private AccountStatus accountStatus = AccountStatus.PENDING;

    public enum AccountStatus {
        PENDING,
        REJECTED,
        APPROVED
    }

    public Agroagency(Long id, String agencyName, String email, String password, String mobile, String district,
                      String town, String address, Role role, AccountStatus accountStatus) {
        this.id = id;
        this.agencyName = agencyName;
        this.email = email;
        this.password = password;
        this.mobile = mobile;
        this.district = district;
        this.town = town;
        this.address = address;
        this.role = role;
        this.accountStatus = accountStatus;
    }

}
