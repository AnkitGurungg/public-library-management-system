package com.csplms.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(
        name = "users",
        uniqueConstraints ={
                @UniqueConstraint(columnNames = "email", name = "uk_email"),
        },
        indexes = {
                @Index(name = "idx_users_email", columnList = "email")
        }
)
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    private String name;

    private String contactNumber;

    private String email;

    private String address;

    @JsonIgnore
    private String password;

    @Transient
    @JsonIgnore
    private String confirmPassword;

    private String roles;

    private Date appliedDate;

    private Date verifiedDate;

    private boolean isProfileUpdated;

    private boolean verified;

    private boolean present;

    @JsonIgnore
    private String otp;

    @JsonIgnore
    private LocalDateTime otpGeneratedTime;

    private boolean active;

    @OneToMany(mappedBy = "addedBy", cascade = CascadeType.ALL)
    @JsonBackReference(value = "user-added")
    private List<Book> booksAdded;

    @OneToMany(mappedBy = "addedBy", cascade = CascadeType.ALL)
    @JsonBackReference(value = "user-added-category")
    private List<Category> categoryAdded;

    @OneToMany(mappedBy = "addedBy", cascade = CascadeType.ALL)
    @JsonBackReference(value = "user-added-shelf")
    private List<Shelf> shelfAdded;

    @OneToMany(mappedBy = "borrowUsers", fetch = FetchType.EAGER)
    @JsonBackReference
    private List<Borrow> borrows;

    @OneToOne(mappedBy = "user", fetch = FetchType.EAGER)
    @JsonManagedReference
    private Evidence evidence;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<WishList> userWishLists;

//    Verify member
    @ManyToOne
    @JoinColumn(name = "verified_by")
    @JsonManagedReference(value = "user-verified")
    private User verifiedBy;

    @OneToMany(mappedBy = "verifiedBy", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonBackReference(value = "user-verified")
    private List<User> usersVerified;

//    For email registration
    public User(String email, String password, String roles, boolean verified, boolean present, String otp, LocalDateTime otpGeneratedTime, boolean active) {
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.verified = verified;
        this.present = present;
        this.otp = otp;
        this.otpGeneratedTime = otpGeneratedTime;
        this.active = active;
    }

//    for KYC
    public User(String name, String contactNumber, String address, Date appliedDate, Date verifiedDate, boolean isProfileUpdated) {
        this.name = name;
        this.contactNumber = contactNumber;
        this.address = address;
        this.appliedDate = appliedDate;
        this.verifiedDate = verifiedDate;
        this.isProfileUpdated = isProfileUpdated;
    }

//    for add librarian
    public User(String name, String contactNumber, String email, String address, String password, String roles, Date appliedDate, Date verifiedDate, boolean isProfileUpdated, boolean verified, boolean present, boolean active) {
        this.name = name;
        this.contactNumber = contactNumber;
        this.email = email;
        this.address = address;
        this.password = password;
        this.roles = roles;
        this.appliedDate = appliedDate;
        this.verifiedDate = verifiedDate;
        this.isProfileUpdated = isProfileUpdated;
        this.verified = verified;
        this.present = present;
        this.active = active;
    }

}
