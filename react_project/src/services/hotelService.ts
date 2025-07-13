import axios from "axios";
import { Hotel } from "../models/Hotel"



export const getHotel = async (): Promise<Hotel[]> => {
    try {
        const response = await axios.get(`http://localhost:8080/api/hotel/getHotels`);
        console.log(response);
        
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw (error);
    }
}



export const getHotelById = async (id: number): Promise<Hotel> => {
    try {
      const response = await axios.get(`http://localhost:8080/api/hotel/hotelById/${id}`);
      return response.data; 
    } catch (error) {
      throw error;
    }
  };

  export const responsesByHotel = async (id: number): Promise<Response[]> => {
    try {
      const response = axios.get(`/api/responses/responsesByHotel/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  

export const deleteHotel = async (id: number) => {
    try {
    await axios.delete(`http://localhost:8080/api/hotel/deleteHotel/${id}`);
       
    } catch (error) {
        throw (error);
    }
}

export const addHotel = async (hotel: Hotel) => {
    try {
        const response = await axios.post('http://localhost:8080/api/hotel/addHotel', hotel);
        return response.data;
    } catch (error) {
        throw error; 
    }
};

export const updateHotel = async (id: number, hotel: Hotel) => {
    try {
    const response = await axios.put(`http://localhost:8080/api/hotel/updateHotel/${id}`, hotel);
        console.log('upate hotel function succeeded');
        return { data: response.data, status: response.status };

    } catch (error) {
        console.log('update hotel function faild', error);
        throw (error);

    }
}

export const updateHotelDto = async (id: number, hotel: Hotel) => {
    try {
    const response = await axios.put(`http://localhost:8080/api/hotel/updateHotelDto/${id}`, hotel);
        console.log('upate hotel function succeeded');
        return { data: response.data, status: response.status };

    } catch (error) {
        console.log('update hotel function faild', error);
        throw (error);

    }
}
export const uplodeImageHotel = async (hotel:Hotel, file:File):Promise<Hotel> => {
    try {
        const formData = new FormData();
        formData.append('hotel', JSON.stringify(hotel)); 
        formData.append('image', file); 
        const response = await axios.post('http://localhost:8080/api/hotel/upload',formData,{headers: {'Content-Type': 'multipart/form-data', }, } );
        console.log('Image uploaded successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}
