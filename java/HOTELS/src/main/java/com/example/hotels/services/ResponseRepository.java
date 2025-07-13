package com.example.hotels.services;

import com.example.hotels.models.Response;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResponseRepository extends JpaRepository<Response, Long> {
    List<Response> findAllByHotel_HotelId(Long hotelId);

}
