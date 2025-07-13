import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { Button, Typography, Box } from '@mui/material';
import dayjs from 'dayjs';
import { fetchAddOrder } from './orderSlice';
import { Order } from '../../models/Order';
import { useNavigate, useParams } from 'react-router-dom'; 
import { RootState } from '../../store/store';
import { fetchHotelById } from '../hotel/hotelSlice';
import '../../cssComponents/cssOrderComp.css'; 

export const OrderComp = () => {
  const { roomId } = useParams<{ roomId: string }>(); 
  const room = useSelector((state: RootState) => state.room.room);
  const hotel = useSelector((state: RootState) => state.hotel.hotel); 
  const user = useSelector((state: RootState) => state.user.selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | undefined>(undefined);
  const [cost, setCost] = useState<number>(0);

  const calculateDays = (range: [dayjs.Dayjs, dayjs.Dayjs] | undefined) => {
    if (range && range[0] && range[1]) {
      return range[1].diff(range[0], 'day');
    }
    return 0;
  };

  useEffect(() => {
    if (dateRange && room) {
      const days = calculateDays(dateRange);
      setCost(days * room.priceOfNight);
    }
  }, [dateRange, room]);

  // Debug useEffect to check data loading
  useEffect(() => {
    console.log('OrderComp Debug - room:', room);
    console.log('OrderComp Debug - hotel:', hotel);
    console.log('OrderComp Debug - user:', user);
    console.log('OrderComp Debug - roomId:', roomId);
  }, [room, hotel, user, roomId]);

  // Load hotel data if not available
  useEffect(() => {
    if (room && room.hotel && room.hotel.hotelId && !hotel) {
      dispatch(fetchHotelById(room.hotel.hotelId));
    }
  }, [room, hotel, dispatch]);

  const handleOrderSubmit = async () => {
    console.log('handleOrderSubmit called');
    console.log('user:', user);
    console.log('user.userId:', user?.userId);
    
    if (!user || !user.userId) {
      alert('You must be logged in to place an order. Please log in or sign up.');
      navigate('/Login'); 
      return; 
    }
  
    if (dateRange && room && hotel && user && user.userId && roomId) {
              const order: Order = {
          orderId: -1,
          checkIn: dateRange[0].toDate().toISOString(),
          checkOut: dateRange[1].toDate().toISOString(),
          numOfNight: calculateDays(dateRange),
          totalCost: cost,
          userId: user.userId,
          hotelId: hotel.hotelId,
          roomId: parseInt(roomId),
        };
  
      try {
        const newOrder = await dispatch(fetchAddOrder(order)).unwrap();
        navigate('/orderSucc'); 
      } catch (error) {
        console.error('Error placing the order:', error);
      }
    } else {
      console.log('Missing data to place the order');
      console.log('dateRange:', dateRange);
      console.log('room:', room);
      console.log('room.hotel:', room?.hotel);
      console.log('user:', user);
      console.log('user.userId:', user?.userId);
      console.log('roomId:', roomId);
    }
  };
  

  return (
    <Box className="order-container" sx={{mt:18}}>
      <Typography variant="h6" className="section-title">Order Summary:</Typography>

      <Typography variant="body1" className="section-subtitle">Select Dates for Reservation:</Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateRangePicker
          startText="Check-in"
          endText="Check-out"
          value={dateRange}
          onChange={(newRange) => setDateRange(newRange as [dayjs.Dayjs, dayjs.Dayjs] | undefined)} 
          localeText={{ start: 'Check-in', end: 'Check-out' }} 
          minDate={dayjs().startOf('day')}
        />
      </LocalizationProvider>

      {dateRange && (
        <Box className="details-box">
          <Typography variant="body1">Hello {user?.userName}</Typography>
          <Typography variant="body1">You selected: {calculateDays(dateRange)} days</Typography>
          <Typography variant="body1">
            From {dateRange[0]?.format('DD/MM/YYYY')} to {dateRange[1]?.format('DD/MM/YYYY')}
          </Typography>
        </Box>
      )}

      {room && (
        <Box className="details-box">
          <Typography variant="body1">Room Type: {room.etype}</Typography>
          <Typography variant="body2">Price per night: {room.priceOfNight} ₪</Typography>
          <Typography variant="body2">Total Price: {cost} ₪</Typography>
          <Typography variant="body2">Availability: {room.availability ? 'Available' : 'Not Available'}</Typography>
        </Box>
      )}

      {hotel && (
        <Box className="details-box">
          <Typography variant="body1">Hotel: {hotel.hotelName}</Typography>
          <Typography variant="body2">Address: {hotel.hotelAddress}</Typography>
          <Typography variant="body2">Rating: {hotel.stars} stars</Typography>
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        disabled={!dateRange || calculateDays(dateRange) <= 0}
        onClick={handleOrderSubmit} // Call function on submit
        className="order-button"
      >
        Confirm Booking
      </Button>
    </Box>
  );
};

export default OrderComp;
