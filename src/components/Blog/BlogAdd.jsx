/* eslint-disable no-unused-vars */
import { Container } from './BlogAdd.styled';
import { Input, Tag, Button, Select } from 'antd';
import { useState } from 'react';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
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

  const [tag, setTag] = useState(null);

  const handleNewTag = () => {
    setTag('');
  };

  const handleChangeTag = ({ target }) => {
    setTag(target.value);
  };

  const handleAddTag = () => {
    values.tags.push(tag);
    setValues((prev) => ({ ...prev, tags: values.tags }));
    setTag(null);
  };

  const handleDeleteTag = (index) => {
    const tags = values.tags.filter((_, i) => i !== index);
    values.tags = tags;
    setValues((prev) => ({ ...prev, tags: values.tags }));
  };

  const handleTag = (e) => {
    setValues((prev) => ({ ...prev, tags: e }));
  };
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const handleChangeEditorState = (e) => {
    setEditorState(e);
    // setValues((prev) => ({
    //   ...prev,
    //   content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    // }));
  };

  const handleSubmit = () => {
    const content = document.getElementsByClassName('content')[0];
    console.log(content.textContent);
  };

  return (
    <Container>
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
        <Group className='post-avatar'>
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
        {/* <div className="tagGroup">
          {values.tags.map((item, index) => (
            <Tag className="tag">
              {item}
              <span style={{ cursor: 'pointer' }} onClick={() => handleDeleteTag(index)}>
                <AiOutlineClose />
              </span>
            </Tag>
          ))}
        </div> */}
        {/* {tag !== null ? (
          <Group className="addtag">
            <Input type="text" value={tag} onChange={handleChangeTag} />
            <Button type="dashed" onClick={() => setTag(null)}>
              <AiOutlineClose />
            </Button>
            <Button type="primary" onClick={handleAddTag}>
              <AiOutlinePlus />
            </Button>
          </Group>
        ) : null} */}
        {/* <Tag onClick={handleNewTag} inputMode="text" style={{ cursor: 'pointer' }}>
          <AiOutlinePlus /> New Tag
        </Tag> */}
        <Button type="primary" onClick={handleSubmit} style={{ marginTop: 15 }}>
          AddPost
        </Button>
      </form>
    </Container>
  );
};

export default BlogAdd;
