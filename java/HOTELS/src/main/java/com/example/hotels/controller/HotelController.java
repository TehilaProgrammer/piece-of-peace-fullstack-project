package com.example.hotels.controller;


import com.example.hotels.dto.HotelDTO;
import com.example.hotels.dto.RoomDTO;
import com.example.hotels.models.Hotel;
import com.example.hotels.models.Room;
import com.example.hotels.services.HotelRepository;
import com.example.hotels.services.MapStruct;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;






@RequestMapping("/api/hotel")
@RestController
@CrossOrigin
public class HotelController {
    private HotelRepository hotelRepository;
    private MapStruct mapper;

    static String DIRECTORY_URL=System.getProperty("user.dir")+"\\images\\";
    public HotelController(HotelRepository hotelRepository, MapStruct mapper) {
        this.hotelRepository = hotelRepository;
        this.mapper = mapper;
    }

    @GetMapping("/getHotels")
    public ResponseEntity<List<HotelDTO>> getHotel() {
        List<Hotel> hotels = hotelRepository.findAll();
        List<HotelDTO> hotelDTOs = hotels.stream()
                .map(hotel -> {
                    try {
                        return mapper.HotelToDTO(hotel);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                })
                .collect(Collectors.toList());

        return new ResponseEntity<>(hotelDTOs, HttpStatus.OK);
    }

    @GetMapping("/hotelById/{id}")
    public ResponseEntity<HotelDTO> getHotelById(@PathVariable Long id) throws IOException {
        Hotel hotel = hotelRepository.findById(id).orElse(null);
        if (hotel == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        HotelDTO hotelDTO = mapper.HotelToDTO(hotel);
        return new ResponseEntity<>(hotelDTO, HttpStatus.OK);
    }

    @PostMapping("/addHotel")
    public ResponseEntity<Hotel> addHotel(@RequestBody Hotel hotel){
        Hotel c=hotelRepository.save(hotel);
        return new ResponseEntity<>(c,HttpStatus.CREATED);
    }


    @DeleteMapping("/deleteHotel/{id}")
    public ResponseEntity deleteHotel(@PathVariable Long id){
        Hotel c=hotelRepository.findById(id).orElse(null);
        if(c==null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        hotelRepository.delete(c);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


@PostMapping("/upload")
public ResponseEntity<HotelDTO> uploadWithImage(@RequestPart("hotel") String hotelJson, @RequestPart("image") MultipartFile file) throws IOException {
    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.registerModule(new JavaTimeModule());
    Hotel hotel = objectMapper.readValue(hotelJson, Hotel.class);

    String imageUrl = DIRECTORY_URL + file.getOriginalFilename();
    Path filePath = Paths.get(imageUrl);
    Files.write(filePath, file.getBytes());

    hotel.setImageURL(file.getOriginalFilename());
    Hotel newHotel = hotelRepository.save(hotel);

    return new ResponseEntity<>(mapper.HotelToDTO(newHotel), HttpStatus.OK);
}

       @PostMapping("/uploadImageHotel")
    public ResponseEntity<HotelDTO> uplodeHotelImage(@RequestPart("hotel") String hotelJson , @RequestPart("image") MultipartFile file) throws IOException {
        System.out.println("Received JSON: " + hotelJson);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        Hotel hotel = objectMapper.readValue(hotelJson, Hotel.class);
        String imageUrl=DIRECTORY_URL+file.getOriginalFilename();
        Path filePath= Paths.get(imageUrl);
        Files.write(filePath,file.getBytes());
        hotel.setImageURL(file.getOriginalFilename());
        Hotel newHotel=hotelRepository.save(hotel);
        System.out.println(newHotel);
        return new ResponseEntity<>(mapper.HotelToDTO(newHotel), HttpStatus.CREATED);
    }

    @GetMapping("getDTO/{id}")
    public  ResponseEntity<HotelDTO> getHotelDTO(@PathVariable Long id) throws IOException {
        return new ResponseEntity<>(mapper.HotelToDTO(hotelRepository.findById(id).orElse(null)),HttpStatus.OK);

    }

    @PutMapping("/updateHotelDto/{id}")
    public ResponseEntity<HotelDTO> updateHotelDto(@RequestBody Hotel hotel, @PathVariable long id)throws Exception {
        if(hotel.getHotelId()!=id) {
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
        Hotel u=hotelRepository.findById(id).orElse(null);
        if(u==null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        u=hotelRepository.save(hotel);
        return new ResponseEntity<>(mapper.HotelToDTO(u),HttpStatus.OK);
    }

    @PutMapping("/updateHotel/{id}")
    public ResponseEntity<Hotel> updateHotel(@RequestBody Hotel hotel, @PathVariable long id) {
        if(hotel.getHotelId()!=id) {
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
        Hotel u=hotelRepository.findById(id).orElse(null);
        if(u==null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        u=hotelRepository.save(hotel);
        return new ResponseEntity<>(u,HttpStatus.OK);
    }
}



