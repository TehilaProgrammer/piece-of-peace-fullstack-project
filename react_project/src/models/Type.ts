import {Room} from "./Room"
import {Hotel} from "./Hotel"

export interface Type{
    typeId:number,
    typeName:string,
    roomList:Room[],
    hotels:Hotel[]
}

