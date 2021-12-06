import { useSelector } from 'react-redux';

const useAuth = () => {
  const { verified } = useSelector(({ main }) => main);
  console.log(verified);
  return verified;
};

export default useAuth;
