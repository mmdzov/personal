import { useSelector } from 'react-redux';

const useAuth = () => {
  const { verified } = useSelector(({ main }) => main);
  return verified;
};

export default useAuth;
