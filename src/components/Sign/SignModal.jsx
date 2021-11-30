import { Modal, Input, Form, Button } from 'antd';
import { useState, Fragment, useRef } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import dataURLtoFile from '../../utils/dataURLToFile';
import CropImage from '../CropImage/CropImage';
import Joi from 'joi';

const signInValidate = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base': 'Invalid Type Email',
      'any.required': 'Please Fill Email',
      'string.empty': 'Please Fill Email',
    }),
});

const signUpValidate = Joi.object({
  avatar: Joi.object(),
  username: Joi.string().min(5).max(32).required().messages({
    'string.base': 'Invalid Type Username',
    'any.required': 'Please fill Username',
    'string.empty': 'Please fill Username',
    'string.min': 'Username must have at least 5 characters',
    'string.max': 'Username must be a maximum of 32 characters',
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base': 'Invalid Type Email',
      'any.required': 'Please Fill Email',
      'string.empty': 'Please Fill Email',
    }),
});

const verifyCodeValidate = Joi.object({
  verifyCode: Joi.string().min(5).required().messages({
    'string.base': 'Invalid Type Verify',
    'string.empty': 'Please Fill Verify-code',
    'any.required': 'Please Fill Verify-code',
    'string.min': 'Verify-code must have at least 5 characters',
  }),
});

const defaultValue = {
  avatar: { src: null, file: null },
  username: '',
  email: '',
};
const defaultValidateValue = {
  email: '',
  username: '',
  verifyCode: '',
};

const SignModal = ({ showModal = false, setShowModal }) => {
  const [signIn, setSignIn] = useState(true);
  const [values, setValues] = useState(defaultValue);
  const [verifyCode, setVerifyCode] = useState('');
  const [validate, setValidate] = useState(defaultValidateValue);
  const [step, setStep] = useState(1);

  const inputTracking = () => {
    let valid = '';
    if (signIn) {
      valid = signInValidate.validate({ email: values.email });
    } else {
      valid = signUpValidate.validate({ email: values.email, username: values.username });
    }
    if (Object.keys(valid).includes('error')) {
      setValidate({ [valid.error.details[0].path[0]]: valid.error.message });
      return false;
    }
    setValidate(defaultValidateValue);
    return true;
  };

  const verify = () => {
    let result = inputTracking();
    if (!result) return;
    setStep(2);
  };

  const avatar = useRef();

  const handleSelectAvatar = () => {
    avatar.current?.click();
  };
  const [openCrop, setOpenCrop] = useState(false);

  const handleChangeAvatar = ({ target }) => {
    const file = target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const data = reader.result;
      setValues((prev) => ({ ...prev, avatar: { src: data, file } }));
      setOpenCrop(true);
    };
  };
  const closeCropper = () => {
    setOpenCrop(false);
    setValues((prev) => ({ ...prev, avatar: { src: null, file: null } }));
  };

  const getCroppedImage = (cropped) => {
    const newFile = dataURLtoFile(cropped, values.avatar.file.filename);
    setValues((prev) => ({ ...prev, avatar: { src: cropped, file: newFile } }));
    setOpenCrop(false);
  };

  const setSign = (mode) => {
    if (mode === 'in') setSignIn(true);
    else setSignIn(false);
    setValues(defaultValue);
    setValidate(defaultValidateValue);
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;
    inputTracking();
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeVerifyCode = ({ target }) => {
    const valid = verifyCodeValidate.validate({ verifyCode: target.value });
    if (valid?.error) {
      setValidate({ verifyCode: valid.error.message });
    } else {
      setValidate(defaultValidateValue);
    }
    setVerifyCode(target.value);
  };

  const handleVerifyCode = () => {
    const vc = 124534;
    if (+verifyCode === vc) {
      console.log('ok');
      setStep(1);
      setVerifyCode('');
      setValues('');
      setShowModal(false);
    } else {
      console.log('notValidate');
    }
  };

  if (step === 2)
    return (
      <Modal
        title={'verify-code'}
        visible
        onOk={handleVerifyCode}
        onCancel={() => null}
        cancelButtonProps={{
          hidden: true,
        }}
        okText={'Complete'}
        closable={false}
        maskClosable={false}
      >
        <Form style={{ direction: 'ltr' }}>
          <div className="verifyCodeTitle">
            A verification code has been sent to your email. Please enter it here
          </div>
          <Form.Item
            style={
              {
                marginBottom: '0px',
              }
            }
            validateStatus={validate?.verifyCode?.length > 0 ? 'warning' : 'success'}
            help={validate?.verifyCode?.length > 0 ? validate.verifyCode : ''}
          >
            <Input
              type="tel"
              placeholder="Verify code"
              value={verifyCode}
              autoComplete={false}
              onChange={handleChangeVerifyCode}
            />
          </Form.Item>
        </Form>
      </Modal>
    );

  return (
    <Fragment>
      {values.avatar?.src ? (
        <CropImage
          openCrop={openCrop}
          src={values.avatar.src}
          cancel={closeCropper}
          setOpenCrop={setOpenCrop}
          aspect={4 / 4}
          callback={getCroppedImage}
        />
      ) : null}
      <Modal
        title={signIn ? 'Sign-in' : 'Sign-up'}
        visible={showModal}
        onOk={verify}
        onCancel={() => setShowModal((prev) => !prev)}
        okText={signIn ? 'Sign-in' : 'Sign-up'}
        cancelText="Cancel"
        closable={false}
        maskClosable={false}
      >
        <div className="switchSign">
          <Button type={signIn ? 'primary' : 'link'} onClick={() => setSign('in')}>
            Sign-in
          </Button>
          <Button type={signIn ? 'link' : 'primary'} onClick={() => setSign('up')}>
            Sign-up
          </Button>
        </div>
        <Form onSubmit={(e) => e.preventDefault()} style={{ direction: 'ltr' }}>
          {!signIn ? (
            <Fragment>
              <div className="signAvatarContainer">
                <div className="signAvatarSelect" onClick={handleSelectAvatar}>
                  {values.avatar?.src ? (
                    <img className="avatar" src={values.avatar?.src} alt="" />
                  ) : (
                    <AiOutlinePlus />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleChangeAvatar}
                  ref={avatar}
                  hidden
                />
              </div>
              <Form.Item
                validateStatus={validate?.username?.length > 0 ? 'warning' : 'success'}
                help={validate?.username?.length > 0 ? validate.username : ''}
              >
                <Input
                  type="text"
                  value={values.username}
                  name="username"
                  onChange={handleChange}
                  autoComplete={false}
                  placeholder="Username"
                />
              </Form.Item>
            </Fragment>
          ) : null}
          <Form.Item
            validateStatus={validate?.email?.length > 0 ? 'warning' : 'success'}
            help={validate?.email?.length > 0 ? validate.email : ''}
          >
            <Input
              type="email"
              value={values.email}
              name="email"
              onChange={handleChange}
              placeholder="Email"
              autoComplete={false}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default SignModal;
