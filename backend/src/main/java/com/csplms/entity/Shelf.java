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
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "shelfs"
        , uniqueConstraints ={
        @UniqueConstraint(columnNames = "name", name = "uk_shelf_name")
    }
)
public class Shelf {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer shelfId;

    private String name;

    private int availableCapacity;

    private int totalCapacity;

    private Date addedDate;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "added_by")
    @JsonManagedReference(value = "user-added-shelf")
    private User addedBy;

    private String description;

    private boolean present;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonManagedReference
    private Category category;

    @OneToMany(mappedBy = "shelf")
    @JsonBackReference
    private List<Book> books;

    public Shelf(String name, int availableCapacity, int totalCapacity, Date addedDate, String description, boolean present, Category category, User addedBy) {
        this.name = name;
        this.availableCapacity = availableCapacity;
        this.totalCapacity = totalCapacity;
        this.addedDate = addedDate;
        this.description = description;
        this.present = present;
        this.category = category;
        this.addedBy = addedBy;
    }

}
