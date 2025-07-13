import axios from "axios";
import { Response } from "../models/Response"






    export const getResponses = async (): Promise<Response[]> => {
        try {
        const response = await axios.get(`http://localhost:8080/api/response/getResponse`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw (error);
        }
    }


    export const getResponseById = async (id: Number): Promise<Response> => {
        try {
        const response = await axios.get(`http://localhost:8080/api/response/responseById/${id}`);
            return response.data;
        } catch (error) {
            throw (error);
        }
    }

    export const deleteResponse = async (id: number) => {
        try {
        await axios.delete(`http://localhost:8080/api/response/deleteResponse/${id}`);
            return id;
        } catch (error) {
            throw (error);
        }
    }

    export const addResponse = async (responseH: Response) => {
        try {
          const response = await axios.post('http://localhost:8080/api/responses/addResponse', responseH);
          return response.data;
        } catch (error) {
          throw error;
        }
      };
      

    export const updateResponse = async (id: number, responseH: Response) => {
        try {
    const response = await axios.put(`http://localhost:8080/api/response/updateResponse/${id}`, responseH);
            console.log('upate response function succeeded');
            return { data: response.data, status: response.status };

        } catch (error) {
            console.log('update response function faild', error);
            throw (error);

        }
    }

 

