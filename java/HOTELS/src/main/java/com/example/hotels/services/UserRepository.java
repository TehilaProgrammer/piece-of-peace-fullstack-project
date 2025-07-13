package com.example.hotels.services;

import com.example.hotels.models.Order;
import com.example.hotels.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserName(String userName);
    boolean existsByUserName(String userName);
}
