package com.example.hotels.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotels.models.Type;
import com.example.hotels.services.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/type")
@CrossOrigin
public class TypeController {

    private final TypeRepository typeRepository;
    private TypeRepository typeRepositoryRepository;

    public TypeController(TypeRepository typeRepositoryRepository, TypeRepository typeRepository){
        this.typeRepositoryRepository=typeRepositoryRepository;
        this.typeRepository = typeRepository;
    }


    @GetMapping("/typeRepository")
    public ResponseEntity<List<Type>>getType(){
        return new ResponseEntity<>(typeRepositoryRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/typeRepositoryById/{id}")
    public ResponseEntity<Type> getTypeById(@PathVariable Long id){
        Type c=typeRepositoryRepository.findById(id).orElse(null);
        if(c==null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(c,HttpStatus.OK);
    }

    @PostMapping("/addType")
    public ResponseEntity<Type> addType(@RequestBody Type typeRepository){
        Type c=typeRepositoryRepository.save(typeRepository);
        return new ResponseEntity<>(c,HttpStatus.CREATED);
    }

    @PutMapping("/updateType/{id}")
    public ResponseEntity<Type> updateType(@RequestBody Type typeRepository,@PathVariable Long id){
        Type c=typeRepositoryRepository.findById(id).orElse(null);
        if(c==null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        if(typeRepository.getTypeId()!=id){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        c=typeRepositoryRepository.save(typeRepository);
        return new ResponseEntity<>(c,HttpStatus.CREATED);
    }
    @DeleteMapping("/deleteType/{id}")
    public ResponseEntity deleteType(@PathVariable Long id){
        Type c=typeRepositoryRepository.findById(id).orElse(null);
        if(c==null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        typeRepositoryRepository.delete(c);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
