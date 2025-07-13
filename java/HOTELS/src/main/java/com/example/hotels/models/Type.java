package com.example.hotels.models;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Type{
    @Id
    private int     typeId;
    private String typeName;

    // @JsonIgnore
    // @OneToMany(mappedBy = "type")
   // private List<Room> roomList = new ArrayList<>();
    ;
    //  @ManyToMany(mappedBy = "types")
    //private Set<Hotel> hotels;


    public int getTypeId() {
        return typeId;
    }
    public void setTypeId(int typeId) {
        this.typeId = typeId;
    }
    public String getTypeName() {
        return typeName;
    }
    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }
}