import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import anime from 'animejs';
import '../../cssComponents/cssLogin.css'; 
import { fetchAddUser } from './userSlice';

interface FormData {
  fullName: string;
  userName: string;
  password: string;
  email: string;
  phoneNumber: string;
}

interface Errors {
  fullName: string;
  userName: string;
  password: string;
  email: string;
  phoneNumber: string;
}

const SignUpComp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    userName: '',
    password: '',
    email: '',
    phoneNumber: ''
  });

  const [errors, setErrors] = useState<Errors>({
    fullName: '',
    userName: '',
    password: '',
    email: '',
    phoneNumber: ''
  });

  useEffect(() => {
    let current: anime.AnimeInstance | null = null;

    const handleFocus = (selector: string, dashoffsetValue: number): void => {
      const element = document.querySelector(selector) as HTMLElement;
      if (element) {
        element.addEventListener('focus', function () {
          if (current) current.pause();
          current = anime({
            targets: 'path',
            strokeDashoffset: {
              value: dashoffsetValue,
              duration: 700,
              easing: 'easeOutQuart'
            },
            strokeDasharray: {
              value: '240 1386',
              duration: 700,
              easing: 'easeOutQuart'
            },
            stroke: ['#FFD700', '#FF7F00'],
          });
        });
      }
    };

    handleFocus('#fullName', 0);
    handleFocus('#userName', -336);
    handleFocus('#password', -730);
    handleFocus('#email', -1066);
    handleFocus('#phoneNumber', -1400);
    handleFocus('#submit', -1700);

    return () => {
      document.querySelector('#fullName')?.removeEventListener('focus', () => {});
      document.querySelector('#userName')?.removeEventListener('focus', () => {});
      document.querySelector('#password')?.removeEventListener('focus', () => {});
      document.querySelector('#email')?.removeEventListener('focus', () => {});
      document.querySelector('#phoneNumber')?.removeEventListener('focus', () => {});
      document.querySelector('#submit')?.removeEventListener('focus', () => {});
    };
  }, []);

  const validateFields = (): boolean => {
    const newErrors: Errors = { ...errors };

    if (!formData.fullName || !/^[a-zA-Z\s]{2,}$/.test(formData.fullName)) {
      newErrors.fullName = 'Full Name must contain at least 2 characters and only letters.';
    }

    if (!formData.userName || !/^[a-zA-Z\s]{2,}$/.test(formData.userName)) {
      newErrors.userName = 'User Name must contain at least 2 characters and only letters.';
    }

    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }

    setErrors(newErrors);

    const isValid = Object.keys(newErrors).every((key) => !newErrors[key as keyof Errors]);
    return isValid;
  };
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateFields()) {
      try {
        const response = await dispatch(fetchAddUser(formData)).unwrap(); 
       
        console.log(response);  

        if (response.status === 201) {
          console.log(response);
          navigate("/home"); 
        }
      } catch (err: any) {
        if (err.status === 409) {
          setErrors((prevError) => ({
            ...prevError,
            email: "User with this email already exists. Please use a different email.",
          }));
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <div className="page">
        <div className="container">
          <div className="left">
            <div className="login">Sign Up</div>
            <div className="eula">
              By signing up you agree to the ridiculously long terms that you didn't bother to read
            </div>
          </div>
          <div className="right">
            <svg viewBox="0 0 320 300">
              <defs>
                <linearGradient id="linearGradient" x1="13" y1="193.49992" x2="307" y2="193.49992" gradientUnits="userSpaceOnUse">
                  <stop style={{ stopColor: '#ff00ff' }} offset="0" />
                  <stop style={{ stopColor: '#ff0000' }} offset="1" />
                </linearGradient>
              </defs>
              <path d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143" />
            </svg>
            <div className="form">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName}</p>}

              <label htmlFor="userName">User Name</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
              />
              {errors.userName && <p style={{ color: 'red' }}>{errors.userName}</p>}

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber}</p>}

              <input
                type="submit"
                id="submit"
                value="Sign Up"
                onClick={handleSignup}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpComp;
