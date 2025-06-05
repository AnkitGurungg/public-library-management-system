package com.csplms.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@Table
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class WishList {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long wishListId;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "book_id")
    private Book book;

    private Date addedDate;

    public WishList(User user, Book book, Date addedDate) {
        this.user = user;
        this.book = book;
        this.addedDate = addedDate;
    }

}
