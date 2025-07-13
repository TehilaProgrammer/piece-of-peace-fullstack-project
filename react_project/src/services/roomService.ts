import axios from "axios";
import { Room } from "../models/Room"


    export const getRoom = async (): Promise<Room[]> => {
        try {
        const response = await axios.get(`http://localhost:8080/api/room/GetRoom`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw (error);
        }
    }


    export const getRoomById = async (id: Number): Promise<Room> => {
        try {
        const response = await axios.get(`http://localhost:8080/api/room/getDTO/${id}`);
            return response.data;
        } catch (error) {
            throw (error);
        }
    }

    export const getDTORoomById = async (id: Number): Promise<Room> => {
        try {
        const response = await axios.get(`http://localhost:8080/api/room/getDTO/${id}`);
            return response.data;
        } catch (error) {
            throw (error);
        }
    }

    export const deleteRoom = async (id: number) => {
        try {
        await axios.delete(`http://localhost:8080/api/room/deleteRoom/${id}`);
            return id;
        } catch (error) {
            throw (error);
        }
    }

    export const addRoom = async (room: Room) => {
        try {
        const response = await axios.post('http://localhost:8080/api/room/addRoom', room);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    export const updateRoom = async (id: number, room: Room) => {
        try {
    const response = await axios.put(`http://localhost:8080/api/room/updateRoom/${id}`, room);
            console.log('upate room function succeeded');
            return { data: response.data, status: response.status };

        } catch (error) {
            console.log('update room function faild', error);
            throw (error);

        }
    }

    export const updateRoomDto = async (id: number, room: Room) => {
        try {
    const response = await axios.put(`http://localhost:8080/api/room/updateRoomDto/${id}`, room);
            console.log('upate room function succeeded');
            return { data: response.data, status: response.status };

        } catch (error) {
            console.log('update room function faild', error);
            throw (error);

        }
    }
    export const uplodeImageRoom = async (room:Room, file:File):Promise<Room> => {
        try {
        const formData = new FormData();
            formData.append('room', JSON.stringify(room));
            formData.append('image', file); 
        const response = await axios.post('http://localhost:8080/api/room/upload',formData,{headers: {'Content-Type': 'multipart/form-data', }, } );
            console.log('Image uploaded successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }

        
    }


