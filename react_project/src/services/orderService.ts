import axios from "axios";
import { Order } from "../models/Order"


export const getOrder = async (): Promise<Order[]> => {
    try {
        const response = await axios.get(`http://localhost:8080/api/order/GetOrder`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw (error);
    }
}


export const getOrderById = async (id: Number): Promise<Order> => {
    try {
        const response = await axios.get(`http://localhost:8080/api/order/orderById/${id}`);
        return response.data;
    } catch (error) {
        throw (error);
    }
}

export const getOrdersById = async (id: number): Promise<Order[]> => {
    try {
      const response = await axios.get(`http://localhost:8080/api/order/ordersBy/${id}`);
   console.log("😉🎸🎸🎸");
   
   return response.data;
    } catch (error) {
      throw error;
    }
  };

export const deleteOrder = async (id: number) => {
    try {
        await axios.delete(`http://localhost:8080/api/order/deleteOrder/${id}`);
        return id;
    } catch (error) {
        throw (error);
    }
}

export const addOrder = async (order: Order) => {
    try {
        console.log(order);
        const response = await axios.post('http://localhost:8080/api/order/addOrderDto', order);
        console.log("response.data", response.data);

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateOrder = async (id: number, order: Order) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/order/updateOrder/${id}`, order);
        console.log('upate order function succeeded');
        return { data: response.data, status: response.status };

    } catch (error) {
        console.log('update order function faild', error);
        throw (error);

    }
}