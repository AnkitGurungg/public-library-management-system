package com.csplms.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "return_records")
public class Return {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer returnId;

    @Column(nullable = false, updatable = false)
    private Date returnDate;

    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "borrow_id", referencedColumnName = "borrow_id", nullable = false)
    @JsonManagedReference
    private Borrow borrows;

    @OneToOne(mappedBy = "returns")
    @JsonBackReference
    private Fine fine;

}
