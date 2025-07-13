package com.example.hotels.controller;

//import com.example.hotels.models.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotels.models.HotelRoomTypeLink;
import com.example.hotels.services.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/HotelRoomTypeLink")
@CrossOrigin
public class HotelRoomTypeLinkController {

    private HotelRoomTypeLinkRepository HotelRoomTypeLinkRepository;

    public HotelRoomTypeLinkController(HotelRoomTypeLinkRepository HotelRoomTypeLinkRepository){
        this.HotelRoomTypeLinkRepository=HotelRoomTypeLinkRepository;
    }


    @GetMapping("/HotelRoomTypeLink")
    public ResponseEntity<List<HotelRoomTypeLink>>getHotelRoomTypeLink(){
        return new ResponseEntity<>(HotelRoomTypeLinkRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/HotelRoomTypeLinkById/{id}")
    public ResponseEntity<HotelRoomTypeLink> getHotelRoomTypeLinkById(@PathVariable Long id){
        HotelRoomTypeLink c=HotelRoomTypeLinkRepository.findById(id).orElse(null);
        if(c==null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(c,HttpStatus.OK);
    }

    @PostMapping("/addHotelRoomTypeLink")
    public ResponseEntity<HotelRoomTypeLink> addHotelRoomTypeLink(@RequestBody HotelRoomTypeLink HotelRoomTypeLink){
        HotelRoomTypeLink c=HotelRoomTypeLinkRepository.save(HotelRoomTypeLink);
        return new ResponseEntity<>(c,HttpStatus.CREATED);
    }

//    @PutMapping("/updateUser/{id}")
//    public ResponseEntity<User> updateUser(@RequestBody User user, @PathVariable Long id){
//        HotelRoomTypeLink c=hotelRoomTypeLink.findById(id).orElse(null);
//        if(c==null){
//            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
//        }
//        if(user.getUserId()!=id){
//            return new ResponseEntity<>(HttpStatus.CONFLICT);
//        }
//        c=hotelRoomTypeLink.save(user);
//        return new ResponseEntity<>(c,HttpStatus.CREATED);
//    }
    @DeleteMapping("/deleteHotelRoomTypeLink/{id}")
    public ResponseEntity deleteHotelRoomTypeLink(@PathVariable Long id){
        HotelRoomTypeLink c=HotelRoomTypeLinkRepository.findById(id).orElse(null);
        if(c==null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        HotelRoomTypeLinkRepository.delete(c);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
