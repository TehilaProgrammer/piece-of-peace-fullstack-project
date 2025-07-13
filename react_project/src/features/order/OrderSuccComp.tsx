import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const OrderSuccComp = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/home');
  };

  const goToOrder = () => {
    navigate('/room');
  };

  return (
    <div style={{ marginTop: '27vh', textAlign: 'center' }}>
      <h1>Thank you for your order!</h1>
      <div>
        <Button onClick={goHome} style={{ marginRight: '10px' }} variant="contained">
          Go to Home
        </Button>
        <Button onClick={goToOrder} variant="contained">
        Ordering another room
        </Button>
      </div>
    </div>
  );
};

export default OrderSuccComp;
