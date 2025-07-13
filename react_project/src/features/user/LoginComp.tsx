import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Login } from './userSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import anime from 'animejs';
import '../../cssComponents/cssLogin.css';

interface FormData {
  userName: string;
  password: string;
}

interface Errors {
  userName: string;
  password: string;
}

const LoginComp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    userName: '',
    password: ''
  });

  const [errors, setErrors] = useState<Errors>({
    userName: '',
    password: ''
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

  handleFocus('#email', 0); 
  handleFocus('#password', -336);
  handleFocus('#submit', -730);

  return () => {
    document.querySelector('#email')?.removeEventListener('focus', () => {});
    document.querySelector('#password')?.removeEventListener('focus', () => {});
    document.querySelector('#submit')?.removeEventListener('focus', () => {});
  };
}, []);


  const validateFields = (): boolean => {
    const newErrors: Errors = { ...errors };

    if (!formData.userName || !/^[a-zA-Z\s]{2,}$/.test(formData.userName)) {
      newErrors.userName = 'User Name must contain at least 2 characters and only letters.';
    }

    if (!formData.password || !/^[\s\S]{6,}$/.test(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }
    

    setErrors(newErrors);

    const isValid = (Object.keys(newErrors) as (keyof Errors)[])
      .every((key) => !newErrors[key]);

    console.log('Validation result:', isValid);
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (validateFields()) {
      try {
        console.log(formData);

        const response = await dispatch(Login(formData)).unwrap();
        switch (response.status) {
          case 200:
            navigate('/home');
            break;
          case 401:
            console.log('401 - Invalid credentials');
            break;
          case 404:
            console.error('User not found');
            navigate('/signup');
            break;
        }
      } catch (error) {
        console.error('Error during login:', error);
        navigate('/Signup');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

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
            }
          });
        });
      }
    };

    handleFocus('#email', 0); 
    handleFocus('#password', -336); 
    handleFocus('#submit', -730); 

    return () => {
      document.querySelector('#email')?.removeEventListener('focus', () => {});
      document.querySelector('#password')?.removeEventListener('focus', () => {});
      document.querySelector('#submit')?.removeEventListener('focus', () => {});
    };
  }, []);

  return (
    <div>
      <h1>Login</h1>
      <div className="page">
        <div className="container">
          <div className="left">
            <div className="login">Login</div>
            <div className="eula">
              By logging in you agree to the ridiculously long terms that you didn't bother to read
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
              <label htmlFor="userName">userName</label>
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

              <input
                type="submit"
                id="submit"
                value="Submit"
                onClick={handleLogin}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComp;
