import { Avatar, Comment } from 'antd';
import '../static/style/components/comment.css'


// 默认头像
const defaultAvatar = <Avatar
  src="../static/img/author-img.jpg"
/>

const CommentItem = ({ item, handleReply, ...rest }) => (
  <Comment
    actions={handleReply && [<span key="reply" onClick={handleReply}>回复</span>]}
    author={<a>{item.com_name}</a>}
    avatar={item.avatar || defaultAvatar}
    content={<p>{item.comment}</p>}
    datetime={item.add_time}
    {...rest}
  />
)

export default CommentItem;