package dk.ek.vinderneafquizzen.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Deltager {

    @Id
    @GeneratedValue
    private long id;
    private String name;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDate quizDate;

    public Deltager(){}

    public Deltager(String name){
        this.name = name;
        this.createdAt = LocalDateTime.now();
    }

    //getters
    public long getId(){return id;}
    public String getName(){return name;}
    public LocalDateTime getCreatedAt(){return createdAt;}
    public LocalDate getQuizDate(){return quizDate;}

    //setters
    public void setId(long id) {this.id = id;}
    public void setName(String name){this.name = name;}
    public void setCreatedAt(LocalDateTime createdAt){this.createdAt = createdAt;}
    public void setQuizDate(LocalDate quizDate){this.quizDate = quizDate;}
}