import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
        import { addOrder, deleteOrder, getOrder, getOrderById, getOrdersById, updateOrder } from '../../services/orderService';
        import { Order } from "../../models/Order";


        interface OrderState {
            orders: Order[];
            order: Order | null;
            error: string | null;
            loading: boolean;
          }

          const initialState: OrderState = {
            orders: [],
            order: null,
            error: null,
            loading: false,
          };
          

    export const fetchOrders = createAsyncThunk(
    'order/fetchOrders',
    async () => {
        const orders = await getOrder();
        return orders;
    }
            );

    export const fetchOrderById = createAsyncThunk(
  'order/fetchOrderById',
  async (id: number) => {
        const order = await getOrderById(id);
        return order;
    }
          );

          export const fetchOrdersById = createAsyncThunk(
            'order/fetchOrdersById',
            async (id: number) => {
              const orders = await getOrdersById(id);
              return orders;
            }
          );
          

    export const updateOrderById = createAsyncThunk(
  'order/updateOrderById',
  async ({ id, order }: { id: number; order: Order }) => {
        const updatedOrder = await updateOrder(id, order);
        return updatedOrder;
    }
          );

    export const deleteOrderById = createAsyncThunk(
  'order/deleteOrderById',
  async (id: number) => {
        await deleteOrder(id);
        return id;
    }
          );

    export const fetchAddOrder = createAsyncThunk(
  'order/fetchAddOrder',
  async (order: Order) => {
        const newOrder = await addOrder(order);
        return newOrder;
    }
          );


          const orderSlice = createSlice({
        name: "order",
                initialState,
                reducers: {},
        extraReducers: (builder) => {
            builder
                    .addCase(fetchAddOrder.fulfilled, (state, action) => {
                state.orders = [...state.orders, action.payload];
            })
      .addCase(fetchOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
            })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.order = action.payload;
            })
      
      .addCase(deleteOrderById.fulfilled, (state, action) => {
                state.orders = state.orders.filter(order => order.orderId !== action.payload);
            })
      .addCase(fetchAddOrder.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to add order';
            })
      .addCase(fetchOrders.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to fetch orders';
            })
      .addCase(fetchOrderById.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to fetch order by ID';
            })
      .addCase(updateOrderById.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to update order';
            })
      .addCase(deleteOrderById.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to delete order';
            }).addCase(fetchOrdersById.fulfilled, (state, action) => {
                state.orders = action.payload;
              })

            ;
        }
    });

    export default orderSlice.reducer;



