import { useState } from 'react';
import { Modal } from 'antd';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

function CropImage({
  src,
  aspect = 0,
  openCrop = false,
  cancel = () => {},
  setOpenCrop = () => {},
  callback = () => {},
}) {
  const [cropper, setCropper] = useState();
  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      const crop = cropper.getCroppedCanvas().toDataURL();
      callback(crop);
    }
  };
  const handleCancel = () => {
    setOpenCrop((prev) => !prev);
    cancel();
  };
  return (
    <Modal
      title="crop"
      visible={openCrop}
      onOk={getCropData}
      onCancel={handleCancel}
      okText="crop"
      cancelText="close"
      closable={false}
      bodyStyle={{
        direction: 'rtl',
      }}
      className="cropImgModal"
      maskClosable={false}
    >
      <Cropper
        style={{ height: 400, width: '100%', objectFit: 'contain' }}
        initialAspectRatio={4 / 4}
        preview=".img-preview"
        src={src}
        viewMode={1}
        aspectRatio={aspect}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        background={false}
        responsive
        autoCropArea={1}
        checkOrientation={false}
        onInitialized={(instance) => {
          setCropper(instance);
        }}
        guides
      />
    </Modal>
  );
}

export default CropImage;
