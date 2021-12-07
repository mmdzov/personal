import jwt from 'jsonwebtoken';
import { useEffect, useState } from 'react';

const useTokenDecode = () => {
  const [decoded, setDecoded] = useState({});
  useEffect(() => {
    const token = localStorage.getItem('token');
    setDecoded(jwt.decode(token));
  }, []);
  return decoded;
};

export default useTokenDecode;
