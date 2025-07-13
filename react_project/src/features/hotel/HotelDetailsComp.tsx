import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../store/store";
import { fetchHotelById, fetchresponsesByHotel } from "./hotelSlice";
import { AddResponse } from "../response/responseSlice";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { Grid, Box } from '@mui/material';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';


const HotelDetails = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const hotels = useSelector((state: RootState) => state.hotel.hotels)!;
  const hotel = hotels.find(h => h.hotelId === Number(hotelId));
  const dispatch = useDispatch();
  const responses = useSelector((state: RootState) => state.hotel.responses);
  const [newResponse, setNewResponse] = useState(""); 
  const user = useSelector((state: RootState) => state.user.selectUser);
  const navigate = useNavigate(); 

  console.log(hotel?.roomList);

  const [value, setValue] = useState<number | null>(hotel?.stars || 0);
  const [hover, setHover] = useState(-1);

  const labels: { [key: number]: string } = {
    0.5: "Poor",
    1: "Fair",
    1.5: "Fair",
    2: "Good",
    2.5: "Good",
    3: "Good",
    3.5: "Very Good",
    4: "Very Good",
    4.5: "Excellent",
    5: "Excellent",
  };

  useEffect(() => {
    if (hotelId) {
      dispatch(fetchHotelById(parseInt(hotelId)));
      dispatch(fetchresponsesByHotel(parseInt(hotelId))); 
    }
  }, [hotelId, dispatch]);

  if (!hotel) {
    return <p>Loading...</p>;
  }

  const handleAddResponse = () => {
    if (newResponse.trim()) {
      const responseObject = {
        response: newResponse,
        hotelId: hotel.hotelId,
        userId: user.userId
      };
      dispatch(AddResponse(responseObject)); 
      setNewResponse(""); 
    }
  };
  console.log(hotel.image);

  return (
    <div style={{ marginTop: "20vh" }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#00008B' }}>
        {hotel.hotelName}
      </Typography>
      
      <img
        src={hotel?.image ? `data:image;base64,${hotel.image}` : "IMAGE_HEAR"}
        alt="hotel"
        style={{ width: "100%", height: "auto", maxHeight: "400px", objectFit: "cover" }}
      />

      <Typography variant="body1" sx={{ marginTop: '20px' }}>
        <strong>Address:</strong> {hotel.hotelAddress}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: '10px' }}>
        <strong>Description:</strong> {hotel.description}
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ marginTop: '40px' }}>
        Room Types
      </Typography>
      <Grid container spacing={3}>
        {hotel.roomDTOList.length > 0 ? (
          hotel.roomDTOList.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room.roomId}>
              <Card sx={{ display: 'flex', maxWidth: '100%', backgroundColor: '#FFFFFF', borderRadius: 2 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    sx={{ width: 200, height: 'auto' }}
                    image={room.image ? `data:image;base64,${room.image}` : 'https://via.placeholder.com/200'}
                    alt={room.etype}
                  />

                  <Box sx={{ flex: 1, padding: 2 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {room.etype} Room
                      </Typography>
                      <Box sx={{ height: '5px', backgroundColor: '#FFD700', marginBottom: '15px' }}></Box>
                      <Typography variant="body2" color="text.secondary">
                        Price per night: {room.priceOfNight} ₪
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Capacity: {room.capacity} people
                      </Typography>
                    </CardContent>
                  </Box>
                </CardActionArea>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button size="small" color="primary" component={Link} to={`/room/${room.roomId}`}>
                    More Info
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <p>No rooms available.</p>
        )}
      </Grid>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/HotelComp')} 
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
      <Typography variant="h5" gutterBottom sx={{ marginTop: '40px', fontWeight: 'bold' }}>
        Responses
      </Typography>
      <Box sx={{ marginTop: '10px' }}>
        {responses && responses.length > 0 ? (
          responses.map((response) => (
            <Box key={response.id} sx={{ marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                 {response.userId}:
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {response.response}
              </Typography>
            </Box>
          ))
        ) : (
          <p>No responses yet.</p>
        )}
      </Box>

      <Typography variant="h6" gutterBottom sx={{ marginTop: '40px' }}>
        Add a Response
      </Typography>
      <textarea
        value={newResponse}
        onChange={(e) => setNewResponse(e.target.value)}
        placeholder="Write your response here..."
        rows={4}
        style={{ width: '100%', padding: '10px', borderRadius: '4px' }}
      />
      <button
        onClick={handleAddResponse}
        style={{
          backgroundColor: '#00008B',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          marginTop: '10px',
        }}
      >
        Submit Response
      </button>

    </div>
  );
};

export default HotelDetails;
