package com.example.hotels.dto;

import com.example.hotels.models.Room;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;

import java.util.List;

public class HotelDTO {


    private Long hotelId;
    private String hotelName;
    private String hotelAddress;
    private String description;
    private int stars;
    private String imageURL;
    private byte[] image;
    private List<Room> roomList;

    public List<RoomDTO> getRoomDTOList() {
        return roomDTOList;
    }

    public void setRoomDTOList(List<RoomDTO> roomDTOList) {
        this.roomDTOList = roomDTOList;
    }

    private List<RoomDTO> roomDTOList;  // רשימה של RoomDTO


    public List<Room> getRoomList() {
        return roomList;
    }

    public void setRoomList(List<Room> roomList) {
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
