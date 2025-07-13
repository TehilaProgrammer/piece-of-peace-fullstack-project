package com.example.hotels.services;

import com.example.hotels.models.EnumType;
import com.example.hotels.models.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.awt.*;

public interface RoomRepository extends JpaRepository<Room, Long> {
//    List<Room> findByPriceOfNightLessThanEqual(double maxPrice);
//    List<Room> findByAvailability(boolean availability);
//    List<Room> findByEtype(EnumType etype);
//
//
//    @Query("SELECT r FROM Room r WHERE r.priceOfNight <= :maxPrice AND r.etype = :etype")
//    List<Room> findRoomsByPriceAndType(@Param("maxPrice") double maxPrice, @Param("etype") EnumType etype);


}
