import { Modal } from "antd";

const SignModal = ({ showModal = false, setShowModal }) => {
  const goToTelegramBot = () => {
    console.log("go to telegram bot");
  };

  return (
    <Modal
      title="عضویت"
      visible={showModal}
      onOk={goToTelegramBot}
      onCancel={() => setShowModal((prev) => !prev)}
      okText="عضویت در ربات"
      cancelText="بازگشت به اصلی"
      closable={false}
      maskClosable={false}
    >
      برای عضویت ابتدا وارد ربات شوید
    </Modal>
  );
};

export default SignModal;
