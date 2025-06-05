package com.csplms.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "borrow_records")
public class Borrow {

    @Id
    @GeneratedValue
    @Column(name = "borrow_id")
    private Integer borrowId;

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "book_id")
    @JsonManagedReference
    private Book borrowBooks;

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "user_id")
    @JsonManagedReference
    private User borrowUsers;

    private boolean returnStatus;

    private int borrowLimit;

    @Column(nullable = false, updatable = false)
    private Date borrowDate;

    @Column(nullable = false)
    private Date dueDate;

    private boolean extended;

    @OneToOne(cascade = {CascadeType.ALL}, mappedBy = "borrows")
    @JsonBackReference
    private Return returns;

    public Borrow(Book book, User user, boolean returnStatus, int borrowLimit, Date borrowDate, Date dueDate, boolean extended) {
        this.borrowBooks = book;
        this.borrowUsers = user;
        this.returnStatus = returnStatus;
        this.borrowLimit = borrowLimit;
        this.borrowDate = borrowDate;
        this.dueDate = dueDate;
        this.extended = extended;
    }

}
