import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
        import { addResponse, deleteResponse, getResponses, getResponseById, updateResponse } from '../../services/responseService';
        import { Response } from "../../models/Response";


    interface ResponseState {
        responses: Response[];
        responseH: Response | null;
        error: string | null;
        loading: boolean;
    }

          const initialState: ResponseState = {
        responses: [],
        responseH: null,
                error: null,
                loading: false,
    };


    export const fetchResponses = createAsyncThunk(
    'response/fetchResponses',
    async () => {
        const responses = await getResponses();
        return responses;
    }
            );

    export const fetchResponseById = createAsyncThunk(
  'response/fetchResponseById',
  async (id: number) => {
        const response = await getResponseById(id);
        return response;
    }
          );

   


    export const updateResponseById = createAsyncThunk(
  'response/updateResponseById',
  async ({ id, response }: { id: number; response: Response }) => {
        const updatedResponse = await updateResponse(id, response);
        return updatedResponse;
    }
          );

    export const deleteResponseById = createAsyncThunk(
  'response/deleteResponseById',
  async (id: number) => {
        await deleteResponse(id);
        return id;
    }
          );

    export const AddResponse = createAsyncThunk(
  'response/fetchAddResponse',
  async (response: Response) => {
        const newResponse = await addResponse(response);
        return newResponse;
    }
          );


          const responseSlice = createSlice({
        name: "response",
                initialState,
                reducers: {},
        extraReducers: (builder) => {
            builder
                    .addCase(AddResponse.fulfilled, (state, action) => {
                state.responses = [...state.responses, action.payload];
            })
      .addCase(fetchResponses.fulfilled, (state, action) => {
                state.responses = action.payload;
            })
      .addCase(fetchResponseById.fulfilled, (state, action) => {
                state.responseH = action.payload;
            })
      
      .addCase(deleteResponseById.fulfilled, (state, action) => {
                state.responses = state.responses.filter(response => response.responseId !== action.payload);
            })
      .addCase(AddResponse.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to add response';
            })
      .addCase(fetchResponses.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to fetch responses';
            })
      .addCase(fetchResponseById.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to fetch response by ID';
            })
      .addCase(updateResponseById.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to update response';
            })
      .addCase(deleteResponseById.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to delete response';
            })

            ;
        }
    });

    export default responseSlice.reducer;
