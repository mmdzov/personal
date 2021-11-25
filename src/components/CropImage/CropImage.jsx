import { useState } from 'react';
import { Modal } from 'antd';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

function CropImage({
  src,
  openCrop = false,
  cancel = () => {},
  setOpenCrop = () => {},
  callback = () => {},
}) {
  const [cropData, setCropData] = useState('#');
  const [cropper, setCropper] = useState();
  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
    callback(cropData);
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
      className="cropImgModal"
      maskClosable={false}
    >
      <Cropper
        style={{ height: 400, width: '100%' }}
        zoomTo={0.5}
        initialAspectRatio={1}
        preview=".img-preview"
        src={src}
        viewMode={1}
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

// import React, { useState } from 'react';
// import Cropper from 'react-cropper';
// import 'cropperjs/dist/cropper.css';
// import './Demo.css';

// export const CropImage = ({ src }) => {
//   const [image, setImage] = useState(src);
//   const [cropData, setCropData] = useState('#');
//   const [cropper, setCropper] = useState();
//   const onChange = (e) => {
//     e.preventDefault();
//     let files;
//     if (e.dataTransfer) {
//       files = e.dataTransfer.files;
//     } else if (e.target) {
//       files = e.target.files;
//     }
//     const reader = new FileReader();
//     reader.onload = () => {
//       setImage(reader.result);
//     };
//     reader.readAsDataURL(files[0]);
//   };

//   const getCropData = () => {
//     if (typeof cropper !== 'undefined') {
//       setCropData(cropper.getCroppedCanvas().toDataURL());
//     }
//   };

//   return (

//   );
// };

// /* <img style={{ width: '100%' }} src={cropData} alt="cropped" /> */

// export default Demo;
