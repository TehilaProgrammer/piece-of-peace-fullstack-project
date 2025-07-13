package com.example.hotels.dto;

import com.example.hotels.models.EnumType;
import com.example.hotels.models.Hotel;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class RoomDTO {
    private int roomId;

    private int roomNumber;
    private double priceOfNight;
    private boolean availability;
    private EnumType Etype;
    private String imageURL;
    private byte[] image;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    public int getRoomId() {
        return roomId;
    }

    public void setRoomId(int roomId) {
        this.roomId = roomId;
    }

    public int getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(int roomNumber) {
        this.roomNumber = roomNumber;
    }

    public double getPriceOfNight() {
        return priceOfNight;
    }

    public void setPriceOfNight(double priceOfNight) {
        this.priceOfNight = priceOfNight;
    }

    public boolean isAvailability() {
        return availability;
    }

    public void setAvailability(boolean availability) {
        this.availability = availability;
    }

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

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
