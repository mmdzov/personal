import { IoPencil } from 'react-icons/io5';
import { useSelector } from 'react-redux';

const EditPen = ({ onClick }) => {
  const { data } = useSelector(({ main }) => main);
  if (!data?.isAdmin) return null;
  return (
    <span className="editpen" onClick={onClick}>
      <IoPencil />
    </span>
  );
};

export default EditPen;
