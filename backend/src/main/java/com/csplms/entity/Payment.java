package com.csplms.entity;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonBackReference;

import java.sql.Date;

@Getter
@Setter
@Entity
@Table(name = "payments")
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer paymentId;

    private Integer amount;

    private Date date;

    private String pidx;

    private String txnId;

    private String tidx;

    @OneToOne
    @JsonBackReference
    @JoinColumn(name = "fine_id")
    private Fine fine;

}
