import { Container } from './BlogAdd.styled';
import { Input, Tag, Button } from 'antd';
import { useState } from 'react';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';

const { TextArea, Group } = Input;

const BlogAdd = () => {
  const [values, setValues] = useState({
    title: '',
    description: '',
    image: '',
    tags: [],
    content: '',
  });

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

  return (
    <Container>
      <form method="post" onSubmit={handleAddPost}>
        <Group>
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
        <input type="file" name="image" id="image" onChange={handleChange} />
        <div className="tagGroup">
          {values.tags.map((item, index) => (
            <Tag className="tag">
              {item}
              <span style={{ cursor: 'pointer' }} onClick={() => handleDeleteTag(index)}>
                <AiOutlineClose />
              </span>
            </Tag>
          ))}
        </div>
        {tag !== null ? (
          <Group className="addtag">
            <Input type="text" value={tag} onChange={handleChangeTag} />
            <Button type="dashed" onClick={() => setTag(null)}>
              <AiOutlineClose />
            </Button>
            <Button type="primary" onClick={handleAddTag}>
              <AiOutlinePlus />
            </Button>
          </Group>
        ) : null}
        <Tag onClick={handleNewTag} inputMode="text" style={{ cursor: 'pointer' }}>
          <AiOutlinePlus /> New Tag
        </Tag>

        <Button type="primary" onClick={handleAddTag}>
          AddPost
        </Button>
      </form>
    </Container>
  );
};

export default BlogAdd;
