package com.example.hotels.controller;



import com.example.hotels.models.Admin;
import com.example.hotels.services.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/admin")
@CrossOrigin
public class AdminController {

    private AdminRepository adminRepository;

    public AdminController(AdminRepository adminRepository){
        this.adminRepository=adminRepository;
    }

    @GetMapping("/admin")
    public ResponseEntity<List<Admin>>getAdmin(){
        return new ResponseEntity<>(adminRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/adminById/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable Long id){
        Admin c=adminRepository.findById(id).orElse(null);
        if(c==null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(c,HttpStatus.OK);
    }

    @PostMapping("/addAdmin")
    public ResponseEntity<Admin> addAdmin(@RequestBody Admin admin){
        Admin c=adminRepository.save(admin);
        return new ResponseEntity<>(c,HttpStatus.CREATED);
    }

    @PutMapping("/updateAdmin/{id}")
    public ResponseEntity<Admin> updateAdmin(@RequestBody Admin admin,@PathVariable Long id){
        Admin c=adminRepository.findById(id).orElse(null);
        if(c==null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        if(admin.getUserId()!=id){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        c=adminRepository.save(admin);
        return new ResponseEntity<>(c,HttpStatus.CREATED);
    }
    @DeleteMapping("/deleteAdmin/{id}")
    public ResponseEntity deleteAdmin(@PathVariable Long id){
        Admin c=adminRepository.findById(id).orElse(null);
        if(c==null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        adminRepository.delete(c);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
