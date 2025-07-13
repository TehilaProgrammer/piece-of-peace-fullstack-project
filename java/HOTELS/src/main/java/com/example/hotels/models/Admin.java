package com.example.hotels.models;

import jakarta.persistence.Entity;

@Entity
public class Admin extends User {
    private String adminRole;


    public Admin(Long userId, String userName, String password, String fullName, String email, String phoneNumber, int totalOfPoint, String adminRole) {
        super(userId, userName, password, fullName, email, phoneNumber, totalOfPoint);
        this.adminRole = adminRole;
    }

    public Admin() {

    }
}