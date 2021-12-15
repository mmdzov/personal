import BlogPostReplyComment from './BlogPostReplyComment';
import { Image } from 'antd';
import errorImg from '../utils/errorImg';
import setAlign from '../../utils/setAlign';

const BlogPostComment = ({ comment, onReply = () => {} }) => {
  return (
    <div className="comment" >
      <div className="comment-header">
        <div className="">
          <Image
            preview={false}
            src={comment?.from?.avatar || errorImg}
            style={{ width: 40, height: 40 }}
            alt=""
            fallback={errorImg}
          />
          <div className="username">{comment?.from?.username}</div>
        </div>
        <span className="replyicon" onClick={() => onReply(comment, comment?.id)}>
          {/* <FaReply /> */}
          Reply
        </span>
      </div>
      <div className="comment-content" style={{ textAlign: setAlign(comment?.comment) }}>
        {comment?.comment}
      </div>
      <div className="comment-footer">
        <div className="comment-date">
          {new Date(comment?.date).toLocaleDateString('fa-IR')} -{' '}
          {new Date(comment?.date).toLocaleTimeString('fa-IR')}
        </div>
      </div>
      {comment?.replies?.length > 0
        ? comment?.replies?.map((reply) => (
            <BlogPostReplyComment
              reply={reply}
              key={reply?._id || Math.floor(Math.random() * 999999)}
              comment={comment}
              onReply={onReply}
            />
          ))
        : null}
    </div>
  );
};

export default BlogPostComment;
