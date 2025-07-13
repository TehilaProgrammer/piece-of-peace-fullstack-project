import { useState } from 'react';
import '../cssComponents/cssLogin&SugnUp.css';
import LoginComp from '../features/user/LoginComp';
import SignUpComp from '../features/user/SignUpComp';

const Login = () => {
  const [switched, setSwitched] = useState(false);

  return (
    <div className="local-container">
      <div className={`demo ${switched ? 's--switched' : ''}`}>
        <div className="demo__inner">
          <div className="demo__forms">
            <div className="demo__form">
              <div className="demo__form-content">
                {!switched && <LoginComp />}
              </div>
            </div>
            <div className="demo__form">
              <div className="demo__form-content">
                {switched && <SignUpComp />}
              </div>
            </div>
          </div>
          <div className="demo__switcher">
            <div className="demo__switcher-inner">
              <div className="demo__switcher-content">
                <div className="demo__switcher-text">
                  <div>
                    <h3>New here?</h3>
                    <p>Sign up and discover a great amount of new opportunities!</p>
                  </div>
                  <div>
                    <h3>One of us?</h3>
                    <p>If you already have an account, just sign in. We've missed you!</p>
                  </div>
                </div>
                <button
                  className="demo__switcher-btn"
                  onClick={() => setSwitched(!switched)}
                >
                  <span className="animated-border" />
                  <span className="demo__switcher-btn-inner">
                    <span>Sign Up</span>
                    <span>Sign In</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;