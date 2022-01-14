import BlogPostReplyComment from './BlogPostReplyComment';
import { Image } from 'antd';
import errorImg from '../utils/errorImg';
import setAlign from '../../utils/setAlign';
import DeleteIcon from '../utils/DeleteIcon';
import useTokenDecode from '../../hooks/useTokenDecode';
import useLanguage from '../../hooks/useLanguage';

const BlogPostComment = ({ comment, onReply = () => {} }) => {
  const decoded = useTokenDecode();
  const handleDeleteComment = () => {
    console.log('deleted ');
  };

  const lang = useLanguage();

  return (
    <div className="comment">
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
        <div className="reply-comment-container">
          {decoded?._id === comment?.from?._id || decoded?.isAdmin ? (
            <DeleteIcon
              title={lang.blogpost.comments.deletecomment}
              onClick={handleDeleteComment}
            />
          ) : null}
          <span className="replyicon" onClick={() => onReply(comment, comment?.id)}>
            {/* <FaReply /> */}
            {lang.blogpost.comments.reply}
          </span>
        </div>
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
