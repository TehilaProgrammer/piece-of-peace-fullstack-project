package com.example.hotels.controller;

import com.example.hotels.dto.HotelDTO;
import com.example.hotels.dto.RoomDTO;
import com.example.hotels.models.Hotel;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotels.models.Room;
import com.example.hotels.services.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import java.util.List;

@RestController
@RequestMapping("api/room")
@CrossOrigin
public class RoomController {

    private RoomRepository roomRepository;
    private MapStruct mapper;

    static String DIRECTORY_URL=System.getProperty("user.dir")+"\\images\\";

    public RoomController(RoomRepository roomRepository,MapStruct mapper){
        this.roomRepository=roomRepository;
        this.mapper=mapper;
    }


    @GetMapping("/GetRoom")
    public ResponseEntity<List<Room>>getRoom(){
        return new ResponseEntity<>(roomRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/roomById/{id}")
    public ResponseEntity<RoomDTO> getRoomById(@PathVariable Long id) throws IOException {
        Room c=roomRepository.findById(id).orElse(null);
        if(c==null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(mapper.RoomToDTO(c),HttpStatus.OK);
    }

    @PostMapping("/addRoom")
    public ResponseEntity<Room> addRoom(@RequestBody Room room){
        Room c=roomRepository.save(room);
        return new ResponseEntity<>(c,HttpStatus.CREATED);
    }

    @PutMapping("/updateRoom/{id}")
    public ResponseEntity<Room> updateRoom(@RequestBody Room room,@PathVariable Long id){
        Room c=roomRepository.findById(id).orElse(null);
        if(c==null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        if(room.getRoomId()!=id){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        c=roomRepository.save(room);
        return new ResponseEntity<>(c,HttpStatus.CREATED);
    }


    @DeleteMapping("/deleteRoom/{id}")
    public ResponseEntity deleteRoom(@PathVariable Long id){
        Room c=roomRepository.findById(id).orElse(null);
        if(c==null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        roomRepository.delete(c);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/updateRoomDto/{id}")
    public ResponseEntity<RoomDTO> updateRoomDto(@RequestBody Room room, @PathVariable long id)throws Exception {
        if(room.getRoomId()!=id) {
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
        Room u=roomRepository.findById(id).orElse(null);
        if(u==null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        u=roomRepository.save(room);
        return new ResponseEntity<>(mapper.RoomToDTO(u),HttpStatus.OK);
    }

   @PutMapping("/updateRoomImg/{id}")
    public ResponseEntity<Room> updateRoom(@RequestBody Room room, @PathVariable long id) {
       if(room.getRoomId()!=id) {
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
        Room u=roomRepository.findById(id).orElse(null);
        if(u==null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        u=roomRepository.save(room);
        return new ResponseEntity<>(u,HttpStatus.OK);
    }
    @PostMapping("/upload")
    public ResponseEntity<Room> uploadWithImage(@RequestPart("hotel") String  hotelJson, @RequestPart("image") MultipartFile file) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        Room room = objectMapper.readValue(hotelJson, Room.class);
        String imageUrl = DIRECTORY_URL + file.getOriginalFilename();
        Path filePath = Paths.get(imageUrl);
        Files.write(filePath, file.getBytes());
        room.setImageURL(file.getOriginalFilename());
        Room newHotel = roomRepository.save(room);
        return new ResponseEntity<>(newHotel, HttpStatus.OK);

    }

    @GetMapping("getDTO/{id}")
    public  ResponseEntity<RoomDTO> getRoomDTO(@PathVariable Long id) throws IOException {

        return new ResponseEntity<>(mapper.RoomToDTO(roomRepository.findById(id).orElse(null)),HttpStatus.OK);

    }


}
