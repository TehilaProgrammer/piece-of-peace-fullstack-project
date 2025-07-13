
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'; 
import { NavBar } from '../components/NavBar';
import { HomePageComp } from '../components/HomePageComp';
import { AboutComp } from '../components/AboutComp';
import HotelComp from '../features/hotel/HotelComp';
import HotelDetailsComp from '../features/hotel/HotelDetailsComp'
 import SignUpComp from '../features/user/SignUpComp';
import RoomComp from '../features/room/RoomComp'
import  OrderComp  from '../features/order/OrderComp';
import OrderSuccComp from '../features/order/OrderSuccComp';
import PersonalAreaComp from '../features/user/PersonalAreaComp';
import Login from '../features/user/LoginComp'

export const Routing = () => {
  
  return (
    <Router>
  <NavBar />
      <Routes>
      <Route path="/Switch" element={<Login  />} />
      <Route path="/HotelComp" element={<HotelComp />} />
     <Route path="/home" element={<HomePageComp />} />
     <Route path="/About" element={<AboutComp />} />
    <Route path="/Personal" element={<PersonalAreaComp />} /> 
    <Route path="/hotel/:hotelId" element={<HotelDetailsComp />} />
    <Route path="/room/:roomId" element={<RoomComp />} />
     
    <Route path="/SignUp" element={<SignUpComp />} /> 
    <Route path="/Login" element={<Login />} />
    <Route path="/room" element={<RoomComp />} />
    <Route path="/order/:roomId" element={<OrderComp />} />
    <Route path="/orderSucc" element={<OrderSuccComp />} />
     <Route path="*" element={<HomePageComp />} /> 
      </Routes>
    </Router>
  )
}


