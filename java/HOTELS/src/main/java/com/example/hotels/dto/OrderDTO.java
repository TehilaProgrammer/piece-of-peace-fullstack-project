package com.example.hotels.dto;

import com.example.hotels.models.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;


 // שינוי שם הטבלה ל-"orders"
public class OrderDTO {

private int ordertId;
private Date checkIn;
private Date checkOut;
private int numOfNight;
private double totalCost;
private  int hotelId;
private  long userId;

     public long getUserId() {
         return userId;
     }

     public void setUserId(long userId) {
         this.userId = userId;
     }

     public int getOrdertId() {
        return ordertId;
    }

    public void setOrdertId(int ordertId) {
        this.ordertId = ordertId;
    }





/*
@OneToMany
private List<Room> rooms;
*/
public OrderDTO(){

}
public OrderDTO(int ordertId, Date checkIn, Date checkOut, int numOfNight, double totalCost) {
    this.ordertId = ordertId;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.numOfNight = numOfNight;
    this.totalCost = totalCost;

}
public int getOrderId() {
    return ordertId;
}
public void setOrderId(int ordertId) {
    this.ordertId = ordertId;
}
public Date getCheckIn() {
    return checkIn;
}
public void setCheckIn(Date checkIn) {
    this.checkIn = checkIn;
}
public Date getCheckOut() {
    return checkOut;
}
public void setCheckOut(Date checkOut) {
    this.checkOut = checkOut;
}
public int getNumOfNight() {
    return numOfNight;
}
public void setNumOfNight(int numOfNight) {
    this.numOfNight = numOfNight;
}
public double getTotalCost() {
    return totalCost;
}
public void setTotalCost(double totalCost) {
    this.totalCost = totalCost;
}
public int getHotelId() {
    return hotelId;
}
public void setHotelId(int hotelId) {
    this.hotelId = hotelId;
}


}