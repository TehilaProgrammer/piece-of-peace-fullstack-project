package com.example.hotels.models;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
@Table(name = "ROOMS")
public class Room{
@Id
 private int roomId;

private int roomNumber;
private double priceOfNight;
private boolean availability;
private EnumType Etype;
private String imageURL;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;



    public EnumType getEtype() {
        return Etype;
    }

    public void setEtype(EnumType etype) {
        Etype = etype;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }


     // @JsonIgnore
    //@ManyToOne
    //@JoinColumn(name = "type_id")
    //private Type type;

//    @ManyToOne
//    private Room room;


public Room(){

}

 public Room( int roomId, int roomNumber, String roomType, double priceOfNight, int hotelId, boolean availability){
    this.roomId = roomId;
    this.roomNumber = roomNumber;
    this.priceOfNight = priceOfNight;
    this.availability = availability;
 }

 public int getRoomId() {return roomId;}
 public void setRoomId(int roomId) {this.roomId = roomId;}
 public int getRoomNumber() {return roomNumber;}
 public void setRoomNumber(int roomNumber) {this.roomNumber = roomNumber;}
 public double getPriceOfNight() {return priceOfNight;}
 public void setPriceOfNight(double priceOfNight) {this.priceOfNight = priceOfNight;}
 public boolean isAvailability() {return availability;}
 public void setAvailability(boolean availability) {this.availability = availability;}

}