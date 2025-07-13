import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addRoom,deleteRoom,getRoom,getRoomById,updateRoom,updateRoomDto,uplodeImageRoom,getDTORoomById } from '../../services/roomService';
import { Room } from "../../models/Room";


    interface RoomState {
      selectRoom: any;
        rooms: Room[];
        room: Room;
        error: string;
  selectedRoomId: number | null; 
  loading: boolean;
    }

const initialState: RoomState = {
        rooms: [],
        room: {} as Room,
        error: '',
        selectedRoomId: null, // התחל עם null
        loading: false,
    };

    export const fetchRooms = createAsyncThunk(
    'room/fetchRooms',
    async () => {
      const rooms = await getRoom(); 
        return rooms;
    }
  );


    export const fetchRoomById = createAsyncThunk(
  'room/fetchRoomById',
  async (id: number) => {
    const room = await getRoomById(id);
        return room;
    }
);

export const fetchgetDTORoomById = createAsyncThunk(
    'room/getDTORoomById',
    async (id: number) => {
      const room = await getDTORoomById(id);
          return room;
      }
  );


    export const updateRoomById = createAsyncThunk(
  'room/updateRoomById',
  async ({ id, room }: { id: number; room: Room }) => {
    const updatedRoom = await updateRoom(id, room);
        return updatedRoom;
    }
);

    export const deleteRoomById = createAsyncThunk(
  'room/deleteRoomById',
  async (id: number) => {
        await deleteRoom(id);
        return id;
    }
);

    export const fetchAddRoom = createAsyncThunk(
  'room/fetchAddRoom',
  async (room: Room) => {
    const newRoom = await addRoom(room);
        return newRoom;
    }
);

    export const fetchUpdate = createAsyncThunk(
  'updateRoom/roomUpdate',
  async (roomUpdate: { id: number, room: Room }) => {
      const updatedRoom = await updateRoom(roomUpdate.id, roomUpdate.room);
        return updatedRoom;
    }
);

    export const fetchUpdateDto = createAsyncThunk(
  'updateRoomDto/roomUpdate',
  async (roomUpdate: { id: number, room: Room }) => {
      const updatedRoom = await updateRoomDto(roomUpdate.id, roomUpdate.room);
        return updatedRoom;
    }
);

    export const fetchUploadImage = createAsyncThunk(
  'uplodeImageRoom/fetchUploadImage',
  async ({ room, file }: { room: Room; file: File }) => {
      const uploadedRoom = await uplodeImageRoom(room, file);
        return uploadedRoom;
    }
);

const roomSlice = createSlice({
        name: "room",
                initialState,
                reducers: { setSelectedRoom: (state, action: PayloadAction<number>) => {
                    state.selectedRoomId = action.payload; // עדכון ה-ID של החדר הנבחר
                  },},
        extraReducers: (builder) => {
            builder
                    .addCase(fetchAddRoom.fulfilled, (state, action) => {
                state.rooms = [...state.rooms, action.payload];
            })
      .addCase(fetchRooms.fulfilled, (state, action) => {
                state.rooms = action.payload;
            })
      .addCase(fetchRoomById.fulfilled, (state, action) => {
                state.room = action.payload;
            })
      .addCase(updateRoomById.fulfilled, (state, action) => {
                // const index = state.rooms.findIndex(room => room.roomId === action.payload.roomId);
                // if (index !== -1) {
                //   state.rooms[index] = action.payload;
                // }
            })
      .addCase(deleteRoomById.fulfilled, (state, action) => {
                state.rooms = state.rooms.filter(room => room.roomId !== action.payload);
            })
      .addCase(fetchAddRoom.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to add room';
            })
      .addCase(fetchRooms.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to fetch rooms';
            })
      .addCase(fetchRoomById.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to fetch room by ID';
            })
      .addCase(updateRoomById.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to update room';
            })
      .addCase(deleteRoomById.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to delete room';
            })

            ;
        }
    });

    export default roomSlice.reducer;
    export const { setSelectedRoom } = roomSlice.actions;

