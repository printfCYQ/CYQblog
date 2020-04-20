import React, { useEffect, useState, useCallback } from 'react';
import { Table, Modal } from 'antd';
import service from "../config/service";
import { getCommentColumns, getReplyColumns } from '../utils';
import '../static/css/comment.css';

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
    v.childrenList = replyList.filter(reply => +reply.reply_id === v.id).sort((a, b) => a.add_time - b.add_time);
  })
  return commentList;
}

function CommentContaienr() {
  const [list, setList] = useState([]);
  const [updateKey, setUpdateKey] = useState(Math.random())

  useEffect(() => {
    service.getCommentList().then(res => {
      const list = commentFormat(res.data.data);
      console.log(list);
      setList(list);
    });
  }, [updateKey])

  const deleteCommentItem = (item) => {
    const isReply = item.is_reply;
    let content = '';
    if (!isReply && item.childrenList.length) {
      content = `该评论下还有 ${item.childrenList.length} 条回复，删除评论将同时删除该评论下的所有回复`
    }
    Modal.confirm({
      title: `确定删除这条${isReply ? '回复' : '评论'}吗 ？`,
      content,
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        let ids = [item.id]
        if (!isReply) {
          ids = ids.concat(item.childrenList.map(v => v.id));
        }
        service.deleteCommentItem({ ids }).then(() => {
          setUpdateKey(Math.random())
        });
      }
    })
  }

  const expandedRowRender = useCallback((record) => {
    return (
      <Table
        className="reply-table"
        rowKey='id'
        dataSource={record.childrenList}
        columns={getReplyColumns(deleteCommentItem)}
        pagination={false}
      />
    );
  }, []);

  return (
    <Table
      className="comment-table"
      rowKey='id'
      dataSource={list}
      columns={getCommentColumns(deleteCommentItem)}
      expandedRowRender={expandedRowRender}
      pagination={false}
    />
  );
}

export default CommentContaienr;