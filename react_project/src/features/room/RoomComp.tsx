import { useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { fetchRoomById } from "../../features/room/roomSlice";  
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export const RoomComp = () => {
  const { roomId } = useParams<{ roomId: string }>();  
  const { hotelId } = useParams<{ hotelId: string }>();  
  const navigate = useNavigate(); 

  const dispatch = useDispatch();
  const room = useSelector((state: RootState) => state.room.room);

  useEffect(() => {
    if (!room || room.roomId !== Number(roomId)) {
      dispatch(fetchRoomById(Number(roomId)));
    }
  }, [dispatch, roomId]);

  if (!room) {
    return <div>The room was not found</div>;
  }

  return (
    <div className="room-details-container">
      <Card sx={{ maxWidth: 345, margin: 'auto', textAlign: 'center' ,marginTop:"17vh"}}>
        <CardMedia
          component="img"
          alt="Room"
          height="200"
          image={room.image ? `data:image/jpeg;base64,${room.image}` : '/default-room-image.jpg'}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            Room Type: {room.etype}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price per Night: {room.priceOfNight} ₪
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Availability: {room.availability ? 'Available' : 'Not Available'}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Link to={`/order/${roomId}`}>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: '#00008B', 
                color: '#fff', 
                fontFamily: 'Arial, sans-serif',
                '&:hover': {
                  backgroundColor: '#003366', 
                }
              }}
            >
              Order this Room
            </Button>
          </Link>
        </CardActions>
      </Card>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button
          variant="outlined"
          
          onClick={() => navigate(`/hotelComp`)} 
          sx={{
            color: '#00008B',
            borderColor: '#00008B',
            '&:hover': {
              borderColor: '#003366',
              backgroundColor: 'rgba(0, 51, 102, 0.1)',
            },
          }}
        >
          GO BACK
        </Button>
      </div>
    </div>
  );
}

export default RoomComp;
