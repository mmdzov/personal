import { useContext } from 'react';
import Context from '../../context/Context';
import { IoPencil } from 'react-icons/io5';

const EditPen = ({ onClick }) => {
  const { user } = useContext(Context);
  if (!user?.isAdmin) return null;
  return (
    <span className="editpen" onClick={onClick}>
      <IoPencil />
    </span>
  );
};

export default EditPen;
