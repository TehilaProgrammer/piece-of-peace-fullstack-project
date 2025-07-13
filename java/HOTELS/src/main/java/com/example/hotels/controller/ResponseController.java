package com.example.hotels.controller;



import com.example.hotels.dto.ResponseDTO;
import com.example.hotels.models.Hotel;
import com.example.hotels.models.Response;
import com.example.hotels.models.User;
import com.example.hotels.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/responses")
@CrossOrigin(origins = "http://localhost:5173")
public class ResponseController {
    @Autowired
    private ResponseRepository responseRepository;
    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private UserRepository userRepository;

    public ResponseController(ResponseRepository responseRepository){

        this.responseRepository=responseRepository;

    }

    @GetMapping("/getResponse")
    public ResponseEntity<List<Response>>getResponse(){
        return new ResponseEntity<>(responseRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/responseById/{id}")
    public ResponseEntity<Response> getResponseById(@PathVariable Long id){
        Response c=responseRepository.findById(id).orElse(null);
        if(c==null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(c,HttpStatus.OK);
    }

    @GetMapping("/responsesByHotel/{hotelId}")
    public ResponseEntity<List<Response>> getResponsesByHotelId(@PathVariable Long hotelId) {
        List<Response> responses = responseRepository.findAllByHotel_HotelId(hotelId);

        if (responses.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @PostMapping("/addResponse")
    public ResponseEntity<Response> addResponse(@RequestBody ResponseDTO responseDTO) {
        Response response = new Response();
       // response.setId(responseDTO.getId());
        response.setResponse(responseDTO.getResponse());

        User user = userRepository.findById(responseDTO.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        Hotel hotel = hotelRepository.findById(responseDTO.getHotelId()).orElseThrow(() -> new RuntimeException("Hotel not found"));

        response.setUser(user);
        response.setHotel(hotel);

        Response savedResponse = responseRepository.save(response);

        return new ResponseEntity<>(savedResponse, HttpStatus.CREATED);
    }



    @PutMapping("/updateResponse/{id}")
    public ResponseEntity<Response> updateResponse(@RequestBody Response response,@PathVariable Long id){
        Response c=responseRepository.findById(id).orElse(null);
        if(c==null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        if(response.getId()!=id){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        c=responseRepository.save(response);
        return new ResponseEntity<>(c,HttpStatus.CREATED);
    }


    @DeleteMapping("/deleteResponse/{id}")
    public ResponseEntity deleteResponse(@PathVariable Long id){
        Response c=responseRepository.findById(id).orElse(null);
        if(c==null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        responseRepository.delete(c);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
