/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import EditPen from '../utils/EditPen';
import { Image, Input, Button } from 'antd';
import errorImg from '../utils/errorImg';
import { useDispatch, useSelector } from 'react-redux';
import { changeAvatar, changeBio, changeUsername } from '../../store/actions/mainAction';

const { TextArea } = Input;

const Header = () => {
  const pickImageRef = useRef();
  const { data } = useSelector(({ main }) => main);
  const dispatch = useDispatch();

  const selectFile = async ({ target }) => {
    const file = target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append(target.name, file);
    await dispatch(changeAvatar(data));
  };

  const handlePickImage = () => {
    pickImageRef.current.click();
  };

  const [editTitle, setEditTile] = useState(false);
  const [editBio, setEditBio] = useState(false);

  const [values, setValues] = useState({
    username: data?.username,
    bio: data?.bio,
  });

  const handleChange = ({ target }) => {
    setValues((prev) => ({
      ...prev,
      [target.name]: target.name === 'bio' ? target.value.split('\n') : target.value,
    }));
  };

  useEffect(() => {
    setValues({
      username: data?.username,
      bio: data?.bio,
    });
  }, [data]);

  const handleSubmit = (e, mode = '') => {
    e.preventDefault();
    if (mode === 'username') {
      dispatch(changeUsername(values.username));
    } else if (mode === 'bio') {
      dispatch(changeBio(values.bio));
    }
    setEditTile(false);
    setEditBio(false);
  };

  return (
    <Container>
      <input
        type="file"
        onChange={selectFile}
        name="avatar"
        accept="image/png, image/jpeg, imaage/jpg"
        id="avatar"
        ref={pickImageRef}
        hidden
      />
      <div className="profile">
        <div className="" style={{ position: 'relative' }}>
          <Image className="profile-img" src={data?.avatar} fallback={errorImg} />
          <EditPen onClick={handlePickImage} />
        </div>
        <div className="titlebox" style={{ position: 'relative' }}>
          <div className="title">
            {editTitle ? (
              <form style={{ display: 'flex', width: 195 }}>
                <Input
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                />
                <Button type="primary" onClick={(e) => handleSubmit(e, 'username')}>
                  Edit
                </Button>
              </form>
            ) : (
              <span>{data?.username}</span>
            )}
          </div>
          <EditPen onClick={() => setEditTile((prev) => !prev)} />
        </div>
      </div>

      <div className="sec" style={{ marginTop: 0 }}>
        <div className="sec-title-box">
          <div className="sec-title">Bio</div>
          <EditPen onClick={() => setEditBio((prev) => !prev)} />
        </div>
        <div className="sec-list">
          {editBio ? (
            <form>
              <TextArea
                style={{ marginBottom: '10px' }}
                name="bio"
                value={values.bio?.join('\n')}
                onChange={handleChange}
                placeholder="Bio..."
                id="textarea"
                className="scroll"
                autoSize={{ minRows: 1, maxRows: 5 }}
              />
              <Button type="primary" onClick={(e) => handleSubmit(e, 'bio')}>
                Edit
              </Button>
            </form>
          ) : (
            data?.bio?.map((item) => <span key={~~Math.floor(Math.random() * 99999)}>{item}</span>)
          )}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .titlebox {
    .editpen {
      left: -35px !important;
      bottom: -1px !important;
    }
  }

  .profile {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 11px 10px;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
    @media (min-width: 475px) {
      width: 475px;
      margin: 0 auto;
    }
  }

  .title {
    font-size: 1rem;
    font-family: sans-serif;
    line-height: 23px;
    color: #d5d5d5;
    text-align: left;
  }

  .profile-img {
    width: 100px;
    height: 100px;
    border-radius: 100px;
  }
  .ant-image {
    overflow: hidden;
    border-radius: 100%;
    margin-bottom: 15px;
  }
  .names {
  }
`;

export default Header;
