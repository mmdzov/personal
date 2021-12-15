import { AiOutlineClose } from 'react-icons/ai';
import { Button, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { forwardRef, useState } from 'react';
import { setComment, setCommentReply } from '../../store/actions/blogAction';
import { useParams } from 'react-router';
import setAlign from '../../utils/setAlign';

const { TextArea } = Input;

const SendCommentRef = forwardRef(({ value, handleChange }, ref) => {
  return (
    <TextArea
      value={value}
      onChange={handleChange}
      placeholder="comment..."
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
        {Object.keys(reply)?.length > 0 ? `Reply to ${reply?.from?.username}` : 'Add a Comment'}
        {Object.keys(reply)?.length > 0 ? (
          <span onClick={onClearReply}>
            <AiOutlineClose />
          </span>
        ) : null}
      </div>
      {Object.keys(reply)?.length > 0 ? (
        <div className="reply-to-comment">
          <span>Comment</span>
          {reply.comment}
        </div>
      ) : null}
      <SendCommentRef ref={textAreaRef} value={value} handleChange={handleChange} />

      <Button type="primary" onClick={handleSendComment}>
        Send
      </Button>
    </form>
  );
});

export default SendComment;
