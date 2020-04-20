import React from 'react';
import { Button } from 'antd';

export const getCommentColumns = (deleteCommentItem) => {
  let columns = [
    { title: '文章标题', dataIndex: 'art_title', key: 'art_title', width: '15%' },
    { title: '昵称', dataIndex: 'com_name', key: 'com_name', width: '20%' },
    { title: '评论时间', dataIndex: 'add_time', key: 'add_time', width: '20%' },
    { title: `评论内容`, dataIndex: 'comment', key: 'comment', width: '30%' },
    {
      title: '操作', dataIndex: 'id', key: 'id', width: '10%',
      render: (text, record) => {
        return <Button onClick={() => deleteCommentItem(record)}>删除</Button>
      }
    }
  ]
  return columns
}
export const getReplyColumns = (deleteCommentItem) => {
  let columns = [ 
    { title: '昵称', dataIndex: 'com_name', key: 'com_name', width: '25%' },
    { title: '回复时间', dataIndex: 'add_time', key: 'add_time', width: '25%' },
    { title: `回复内容`, dataIndex: 'comment', key: 'comment', width: '35%' },
    { title: '操作', dataIndex: 'id', key: 'id', width: '15%',
      render: (text, record) => {
        return <Button size='small' onClick={() => deleteCommentItem(record)}>删除</Button>
      }
    }
  ]
  return columns
}