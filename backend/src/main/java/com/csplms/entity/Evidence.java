package com.csplms.entity;

import lombok.Data;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonBackReference;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "evidences")
public class Evidence {

    @Id
    @GeneratedValue
    private Integer evidenceId;

    private String userImage;

    private String evidenceOne;

    private String evidenceTwo;

    private String documentType;

    private String description;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;
}
