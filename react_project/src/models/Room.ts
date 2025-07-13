import {Hotel} from "./Hotel"

export interface Room{
    roomId:number,
    roomNumber:number,
    priceOfNight:number,
    availability:boolean,
    hotel:Hotel,
    etype:string,
    imgURL:string
    image?:string
}

  
