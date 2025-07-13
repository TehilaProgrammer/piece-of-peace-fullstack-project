import axios from "axios";
import { User, UserLogin } from "../models/User"
import { UserSignUp } from "../models/UserSignUp";



export const getUser = async (): Promise<User[]> => {
    try {
        const response = await axios.get('http://localhost:8080/api/user/GetUsers');
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw (error);
    }
}

export const getUserById = async (id: Number): Promise<User> => {
    try {
        const response = await axios.get(`http://localhost:8080/api/user/userById/${id}`);
        return response.data;
    } catch (error) {
        throw (error);
    }
}
export const updateUser = async (id: number, user: User) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/user/updateUser/${id}`, user);
        return response.data;

    } catch (error) {
        throw (error);

    }
}


export const deleteUser = async (id: number) => {
    try {
        await axios.delete(`http://localhost:8080/api/user/deleteUser/${id}`);
        return id;
    } catch (error) {
        throw (error);
    }
}

export const addUser = async (user: UserSignUp) => {
    try {
        
        const response = await axios.post('http://localhost:8080/api/user/addUser', user);
        return { data: response.data, status: response.status };
    } catch (error) {
        throw error;
    }
};


export const login = async (user: UserLogin) => {
    try {
        console.log(user);

        const response = await axios.post('http://localhost:8080/api/user/login', user);
        console.log(response.data);

        return { data: response.data, status: response.status };
    } catch (error) {
        console.log("error",error);
        
        throw error;
    }
};

export const signUp = async (user: User) => {
    try {
        const response = await axios.post('http://localhost:8080/api/user/signUp', user);
        return response.data;
    } catch (error) {
        throw error;
    }
};



