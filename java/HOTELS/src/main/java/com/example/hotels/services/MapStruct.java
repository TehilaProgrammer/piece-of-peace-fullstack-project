package com.example.hotels.services;

import com.example.hotels.dto.HotelDTO;
import com.example.hotels.dto.OrderDTO;
import com.example.hotels.dto.RoomDTO;
import com.example.hotels.dto.UserDTO;
import com.example.hotels.models.Hotel;
import com.example.hotels.models.Order;
import com.example.hotels.models.Room;
import com.example.hotels.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = MapUser.class)
public interface MapStruct {

    static String DIRECTORY_URL = System.getProperty("user.dir") + "\\images\\";

    List<UserDTO> UsersToUserDTO(List<User> users);

    default UserDTO UserToDto(User user) throws IOException {
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(user.getUserId());
        userDTO.setPassword(user.getPassword());
        Path file = Paths.get(DIRECTORY_URL + user.getImageURL());
        userDTO.setImage(Files.readAllBytes(file));
        return userDTO;
    }

    List<HotelDTO> hotelsToDTO(List<Hotel> hotels);

    @Mapping(source = "roomList", target = "roomList") // מיפוי רשימת חדרים
    default HotelDTO HotelToDTO(Hotel hotel) throws IOException {
        HotelDTO hotelDTO = new HotelDTO();
        hotelDTO.setHotelId(hotel.getHotelId());
        hotelDTO.setHotelName(hotel.getHotelName());
        hotelDTO.setHotelAddress(hotel.getHotelAddress());
        hotelDTO.setStars(hotel.getStars());
        hotelDTO.setDescription(hotel.getDescription());
        hotelDTO.setImageURL(hotel.getImageURL());

        // המרת רשימת החדרים ל- List<RoomDTO>
        hotelDTO.setRoomDTOList(roomsToDTO(hotel.getRoomList()));  // המרה של חדרים ל- RoomDTO

        // המרת התמונה של המלון
        if (hotel.getImageURL() != null && !hotel.getImageURL().isEmpty()) {
            Path file = Paths.get(DIRECTORY_URL + hotel.getImageURL());
            if (Files.exists(file)) {
                hotelDTO.setImage(Files.readAllBytes(file)); // הוספת התמונה של המלון
            }
        } else {
            hotelDTO.setImage(new byte[0]);
        }

        return hotelDTO;
    }


    default RoomDTO RoomToDTO(Room room) throws IOException {
        RoomDTO roomDTO = new RoomDTO();
        roomDTO.setRoomId(room.getRoomId());
        roomDTO.setRoomNumber(room.getRoomNumber());
        roomDTO.setPriceOfNight(room.getPriceOfNight());
        roomDTO.setAvailability(room.isAvailability());
        roomDTO.setEtype(room.getEtype());
        roomDTO.setImageURL(room.getImageURL());

        if (room.getImageURL() != null && !room.getImageURL().isEmpty()) {
            Path file = Paths.get(DIRECTORY_URL + room.getImageURL());
            if (Files.exists(file)) {
                roomDTO.setImage(Files.readAllBytes(file));
            } else {
                System.out.println("File not found for room: " + room.getRoomId() + " at path: " + file.toString());
                roomDTO.setImage(new byte[0]);
            }
        } else {
            roomDTO.setImage(new byte[0]);
        }

        return roomDTO;
    }



    // פונקציה להמרת רשימת חדרים ל- RoomDTO
    default List<RoomDTO> roomsToDTO(List<Room> rooms) {
        return rooms.stream()
                .map(room -> {
                    try {
                        return RoomToDTO(room);  // קריאה לפונקציה להמיר חדר בודד ל- RoomDTO
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                })
                .collect(Collectors.toList());
    }


    @Mapping(source = "userId", target = "user.userId")
    Order DTOtoOrder(OrderDTO order);

    @Mapping(source = "user.userId", target = "userId")
    OrderDTO OrdertoDTO(Order order);
}
