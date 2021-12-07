import jwt from 'jsonwebtoken';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useTokenDecode = () => {
  const { token } = useSelector(({ main }) => main);
  const [decoded, setDecoded] = useState({});
  useEffect(() => {
    const token = localStorage.getItem('token');
    setDecoded(jwt.decode(token));
  }, [token]);
  return decoded;
};

export default useTokenDecode;
