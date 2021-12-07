import { IoPencil } from 'react-icons/io5';
import useTokenDecode from '../../hooks/useTokenDecode';

const EditPen = ({ onClick }) => {
  const data = useTokenDecode();
  if (!data?.isAdmin) return null;
  return (
    <span className="editpen" onClick={onClick}>
      <IoPencil />
    </span>
  );
};

export default EditPen;
