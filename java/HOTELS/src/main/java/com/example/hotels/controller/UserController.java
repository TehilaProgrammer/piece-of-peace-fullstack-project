package com.example.hotels.controller;

import com.example.hotels.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotels.models.User;
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

@RestController
@RequestMapping("api/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserRepository userRepository;
    private MapStruct mapper;
    private static String DIRECTORY_URL = System.getProperty("user.dir") + "\\images\\";

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }




    @GetMapping("/GetUsers")
    public ResponseEntity<List<User>> getUsers() {
        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/userById/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User c = userRepository.findById(id).orElse(null);
        if (c == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(c, HttpStatus.OK);
    }

    @GetMapping("/usersByUserName")
    public ResponseEntity<User> getUsersByUserName(@RequestParam String userName) {
        User t = userRepository.findByUserName(userName);
        if (t == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(t, HttpStatus.OK);
    }


    @PostMapping("/addUser")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User c = userRepository.save(user);
        return new ResponseEntity<>(c, HttpStatus.CREATED);
    }

    @PutMapping("/updateUser/{id}")
    public ResponseEntity<User> updateUser(@RequestBody User user, @PathVariable Long id) {
        User c = userRepository.findById(id).orElse(null);
        if (c == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        if (user.getUserId() != id) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        c = userRepository.save(user);
        return new ResponseEntity<>(c, HttpStatus.CREATED);
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity deleteUser(@PathVariable Long id) {
        User c = userRepository.findById(id).orElse(null);
        if (c == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        userRepository.delete(c);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @PostMapping("/upload")
    public ResponseEntity<User> aploadWithImage(@RequestPart("user") User user, @RequestPart("image") MultipartFile file) throws IOException {
        String imageUrl = DIRECTORY_URL + file.getOriginalFilename();
        Path filePath = Paths.get(imageUrl);
        Files.write(filePath, file.getBytes());
        user.setImageURL(file.getOriginalFilename());
        User newUser = userRepository.save(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);

    }

    @GetMapping("getDto/{id}")
    public ResponseEntity<UserDTO> getUserDto(@PathVariable Long id) throws IOException {
        User user = userRepository.findById(id).orElse(null);
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(user.getUserId());
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        User foundUser = userRepository.findByUserName(user.getUserName());  // שים לב לשם השדה "userName"

        if (foundUser != null) {
            if (foundUser.getPassword().equals(user.getPassword())) {
                System.out.println("Login successful");
                return new ResponseEntity<>(foundUser, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/signUp")
    public ResponseEntity<User> signUp(@RequestBody User user) {
        if (userRepository.existsByUserName(user.getUserName())) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        User u = userRepository.save(user);
        return new ResponseEntity<>(u, HttpStatus.CREATED);
    }

}












