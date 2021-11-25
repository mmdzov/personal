/* eslint-disable no-unused-vars */
import { Container } from './BlogAdd.styled';
import { Input, Tag, Button, Select } from 'antd';
import { Fragment, useState } from 'react';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import CropImage from '../CropImage/CropImage';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const { TextArea, Group } = Input;
const { Option } = Select;

const BlogAdd = () => {
  const [values, setValues] = useState({
    title: '',
    description: '',
    image: '',
    tags: [],
    content: '',
  });

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

  function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const [img, setImg] = useState(null);

  const getCroppedImage = (cropped) => {
    setImg(cropped);
  };

  const setCrop = () => {
    if (!img) return;
    setImages((prev) => [...prev, { src: img, file: dataURLtoFile(img) }]);
    setImg(null);
  };

  return (
    <Container>
      {selectedImage?.src ? (
        <CropImage
          openCrop={openCrop}
          src={selectedImage.src}
          cancel={setCrop}
          setOpenCrop={setOpenCrop}
          callback={getCroppedImage}
        />
      ) : null}
      <form method="post" onSubmit={handleAddPost}>
        <Group className="group">
          <Input type="text" name="title" placeholder="title" />
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
            defaultValue={'Select Category'}
            className="select"
            style={{ width: 120, background: 'white' }}
            bordered={false}
          >
            {category.map((item) => (
              <Option value={item.name} className="option">
                {item.name}
              </Option>
            ))}
          </Select>
          <Input type="text" name="addSelectCat" placeholder="add & select cat" />
        </Group>
        <Group className="post-avatar">
          <div className="title">Post Avatar</div>
          <input type="file" name="image" id="image" onChange={handleChange} />
        </Group>
        <Select
          mode="tags"
          style={{ width: '100%', marginBottom: '15px' }}
          onChange={handleTag}
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
          AddPost
        </Button>
      </form>
    </Container>
  );
};

export default BlogAdd;
