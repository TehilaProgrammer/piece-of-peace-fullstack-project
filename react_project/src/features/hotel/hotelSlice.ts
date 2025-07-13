import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addHotel, deleteHotel, getHotel, getHotelById, responsesByHotel, updateHotel,updateHotelDto,uplodeImageHotel } from '../../services/hotelService';
import { Hotel } from "../../models/Hotel";

interface HotelState {
  hotels: Hotel[];
  hotel: Hotel;
  responses: Response[]; 
}

const initialState: HotelState = {
  hotels: [],
  hotel: {} as Hotel,
  responses: [], 
  error: '',
};

export const fetchHotels = createAsyncThunk(
    'hotel/fetchHotels',
    async () => {
      const hotels = await getHotel();
      return hotels;
    }
  );
  

export const fetchHotelById = createAsyncThunk(
  'hotel/fetchHotelById',
  async (id: number) => {
    const hotel = await getHotelById(id);
    return hotel;
  }
);
export const fetchresponsesByHotel = createAsyncThunk(
  'hotel/fetchresponsesByHotel',
  async (id: number) => {
    const hotel = await responsesByHotel(id);
    return hotel;
  }
);


export const updateHotelById = createAsyncThunk(
  'hotel/updateHotelById',
  async ({ id, hotel }: { id: number; hotel: Hotel }) => {
    const updatedHotel = await updateHotel(id, hotel);
    return updatedHotel;
  }
);

export const deleteHotelById = createAsyncThunk(
  'hotel/deleteHotelById',
  async (id: number) => {
    await deleteHotel(id);
    return id;
  }
);

export const fetchAddHotel = createAsyncThunk(
  'hotel/fetchAddHotel',
  async (hotel: Hotel) => {
    const newHotel = await addHotel(hotel);
    return newHotel;
  }
);

export const fetchUpdate = createAsyncThunk(
  'updateHotel/hotelUpdate',
  async (hotelUpdate: { id: number, hotel: Hotel }) => {
      const updatedHotel = await updateHotel(hotelUpdate.id, hotelUpdate.hotel);
      return updatedHotel;
  }
);

  export const fetchUpdateDto = createAsyncThunk(
  'updateHotelDto/hotelUpdate',
  async (hotelUpdate: { id: number, hotel: Hotel }) => {
      const updatedHotel = await updateHotelDto(hotelUpdate.id, hotelUpdate.hotel);
      return updatedHotel;
  }
);

  export const fetchUploadImage = createAsyncThunk(
  'uplodeImageHotel/fetchUploadImage',
  async ({ hotel, file }: { hotel: Hotel; file: File }) => {
      const uploadedHotel = await uplodeImageHotel(hotel, file);
      return uploadedHotel;
  }
);

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddHotel.fulfilled, (state, action) => {
        state.hotels = [...state.hotels, action.payload];
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.hotels = action.payload;
      })
      .addCase(fetchHotelById.fulfilled, (state, action) => {
        state.hotel = action.payload;
      })
      .addCase(updateHotelById.fulfilled, (state, action) => {
        // const index = state.hotels.findIndex(hotel => hotel.hotelId === action.payload.hotelId);
        // if (index !== -1) {
        //   state.hotels[index] = action.payload;
        // }
      })
      .addCase(deleteHotelById.fulfilled, (state, action) => {
        state.hotels = state.hotels.filter(hotel => hotel.hotelId !== action.payload);
      })
      .addCase(fetchAddHotel.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to add hotel';
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch hotels';
      })
      .addCase(fetchHotelById.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch hotel by ID';
      })
      .addCase(updateHotelById.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to update hotel';
      })
      .addCase(deleteHotelById.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete hotel';
      }).addCase(fetchresponsesByHotel.fulfilled, (state, action) => {
        state.responses = action.payload;
      });
      
      
      ;
  }
});

export default hotelSlice.reducer;


    
