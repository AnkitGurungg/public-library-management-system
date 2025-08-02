package com.csplms.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(
        name = "categories",
        uniqueConstraints ={
                @UniqueConstraint(columnNames = "name", name = "uk_cat_name")
        },
        indexes = {
                @Index(name = "idx_categories_name", columnList = "name")
        }
)
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer categoryId;

    private String name;

    private String startingNumber;

    private String endingNumber;

    private String description;

    private Date addedDate;

    private boolean present;

//    M Category -> 1 User
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "added_by")
    @JsonManagedReference(value = "user-added-category")
    private User addedBy;

    // 1 Category -> M Book
    @OneToMany(mappedBy = "category", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JsonBackReference
    private List<Book> books;

    // 1 Category -> M shelf
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Shelf> shelfs;

    public Category(String name, String startingNumber, String endingNumber, String description, Date addedDate, boolean present, User addedBy) {
        this.name = name;
        this.startingNumber = startingNumber;
        this.endingNumber = endingNumber;
        this.description = description;
        this.addedDate = addedDate;
        this.present = present;
        this.addedBy = addedBy;
    }

}
