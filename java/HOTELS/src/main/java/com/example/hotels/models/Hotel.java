package com.example.hotels.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.*;
import java.util.List;


@Entity
@Table(name = "HOTELS")
public class Hotel {

    @Id
    @GeneratedValue
    private Long hotelId;

    private String hotelName;
    private String hotelAddress;
    private String description;
    private int stars;
    private String imageURL;

    @JsonIgnore
    @OneToMany(mappedBy = "hotel", fetch = FetchType.LAZY)
    private List<Room> roomList;

    @JsonIgnore
    @OneToMany(mappedBy = "hotel")
    private List<Response> responseList;

//    @ManyToMany
//    @JoinTable(
//            name = "hotel_room_type",
//            joinColumns = @JoinColumn(name = "hotel_id"),
//            inverseJoinColumns = @JoinColumn(name = "room_type_id")
//    )
//    private List<Type> types  = new List<Type>() {


    public Hotel() {

    }

    public Hotel(int hotelId, String hotelName, String hotelAddress, String description, int stars, String imageURL, List<Room> roomList) {
        this.hotelName = hotelName;
        this.hotelAddress = hotelAddress;
        this.description = description;
        this.stars = stars;
        this.imageURL = imageURL;
        this.roomList = roomList;
    }

    public Long getHotelId() {
        return hotelId;
    }

    public void setHotelId(Long hotelId) {
        this.hotelId = hotelId;
    }

    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public String getHotelAddress() {
        return hotelAddress;
    }

    public void setHotelAddress(String hotelAddress) {
        this.hotelAddress = hotelAddress;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getStars() {
        return stars;
    }

    public void setStars(int stars) {
        this.stars = stars;

    }

    public List<Room> getRoomList() {
        return roomList;
    }

    public void setRoomList(List<Room> roomList) {
        this.roomList = roomList;
    }

    public String getImageURL() {
        return this.imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }


}