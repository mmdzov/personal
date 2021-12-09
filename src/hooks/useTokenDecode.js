import jwt from 'jsonwebtoken';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useTokenDecode = (callback = () => {}) => {
  const { token: tokenStore } = useSelector(({ main }) => main);
  const [decoded, setDecoded] = useState({});
  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedData = jwt.decode(token);
    setDecoded(decodedData);
    callback(decodedData);
  }, []);
  return decoded;
};

export default useTokenDecode;
