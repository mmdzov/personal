import errorImg from '../utils/errorImg';
import setAlign from '../../utils/setAlign';
import { Image } from 'antd';
import DeleteIcon from '../utils/DeleteIcon';
import useTokenDecode from '../../hooks/useTokenDecode';
import { useDispatch } from 'react-redux';
import { deleteReplyComment } from '../../store/actions/blogAction';

const BlogPostReplyComment = ({ comment, reply, onReply = () => {} }) => {
  const decoded = useTokenDecode();
  const dispatch = useDispatch();

  const handleDeleteReply = () => {
    dispatch(deleteReplyComment({ reply_comment_id: reply.id, comment_id: comment.id }));
  };
  return (
    <div className="comment-reply">
      <div className="comment-header">
        <Image
          src={reply.from.avatar || errorImg}
          style={{ width: 40, height: 40 }}
          alt=""
          preview={false}
          fallback={errorImg}
        />
        <div className="username">
          {reply?.from?.username} <span>to {reply?.reply_to?.username} </span>
        </div>
      </div>
      <div className="comment-content" style={{ textAlign: setAlign(reply?.comment) }}>
        {reply?.comment}
      </div>
      <div className="comment-footer">
        <div className="reply-comment-container">
          {decoded?._id === reply?.from?._id || decoded?.isAdmin ? (
            <DeleteIcon title="Delete Comment" onClick={handleDeleteReply} />
          ) : null}
          <span className="replyicon" onClick={() => onReply(comment, comment?.id)}>
            {/* <FaReply /> */}
            Reply
          </span>
        </div>
        <div className="comment-date">
          {new Date(reply.date).toLocaleDateString('fa-IR')} -{' '}
          {new Date(reply.date).toLocaleTimeString('fa-IR')}
        </div>
      </div>
    </div>
  );
};

export default BlogPostReplyComment;
