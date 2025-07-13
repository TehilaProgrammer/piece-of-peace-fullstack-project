
import video from '../video/israel.mp4';

import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const HomePageComp = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const useSelect = useSelector((state: RootState) => state.user.selectUser);

  console.log(user.userName);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh', 
        overflow: 'hidden', 
        margin: 0,
        padding: 0,
      }}
    >
      <video
        controls
        muted
        autoPlay
        loop
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover', 
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <source src={video} type="video/mp4" />
        The video is not supported in your browser.
      </video>

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          color: 'white',
          textAlign: 'center',
          fontSize: '3rem',
          fontWeight: 'bold',
          top: '50%',
          transform: 'translateY(-50%)', 
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)',
        }}
      >
        <h1>
          Welcome {useSelect.fullName === 'null' ? 'guest!' : useSelect.userName}!
        </h1>
      </div>
    </div>
  );
};

export default HomePageComp;
