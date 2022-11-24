import { IoPencil } from 'react-icons/io5';
import useTokenDecode from '../../hooks/useTokenDecode';

const EditPen = ({ onClick, style }) => {
  const data = useTokenDecode();
  if (!data?.isAdmin) return null;
  return (
    <span className="editpen" onClick={onClick} style={style}>
      <IoPencil />
    </span>
  );
};

export default EditPen;
