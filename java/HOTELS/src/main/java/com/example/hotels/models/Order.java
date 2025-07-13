package com.example.hotels.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;


@Entity
@Table(name = "orders")  // שינוי שם הטבלה ל-"orders"
public class Order {
    @Id
    @GeneratedValue
    private int ordertId;

private Date checkIn;
private Date checkOut;
private int numOfNight;
private double totalCost;
private  int hotelId;
    @JsonIgnore
    @ManyToOne
    @JoinColumn
    private User user;

    public int getOrdertId() {
        return ordertId;
    }

    public void setOrdertId(int ordertId) {
        this.ordertId = ordertId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

/*
@OneToMany
private List<Room> rooms;
*/
public Order(){

}
public Order(int ordertId, Date checkIn, Date checkOut, int numOfNight, double totalCost) {
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