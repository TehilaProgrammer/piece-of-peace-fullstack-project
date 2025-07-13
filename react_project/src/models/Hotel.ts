import { Response } from "./Response"
import { Room } from "./Room"

export interface Hotel{
    hotelId:number,
    hotelName:string,
    hotelAddress:string,
    description:string,
    roomList:Room[],
    roomDTOList:Room[],
    responseList:Response[],
    stars:number,
    imageURL?:string,
    image?:string
}

