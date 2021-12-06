import SignModal from './Sign/SignModal';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
  const { verified } = useSelector(({ main }) => main);
  const [showModal, setShowModal] = useState(!verified);
  return verified ? (
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
