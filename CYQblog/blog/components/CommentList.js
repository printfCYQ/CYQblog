import { useEffect, useState } from 'react';
import axios from 'axios';
import { Drawer } from 'antd';
import servicePath from "../config/apiUrl";
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import '../static/style/components/comment.css'


// 格式化评论和回复数据
const commentFormat = (list) => {
  let commentList = [], replyList = [];
  // 区分评论和回复
  list.forEach(v => {
    if (!!v.is_reply) {
      replyList.push(v)
    } else {
      commentList.push(v)
    }
  })
  commentList.forEach(v => {
    v.children = replyList.filter(reply => +reply.reply_id === v.id).sort((a, b) => a.add_time - b.add_time);
  })
  return commentList;
}

const CommentList = ({ artId, listKey, upComment }) => {
  const [list, setList] = useState([]);
  const [drawerOptions, setDrawerOptions] = useState({ visible: false, item: undefined });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(servicePath.getCommentListById + artId);
      const list = result.data.data;
      if (!list || !list.length) {
        return
      }
      const commentList = commentFormat(list);
      setList(commentList)
    }
    fetchData();
  }, [artId, listKey])


  const handleReply = (comment) => {
    setDrawerOptions({
      visible: true,
      item: comment
    })
  }

  const cancelReply = () => {
    setDrawerOptions({
      visible: false,
      item: undefined
    })
  }

  const submitReply = (values) => {
    const options = {
      is_reply: 1,
      reply_id: drawerOptions.item.id,
      ...values
    }
    upComment(options)
    cancelReply()
    return false
  }

  if(!list.length) {
    return null
  }
  return (
    <div>
      {list.map(item => (
        <CommentItem
          key={item.id}
          item={item}
          handleReply={() => handleReply(item)}
        >
          {!!item.children.length && item.children.map(reply => (
            <CommentItem key={reply.id} item={reply} />
          ))}
        </CommentItem>
      ))}
      <Drawer
        title="回复"
        placement="right"
        width='50%'
        destroyOnClose
        closable={false}
        onClose={cancelReply}
        visible={drawerOptions.visible}
      >
        <CommentForm
          isReply
          onOk={submitReply}
          onCancel={cancelReply}
        />
      </Drawer>
    </div>
  )
};

export default CommentList;