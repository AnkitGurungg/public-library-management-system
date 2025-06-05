package com.csplms.entity;

import lombok.*;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.sql.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "books"
        , uniqueConstraints ={
        @UniqueConstraint(columnNames = "title", name = "uk_title")
    }
)
@AllArgsConstructor
@NoArgsConstructor
public class Book {

    @Id
    @GeneratedValue
    private Integer bookId;

    private String isbn;

    private String title;

    private String author;

    private String language;

    private String edition;

    private int pageCount;

    private int availableQuantity;

    private int totalQuantity;

    private Date publishedDate;

    private float price;

    private String imageURL;

    @Lob
    private String description;

    private Date addedDate;

    private boolean available;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "added_by")
    @JsonBackReference(value = "user-added")
    private User addedBy;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "category_id")
    @JsonManagedReference
    private Category category;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinColumn(name = "shelf_id")
    @JsonManagedReference
    private Shelf shelf;

    @OneToMany(mappedBy = "borrowBooks")
    @JsonBackReference
    private List<Borrow> borrows;

    @OneToMany(mappedBy = "book")
    @JsonBackReference
    private List<WishList> booksWishList;

//    For add book
    public Book(String isbn, String title, String author, String language, String edition, int pageCount, int availableQuantity, int totalQuantity, Date publishedDate, float price, String imageURL, String description, Date addedDate, boolean available, Category category, Shelf shelf, User addedBy) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.language = language;
        this.edition = edition;
        this.pageCount = pageCount;
        this.availableQuantity = availableQuantity;
        this.totalQuantity = totalQuantity;
        this.publishedDate = publishedDate;
        this.price = price;
        this.imageURL = imageURL;
        this.description = description;
        this.addedDate = addedDate;
        this.available = available;
        this.category = category;
        this.shelf = shelf;
        this.addedBy = addedBy;
    }

}
