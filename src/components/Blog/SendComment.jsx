import { AiOutlineClose } from 'react-icons/ai';
import { Button, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { forwardRef, useState } from 'react';
import { setComment, setCommentReply } from '../../store/actions/blogAction';
import { useParams } from 'react-router';
import setAlign from '../../utils/setAlign';
import useLanguage from '../../hooks/useLanguage';

const { TextArea } = Input;

const SendCommentRef = forwardRef(({ value, handleChange }, ref) => {
  const lang = useLanguage();
  return (
    <TextArea
      value={value}
      onChange={handleChange}
      placeholder={lang.blogpost.sendcomment.inputs.comment}
      id="textarea"
      className="scroll"
      ref={ref}
      style={{
        textAlign: setAlign(value),
        direction: setAlign(value) === 'right' ? 'rtl' : 'ltr',
      }}
      autoSize={{ minRows: 1, maxRows: 3 }}
    />
  );
});

const SendComment = forwardRef(({ reply, setReply, textAreaRef, onClearReply = () => {} }, ref) => {
  const lang = useLanguage();
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const { post } = useParams();

  const handleChange = ({ target }) => {
    setValue(target.value);
  };

  const handleSendComment = () => {
    if (Object.keys(reply)?.length > 0) {
      dispatch(
        setCommentReply(post, {
          comment: value,
          comment_parent_id: reply.commentId,
          reply_to: reply.id,
        }),
      );
      setValue('');
      setReply({});
      return;
    }
    dispatch(
      setComment(post, {
        comment: value,
      }),
    );
    setValue('');
    setReply({});
  };

  return (
    <form className="comment-send" ref={ref}>
      <div className="comment-send-title">
        {Object.keys(reply)?.length > 0
          ? `${lang.blogpost.sendcomment.replyto} ${reply?.from?.username}`
          : lang.blogpost.sendcomment.addacomment}
        {Object.keys(reply)?.length > 0 ? (
          <span onClick={onClearReply}>
            <AiOutlineClose />
          </span>
        ) : null}
      </div>
      {Object.keys(reply)?.length > 0 ? (
        <div className="reply-to-comment">
          <span>{lang.blogpost.sendcomment.comment}</span>
          {reply.comment}
        </div>
      ) : null}
      <SendCommentRef ref={textAreaRef} value={value} handleChange={handleChange} />

      <Button type="primary" onClick={handleSendComment}>
        {lang.blogpost.sendcomment.buttons.send}
      </Button>
    </form>
  );
});

export default SendComment;
