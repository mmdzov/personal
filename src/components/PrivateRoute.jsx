import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import SignModal from './Sign/SignModal';
import { useEffect, useState } from 'react';

function PrivateRoute({ children }) {
  const [showModal, setShowModal] = useState(true);
  useEffect(() => {
    console.log('test');
  }, []);
  const auth = useAuth();
  return auth ? (
    children
  ) : (
    <div
      style={{
        background: '#19203e',
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
      }}
    >
      <SignModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}

export default PrivateRoute;
