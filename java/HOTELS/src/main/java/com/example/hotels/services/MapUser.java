package com.example.hotels.services;

import com.example.hotels.dto.UserDTO;
import com.example.hotels.models.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MapUser {

   // UserDTO ToUserDto(User user);
    User FromUserDto(UserDTO userDTO);
}
