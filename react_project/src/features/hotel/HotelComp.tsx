import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, TextField } from '@mui/material';
import { Hotel } from '../../models/Hotel';
import { AppDispatch, RootState } from '../../store/store';
import { fetchHotels } from '../hotel/hotelSlice';
import { useNavigate } from 'react-router-dom';


const HotelList = () => {
  const [filter, setFilter] = useState<string>('');
  const [priceRange, setPriceRange] = useState<{ min: number, max: number }>({ min: 0, max: 1000 });
  const [roomType, setRoomType] = useState<string>('');
  const hotels = useSelector((state: RootState) => state.hotel.hotels);
  const dispatch = useDispatch<AppDispatch>();
  const [filteredHotels, setFilterHotels] = useState(hotels);
  const navigate = useNavigate(); 


  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  useEffect(() => {
    if (!hotels) {
      setFilterHotels([]); 
    }
  
    if (!filter && priceRange.min === 0 && priceRange.max === 1000 && !roomType) {
      setFilterHotels(hotels);
      return;
    }
  
    const filters = hotels.filter((hotel) => {
      const nameMatch = hotel.hotelName.toLowerCase().includes(filter.toLowerCase());
      const priceMatch = (hotel.roomDTOList || []).some(
        (room) => room.priceOfNight >= priceRange.min && room.priceOfNight <= priceRange.max
      );
      const roomMatch = roomType ? (hotel.roomList || []).some((room) => room.etype == roomType) : true;
      return nameMatch && (priceRange.min >= 0 ? priceMatch : true) && roomMatch;
    });
  
    setFilterHotels(filters);
  }, [filter, priceRange, hotels, roomType]);
  

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    setPriceRange((prevRange) => ({
      ...prevRange,
      [type]: Number(e.target.value),
    }));
  };

  const handleRoomTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomType(e.target.value);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        רשימת מלונות
      </Typography>

      <div style={{ marginBottom: '20px' ,marginTop:"13vh"}}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={3}>
            <TextField
              id="filter-name"
              label="Filter by Name"
              variant="outlined"
              value={filter}
              onChange={handleFilterChange}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '56px',
                  '& fieldset': {
                    borderColor: '#FFB400', 
                    borderWidth: 4, 
                  },
                  '&:hover fieldset': {
                    borderColor: '#FFB400', 
                    borderWidth: 4,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FFB400', 
                    borderWidth: 4,
                  },
                },
                '& .MuiInputLabel-root': {
                  top: '-5px', 
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
          <TextField
  id="price-min"
  label="Min Price"
  variant="outlined"
  type="number"
  value={priceRange.min}
  onChange={(e) => handlePriceChange(e, 'min')}
  fullWidth
  sx={{
    '& .MuiOutlinedInput-root': {
      height:"-8.5625em",
      '& fieldset': {
        borderColor: '#FFB400',
        borderWidth: 4,
      },
      '&:hover fieldset': {
        borderColor: '#FFB400',
        borderWidth: 4,
      },
      '&.Mui-focused fieldset': {
        borderColor: '#FFB400',
        borderWidth: 4,
      },
    },
    '& .MuiInputLabel-root': {
      top: '-5px',
      lineHeight:"0.4375em"
    },
  }}
/>

          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="price-max"
              label="Max Price"
              variant="outlined"
              type="number"
              value={priceRange.max}
              onChange={(e) => handlePriceChange(e, 'max')}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#FFB400', 
                    borderWidth: 4, 
                  },
                  '&:hover fieldset': {
                    borderColor: '#FFB400',
                    borderWidth: 4,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FFB400', 
                    borderWidth: 4,
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              id="room-type"
              label="Room Type"
              variant="outlined"
              value={roomType}
              onChange={handleRoomTypeChange}
              fullWidth
              select
              SelectProps={{
                native: true,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#FFB400', 
                    borderWidth: 4, 
                  },
                  '&:hover fieldset': {
                    borderColor: '#FFB400',
                    borderWidth: 4,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FFB400', 
                    borderWidth: 4,
                  },
                },
              }}
            >
              <option value="">Select Room Type</option>
              <option value="CAPACITY">Capacity</option>
              <option value="ONE_MEN">One Men</option>
              <option value="PAIR">Pair</option>
              <option value="SMALL_FAMILY">Small Family</option>
              <option value="LARGE_FAMILY">Large Family</option>
              <option value="SMALL_HALL">Small Hall</option>
              <option value="LARGE_HALL">Large Hall</option>
            </TextField>
          </Grid>
        </Grid>
      </div>

      <Grid container spacing={3}>
        {filteredHotels && filteredHotels.map((hotel: Hotel) => (
          <Grid item xs={12} sm={6} md={4} key={hotel.hotelId}>
            <Card sx={{ maxWidth: 345, backgroundColor: '#FFFFFF', borderRadius: 0, textAlign: 'center' }}>
              <CardHeader
                title={hotel.hotelName}
                sx={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}
              />
              <CardMedia
                component="img"
                height="194"
                image={hotel.imageURL ? `data:image/jpeg;base64,${hotel.image}` : 'https://via.placeholder.com/345x194'}
                alt={hotel.hotelName}
              />
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#00008B',
                    color: '#fff', 
                    fontFamily: 'Arial, sans-serif',
                    '&:hover': {
                      backgroundColor: '#003366',
                    },
                  }}
                  component={Link}
                  to={`/hotel/${hotel.hotelId}`}
                >
                  Fetch
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/home')} 
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
    </>
  );
};

export default HotelList;
