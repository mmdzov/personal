/* eslint-disable no-unused-vars */
import { Modal, Input, Form, Button, message, Statistic } from 'antd';
import { useState, Fragment, useRef } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import dataURLtoFile from '../../utils/dataURLToFile';
import CropImage from '../CropImage/CropImage';
import Joi from 'joi';
import UserRequest from '../../apis/userRequest';
import { verificationUser } from '../../store/actions/mainAction';
import { useDispatch } from 'react-redux';
import useLanguage from '../../hooks/useLanguage';
import { useNavigate } from 'react-router-dom';

const { Countdown } = Statistic;

const ur = new UserRequest();

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
  const lang = useLanguage();
  const [values, setValues] = useState(defaultValue);
  const [verifyCode, setVerifyCode] = useState('');
  const [retrySign, setRetrySign] = useState(false);
  const [validate, setValidate] = useState(defaultValidateValue);
  const [deadline, setDeadline] = useState(null);
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

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

  const verify = async () => {
    let result = inputTracking();
    if (!result) return;
    let serverResult = {};
    if (signIn) {
      serverResult = await ur.signInUser({ email: values.email });
    } else {
      const fd = new FormData();
      if (!values?.avatar?.file) return message.error('خطا! یک تصویر پروفایل انتخاب کنید');
      fd.append('avatar', values.avatar.file, 'post.jpg');
      fd.append('username', values.username);
      fd.append('email', values.email);

      console.log(values);

      serverResult = await ur.signUpUser(fd);
    }
    try {
      if (serverResult.status === 0) {
        message.warning(serverResult?.error?.title || serverResult?.error?.message);
        return null;
      }
      setDeadline(Date.now() + 1000 * 60 * 2);
      setStep(2);
    } catch (e) {}
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
    const newFile = dataURLtoFile(cropped, values.avatar.file.name);
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
    dispatch(
      verificationUser(verifyCode, (token) => {
        setStep(1);
        setVerifyCode('');
        setValues(defaultValue);
        setShowModal(false);
        message.success(lang.sign.successlogin);
      }),
    );
  };

  const finishedDeadline = () => {
    setRetrySign(true);
  };

  const handleRetrySign = () => {
    setStep(1);
    setValues(defaultValue);
    setVerifyCode('');
    setRetrySign(false);
  };

  const navigate = useNavigate();
  const cancelSign = () => {
    navigate('/');
    setShowModal((prev) => !prev);
  };

  if (step === 2)
    return (
      <Modal
        title={lang.sign.verifycode}
        visible
        onOk={handleVerifyCode}
        onCancel={() => null}
        cancelButtonProps={{
          hidden: true,
        }}
        okButtonProps={{
          disabled: retrySign,
        }}
        okText={lang.sign.complete}
        closable={false}
        maskClosable={false}
      >
        <Form style={{ direction: 'ltr' }}>
          <div className="verifyCodeTitle">
            {lang.sign.sendedcode}{' '}
            {retrySign ? (
              <span style={{ color: '#2196f3', cursor: 'pointer' }} onClick={handleRetrySign}>
                {lang.sign.retry}
              </span>
            ) : null}
            <Countdown title={lang.sign.countdown} value={deadline} onFinish={finishedDeadline} />
          </div>
          <Form.Item
            style={{
              marginBottom: '0px',
            }}
            validateStatus={validate?.verifyCode?.length > 0 ? 'warning' : 'success'}
            help={validate?.verifyCode?.length > 0 ? validate.verifyCode : ''}
          >
            <Input
              type="tel"
              placeholder={lang.sign.inputs.verifycode}
              value={verifyCode}
              disabled={retrySign}
              autoComplete="false"
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
        title={signIn ? lang.sign.signin : lang.sign.signup}
        visible={showModal}
        onOk={verify}
        onCancel={cancelSign}
        okText={signIn ? lang.sign.signin : lang.sign.signup}
        cancelText={lang.sign.canceltext}
        closable={false}
        bodyStyle={{
          direction: 'rtl',
        }}
        maskClosable={false}
      >
        <div className="switchSign">
          <Button type={signIn ? 'primary' : 'link'} onClick={() => setSign('in')}>
            {lang.sign.signin}
          </Button>
          <Button type={signIn ? 'link' : 'primary'} onClick={() => setSign('up')}>
            {lang.sign.signup}
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
                  autoComplete="false"
                  placeholder={lang.sign.inputs.username}
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
              placeholder={lang.sign.inputs.email}
              autoComplete="false"
            />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default SignModal;
