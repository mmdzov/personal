/* eslint-disable no-unused-vars */
import { Container } from './BlogAdd.styled';
import { Input, Button, Select } from 'antd';
import { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import CropImage from '../CropImage/CropImage';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useLocation } from 'react-router-dom';
import PostImage from '../../assets/img/post.jpg';
import dataURLtoFile from '../../utils/dataURLToFile';

const { TextArea, Group } = Input;
const { Option } = Select;

const BlogAdd = () => {
  const [values, setValues] = useState({
    title: '',
    description: '',
    image: '',
    tags: [],
    category: {},
    content: '',
    new_category: '',
  });
  const [tags] = useState([
    {
      id: 3423426332,
      name: 'Javascript',
    },
    {
      id: 3423476756,
      name: 'react.js',
    },
    {
      id: 645534543,
      name: 'express.js',
    },
    {
      id: 64345342,
      name: 'tdd',
    },
    {
      id: 634436686,
      name: 'other',
    },
  ]);
  const [category] = useState([
    {
      id: 3423426332,
      name: 'Javascript',
    },
    {
      id: 3423476756,
      name: 'react.js',
    },
    {
      id: 645534543,
      name: 'express.js',
    },
    {
      id: 64345342,
      name: 'tdd',
    },
    {
      id: 634436686,
      name: 'other',
    },
  ]);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPost = (e) => {
    e.preventDefault();
  };

  const handleTag = (e) => {
    setValues((prev) => ({ ...prev, tags: e }));
    console.log(values.tags);
  };

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleChangeEditorState = (e) => {
    setEditorState(e);
  };

  const handleSubmit = () => {
    const content = document.getElementsByClassName('content')[0];
    console.log(content.textContent);
  };

  const [images, setImages] = useState([]);

  const [selectedImage, setSelectedImage] = useState({
    src: '',
    file: null,
  });
  const [openCrop, setOpenCrop] = useState(false);

  const selectImage = ({ target }) => {
    const reader = new FileReader();
    reader.readAsDataURL(target.files[0]);
    reader.onload = () => {
      let base64 = reader.result;
      setSelectedImage({ file: target.files[0], src: base64 });
      setOpenCrop(true);
    };
  };

  const [img, setImg] = useState(null);
  const [avatarCrop, setAvatarCrop] = useState(false);

  const setCrop = (image) => {
    if (!image) return;
    if (avatarCrop) {
      setValues((prev) => ({ ...prev, image: { src: image, file: dataURLtoFile(image) } }));
      setAvatarCrop(false);
    } else {
      setImages((prev) => [...prev, { src: image, file: dataURLtoFile(image) }]);
    }
    setImg(null);
  };

  const getCroppedImage = (cropped) => {
    setImg(cropped);
    setCrop(cropped);
  };

  const { state } = useLocation();

  useEffect(() => {
    if (!state) return;
    if (Object.keys(state?.data)?.length > 0) {
      const { data } = state;
      console.log(
        data.tags.map((item) => {
          return item.name;
        }),
      );
      setValues({
        tags: data.tags.map((item) => {
          return item.name;
        }),
        title: data.title,
        description: data.description,
        image: { src: PostImage },
        content: data.content,
        category: data.category,
      });
      const blocksFromHtml = htmlToDraft(data.content);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [state]);

  const handleChangeCat = (cat) => {
    const index = category.findIndex((item) => item.name === cat);
    setValues((prev) => ({ ...prev, category: category[index] }));
  };

  const handleSetCropAvatar = ({ target }) => {
    selectImage({ target });
    setAvatarCrop(true);
  };

  const closeCropper = () => {
    setImg(null);
    setAvatarCrop(false);
    setValues((prev) => ({ ...prev, image: { src: '', file: '' } }));
  };

  return (
    <Container>
      {selectedImage?.src ? (
        <CropImage
          openCrop={openCrop}
          src={selectedImage.src}
          cancel={closeCropper}
          setOpenCrop={setOpenCrop}
          callback={getCroppedImage}
        />
      ) : null}
      <form method="post" onSubmit={handleAddPost}>
        <Group className="group">
          <Input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="title"
          />
          <TextArea
            value={values.description}
            onChange={handleChange}
            placeholder="description"
            name="description"
            id="textarea"
            className="scroll"
            autoSize={{ minRows: 1, maxRows: 3 }}
          />
        </Group>
        <Group className="group-row">
          <Select
            defaultValue={values?.category?.name ?? 'Select category'}
            value={values?.category?.name ?? 'Select category'}
            className="select"
            style={{ width: 120, background: 'white' }}
            bordered={false}
            onChange={handleChangeCat}
          >
            {category.map((item) => (
              <Option value={item.name} className="option">
                {item.name}
              </Option>
            ))}
          </Select>
          <Input
            type="text"
            name="new_category"
            value={values.new_category}
            onChange={handleChange}
            placeholder="add & select cat"
          />
        </Group>
        <Group className="post-avatar">
          <div className="title">Post Avatar</div>
          {values?.image?.src ? <img src={values?.image?.src} alt="" /> : null}
          <input type="file" name="image" id="image" onChange={handleSetCropAvatar} />
        </Group>
        <Select
          mode="tags"
          style={{ width: '100%', marginBottom: '15px' }}
          onChange={handleTag}
          value={values.tags}
          tokenSeparators={[',']}
          placeholder="Tags"
        />
        <Group>
          {images.length > 0 ? (
            <div className="uploads">
              {images.map((item) => (
                <img src={item.src ?? ''} alt="" />
              ))}
            </div>
          ) : null}
          <input type="file" name="blogimage" onChange={selectImage} />
          <div className="preview">
            <div className="title">Preview </div>
            <img src={img ?? ''} alt="" />
          </div>
        </Group>
        <div style={{ color: 'black' }}>
          <Editor
            editorState={editorState}
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            onEditorStateChange={handleChangeEditorState}
          />
          <textarea
            disabled
            hidden
            className="content"
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          />
        </div>
        <Button type="primary" onClick={handleSubmit} style={{ marginTop: 15 }}>
          {state ? 'EditPost' : 'AddPost'}
        </Button>
      </form>
    </Container>
  );
};

export default BlogAdd;
