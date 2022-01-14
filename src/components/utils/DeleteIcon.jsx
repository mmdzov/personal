import { useState, Fragment } from 'react';
import { IoTrash } from 'react-icons/io5';
import useTokenDecode from '../../hooks/useTokenDecode';
import { Modal } from 'antd';
import useLanguage from '../../hooks/useLanguage';

const DeleteIcon = ({ title, onClick }) => {
  const data = useTokenDecode();
  const [open, setOpen] = useState();
  const handleDelete = () => {
    setOpen(false);
    onClick();
  };
  if (!data?.isAdmin) return null;

  const lang = useLanguage();

  return (
    <Fragment>
      <Modal
        title={title}
        visible={open}
        okText={lang.deleteicon.oktext}
        cancelText={lang.deleteicon.canceltext}
        onOk={handleDelete}
        bodyStyle={{
          direction: 'ltr',
        }}
        onCancel={() => setOpen(false)}
      >
        {lang.deleteicon.areyousure}
      </Modal>
      <span className="editpen" style={{ color: '#f44336' }} onClick={() => setOpen(true)}>
        <IoTrash />
      </span>
    </Fragment>
  );
};

export default DeleteIcon;
