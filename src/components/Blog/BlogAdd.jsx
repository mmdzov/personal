/* eslint-disable no-unused-vars */
import { Container } from './BlogAdd.styled';
import { Input, Button, Select, message } from 'antd';
import { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import CropImage from '../CropImage/CropImage';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useLocation, useNavigate } from 'react-router-dom';
import PostImage from '../../assets/img/post.jpg';
import dataURLtoFile from '../../utils/dataURLToFile';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog, getTags, setPostImage } from '../../store/actions/blogAction';
import { Helmet } from 'react-helmet';
import useLanguage from '../../hooks/useLanguage';

const { TextArea, Group } = Input;
const { Option } = Select;

const BlogAdd = () => {
  const lang = useLanguage();
  const navigate = useNavigate();
  const { tags, categories, post_images, blog } = useSelector(({ blogs }) => blogs);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    title: '',
    description: '',
    image: '',
    tags: [],
    category: {},
    content: '',
    new_category: '',
  });

  useEffect(() => {
    dispatch(getTags());
  }, []);
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

  const handleSubmit = async () => {
    const content = document.getElementsByClassName('content')[0];

    const fd = new FormData();
    fd.append('title', values.title);
    fd.append('description', values.description);
    fd.append('tags', JSON.stringify(values.tags));
    fd.append(
      'category',
      values?.new_category?.length === 0 ? values?.category?.name : values?.new_category,
    );
    fd.append('content', content.textContent);
    fd.append('image', values.image?.file);

    await dispatch(addBlog(fd, navigate));
  };

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
      const formData = new FormData();
      console.log(dataURLtoFile(image, 'blogimage.jpg'));
      formData.append('blogimage', dataURLtoFile(image, 'blogimage.jpg'));
      dispatch(setPostImage(formData));
    }
    setOpenCrop(false);
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
      // console.log(
      //   data.tags.map((item) => {
      //     return item.name;
      //   }),
      // );
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
    const index = categories.findIndex((item) => item.name === cat);
    setValues((prev) => ({ ...prev, category: categories[index] }));
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

  const copyToClipboard = async (link) => {
    let result = await navigator.clipboard.writeText(link);
    message.info(lang.blogadd.messages.clipboardcopy);
  };

  return (
    <Container>
      {state?.data && Object.keys(state?.data)?.length > 0 ? (
        <Helmet>
          <title>{`${lang.pages.editpost} | Personal`}</title>
          {/* <meta name="description" content='' /> */}
        </Helmet>
      ) : (
        <Helmet>
          <title>{`${lang.pages.addpost} | Personal`}</title>
          {/* <meta name="description" content='' /> */}
        </Helmet>
      )}
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
            placeholder={lang.blogadd.inputs.title}
          />
          <TextArea
            value={values.description}
            onChange={handleChange}
            placeholder={lang.blogadd.inputs.description}
            name="description"
            id="textarea"
            className="scroll"
            autoSize={{ minRows: 1, maxRows: 3 }}
          />
        </Group>
        <Group className="group-row">
          <Select
            defaultValue={values?.category?.name ?? lang.blogadd.inputs.defaultCategoryValue}
            value={values?.category?.name ?? lang.blogadd.inputs.defaultCategoryValue}
            className="select"
            style={{ width: 120, background: 'white' }}
            bordered={false}
            onChange={handleChangeCat}
          >
            {categories.map((item) => (
              <Option value={item?.name} key={item?._id} className="option">
                {item?.name}
              </Option>
            ))}
          </Select>
          <Input
            type="text"
            name="new_category"
            value={values.new_category}
            onChange={handleChange}
            placeholder={lang.blogadd.inputs.newcategory}
          />
        </Group>
        <Group className="post-avatar">
          <div className="title">{lang.blogadd.labels.postavatar}</div>
          {values?.image?.src ? <img src={values?.image?.src} alt="" /> : null}
          <input type="file" name="image" id="image" onChange={handleSetCropAvatar} />
        </Group>
        <Select
          mode="tags"
          style={{ width: '100%', marginBottom: '15px' }}
          onChange={handleTag}
          value={values.tags}
          tokenSeparators={[',']}
          placeholder={lang.blogadd.inputs.tags}
        >
          {tags?.map((item) => (
            <Select.Option key={item?._id} value={item?.name}>
              {item?.name}
            </Select.Option>
          ))}
        </Select>
        <Group>
          {post_images.length > 0 ? (
            <div className="uploads">
              {post_images.map((item) => (
                <img src={item ?? ''} alt="" key={item} onClick={() => copyToClipboard(item)} />
              ))}
            </div>
          ) : null}
          <input type="file" name="blogimage" onChange={selectImage} />
          <div className="preview">
            <div className="title">{lang.blogadd.labels.preview} </div>
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
          {state ? lang.blogadd.buttons.editpost : lang.blogadd.buttons.addpost}
        </Button>
      </form>
    </Container>
  );
};

export default BlogAdd;
