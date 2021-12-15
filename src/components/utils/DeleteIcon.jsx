import { useState, Fragment } from 'react';
import { IoTrash } from 'react-icons/io5';
import useTokenDecode from '../../hooks/useTokenDecode';
import { Modal } from 'antd';

const DeleteIcon = ({ title, onClick }) => {
  const data = useTokenDecode();
  const [open, setOpen] = useState();
  const handleDelete = () => {
    setOpen(false);
    onClick();
  };
  if (!data?.isAdmin) return null;
  return (
    <Fragment>
      <Modal
        title={title}
        visible={open}
        okText="Yes"
        cancelText="No"
        onOk={handleDelete}
        bodyStyle={{
          direction: 'ltr',
        }}
        onCancel={() => setOpen(false)}
      >
        Are You Sure ?
      </Modal>
      <span className="editpen" style={{ color: '#f44336' }} onClick={() => setOpen(true)}>
        <IoTrash />
      </span>
    </Fragment>
  );
};

export default DeleteIcon;
