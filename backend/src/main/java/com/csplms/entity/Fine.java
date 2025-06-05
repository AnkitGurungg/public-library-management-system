package com.csplms.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "fines")
@NoArgsConstructor
@AllArgsConstructor
public class Fine {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer fineId;

    private long totalFine;

    private boolean paidStatus;

    @OneToOne
    @JoinColumn(name = "return_id")
    @JsonManagedReference
    private Return returns;

    @OneToOne(mappedBy = "fine")
    @JsonManagedReference
    private Payment payment;

    public Fine(long totalFine, boolean paidStatus, Return returns) {
        this.totalFine = totalFine;
        this.paidStatus = paidStatus;
        this.returns = returns;
    }

    public Fine(long totalFine, boolean paidStatus) {
        this.totalFine = totalFine;
        this.paidStatus = paidStatus;
    }

}
