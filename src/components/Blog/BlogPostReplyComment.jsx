import errorImg from '../utils/errorImg';
import setAlign from '../../utils/setAlign';
import { Image } from 'antd';

const BlogPostReplyComment = ({ comment, reply, onReply = () => {} }) => {
  return (
    <div className="comment-reply" >
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
      <div className="comment-footer" style={{ marginLeft: 18 }}>
        <span className="replyicon" onClick={() => onReply(reply, comment?.id)}>
          {/* <FaReply /> */}
          Reply
        </span>
        <div className="comment-date">
          {new Date(reply.date).toLocaleDateString('fa-IR')} -{' '}
          {new Date(reply.date).toLocaleTimeString('fa-IR')}
        </div>
      </div>
    </div>
  );
};

export default BlogPostReplyComment;
