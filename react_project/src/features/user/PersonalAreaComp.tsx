import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { fetchOrdersById, deleteOrderById } from '../order/orderSlice';
import { Card, CardContent, Typography, Grid, CircularProgress, Box, Button } from '@mui/material';

export const PersonalAreaComp = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.selectUser);
  const { loading, error } = useSelector((state: RootState) => state.order);
  const orders = useSelector((state: RootState) => state.order.orders);
  console.log("Orders:", orders);

  useEffect(() => {
    if (user?.userId) {
      dispatch(fetchOrdersById(user.userId));
    }
  }, [dispatch, user?.userId]);

  const handleDeleteOrder = (orderId: number) => {
    const confirmed = window.confirm('האם אתה בטוח שברצונך למחוק את ההזמנה הזו?');
    
    if (confirmed) {
      dispatch(deleteOrderById(orderId));
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
      <Typography variant="h4" gutterBottom align="center">
        My Orders - Personal Area
      </Typography>

      {/* אם לא נמצא משתמש */}
      {!user ? (
        <Typography variant="body1" color="error" align="center">
          User not found. Please log in again.
        </Typography>
      ) : loading ? (
        <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />
      ) : error ? (
        <Typography variant="body1" color="error" align="center">
          Error loading orders: {error}
        </Typography>
      ) : orders && orders.length > 0 ? (
        <Grid container spacing={2}>
          {orders.map((order) => (
            <Grid item xs={12} md={6} key={order.orderId}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="primary">
                    <strong>Order Number:</strong> {order.orderId}
                  </Typography>
                  {/* קו צהוב מתחת למספר ההזמנה */}
                  <Box
                    sx={{
                      width: '100%',
                      height: '4px',
                      backgroundColor: '#FFD700',
                      marginBottom: '10px',
                    }}
                  />
                  <Typography variant="body1">
                    Check-in Date: {new Date(order.checkIn).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1">
                    Check-out Date: {new Date(order.checkOut).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1">
                    Number of Nights: {order.numOfNight}
                  </Typography>
                  <Typography variant="body1">
                    Total Cost: {order.totalCost} ₪
                  </Typography>

                  {/* כפתור מחיקה */}
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteOrder(order.orderId)}
                    sx={{ marginTop: '15px' ,
                    backgroundColor:"#00008B"
                }}
                  >
                    Delete Order
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography sx={{mt:"10vh"}}variant="body1" align="center">No orders found in the system.</Typography>
      )}
    </div>
  );
};

export default PersonalAreaComp;

