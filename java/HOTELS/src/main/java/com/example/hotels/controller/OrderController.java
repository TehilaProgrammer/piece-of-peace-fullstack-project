package com.example.hotels.controller;


import com.example.hotels.dto.OrderDTO;
import com.example.hotels.models.Order;
import com.example.hotels.models.Room;
import com.example.hotels.models.User;
import com.example.hotels.services.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/order")
@CrossOrigin
public class OrderController {

    private OrderRepository orderRepository;
    private UserRepository userRepository;
private  MapStruct map;
    public OrderController(OrderRepository orderRepository,MapStruct map)
    {
     this.map  =map;
        this.orderRepository=orderRepository;
    }

    @GetMapping("/GetOrders")
    public ResponseEntity<List<Order>>getOrders(){
        return new ResponseEntity<>(orderRepository.findAll(), HttpStatus.OK);
    }



    @GetMapping("/orderById/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id){
        Order c=orderRepository.findById(id).orElse(null);
        if(c==null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(c,HttpStatus.OK);
    }
    @GetMapping("/ordersBy/{id}")
    public ResponseEntity<List<Order>> getOrdersByUserId(@PathVariable long id) {
        List<Order> orders = orderRepository.findAllByUser_UserId(id);

        if (orders.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }



    @PostMapping("/addOrder")
     public ResponseEntity<Order> addOrder(@RequestBody Order order) {
        Order savedOrder = orderRepository.save(order);
        User user = savedOrder.getUser();
        user.setTotalOfPoint(user.getTotalOfPoint() + 10);

        userRepository.save(user);

        return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
    }
    @PostMapping("/addOrderDto")
    public ResponseEntity<OrderDTO> addOrder(@RequestBody OrderDTO order) {
        OrderDTO savedOrder =map.OrdertoDTO( orderRepository.save(map.DTOtoOrder(order)));

        return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
    }

    @PutMapping("/updateOrder/{id}")
    public ResponseEntity<Order> updateOrder(@RequestBody Order order,@PathVariable Long id){
        Order c=orderRepository.findById(id).orElse(null);
        if(c==null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        if(order.getOrderId()!=id){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        c=orderRepository.save(order);
        return new ResponseEntity<>(c,HttpStatus.CREATED);
    }
    @DeleteMapping("/deleteOrder/{id}")
    public ResponseEntity deleteOrder(@PathVariable Long id){
        Order c=orderRepository.findById(id).orElse(null);
        if(c==null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        orderRepository.delete(c);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
