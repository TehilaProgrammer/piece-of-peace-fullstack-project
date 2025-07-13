package com.example.hotels.models;

import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import com.example.hotels.models.Order;

import java.util.List;

@Entity
@Table(name = "USERS")
public class User{
    @Id
    @GeneratedValue
    private Long userId;


    private String userName;
    private String password;
    private String fullName;
    private String email;
    private String phoneNumber;
    private int totalOfPoint;
    private  String imageURL;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Order> ordertList;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Response> responseListList;




    public User(Long userId, String userName, String password, String fullName, String email, String phoneNumber, int totalOfPoint) {
        this.userId = userId;
        this.userName = userName;
        this.password = password;
        this.fullName = fullName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        if(totalOfPoint != 0){
            this.totalOfPoint=totalOfPoint;
        }else {
            this.totalOfPoint=0;
        }

    }
    public User(){

    }
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getFullName() {
        return fullName;
    }
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public int getTotalOfPoint() {
        return totalOfPoint;
    }
    public void setTotalOfPoint(int totalOfPoint) {
        this.totalOfPoint = totalOfPoint;
    }
   public String getImageURL(){
        return imageURL;
   }
   public void setImageURL(String imageURL){
        this.imageURL = imageURL;
   }
   public List<Order> getOrderList() {
        return ordertList;
   }
   public void setOrderList(List<Order> ordertList) {
        this.ordertList = ordertList;
   }
   public List<Response> getResponseListList() {
        return responseListList;
   }
   public void setResponseListList(List<Response> responseListList) {
        this.responseListList = responseListList;
   }




}
