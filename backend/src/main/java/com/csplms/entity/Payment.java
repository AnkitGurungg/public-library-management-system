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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer paymentId;

    private Integer amount;

    private Date date;

    @Column(unique = true, columnDefinition = "uk_pidx")
    private String pidx;

    private String txnId;

    @OneToOne
    @JsonBackReference
    @JoinColumn(name = "fine_id")
    private Fine fine;

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Payment{");
        sb.append("paymentId=").append(paymentId);
        sb.append(", amount=").append(amount);
        sb.append(", pidx='").append(pidx).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
