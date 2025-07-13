package com.example.hotels.models;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
public class HotelRoomTypeLink implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "hotel_id")// nullable = false
    private Hotel hotel;

    @ManyToOne
    @JoinColumn(name = "room_type_id")// nullable = false
    private Type roomType;

    public HotelRoomTypeLink() {
    }

    public HotelRoomTypeLink(Hotel hotel, Type roomType) {
        this.hotel = hotel;
        this.roomType = roomType;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    public Type getRoomType() {
        return roomType;
    }

    public void setRoomType(Type roomType) {
        this.roomType = roomType;
    }
}
