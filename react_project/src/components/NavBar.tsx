import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "../cssComponents/NavBar.css";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { logOutUser } from '../features/user/userSlice'

export const NavBar = () => {
  const user = useSelector((state: RootState) => state.user.selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logOutUser()); 
    navigate("/Login"); 
  };

  return (
    <nav>
      <Link to="/" className='title'>
        A piece of peace
      </Link>
      <p>{user.userName}</p>
      <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/">A piece of peace</NavLink>
        </li>
        <li>
          <NavLink to="/About">About</NavLink>
        </li>
      
        <li>
          <NavLink to="/Personal">
            Personal Area
          </NavLink>
        </li>
        <li>
          <NavLink to="/HotelComp">Hosting</NavLink>
        </li>
        {user.userName ? (
          <li><button onClick={handleLogout}>LogOut</button></li>
        ) : (
          <>
            <li><NavLink to="/Login">Login</NavLink></li>
            <li><NavLink to="/SignUp">SignUp</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
}
