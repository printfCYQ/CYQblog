import React, { useState } from "react";
import { Affix, Breadcrumb, Spin, message } from "antd";
import Author from "../components/Author";
import axios from "axios";
import servicePath from "../config/apiUrl";
import "../static/style/pages/detailed.css";
import CommentList from "../components/CommentList";
import CommentForm from '../components/CommentForm';
import { initMarked } from '../components/utils';
import ListIcon from '../components/ListIcon';
import Layout from "../components/Layout";


const Detailed = props => {
  const { marked, tocify } = initMarked({ hasTocify: true })
  const [isLoading, setIsLoading] = useState(false);
  const [commentKey, setCommentKey] = useState(Math.random());

  const upComment = async (values) => {
    let dataProps = {
      ...values,
      art_title: props.title,
      art_id: props.id,
      add_time: parseInt(new Date() / 1000),
    };

    setIsLoading(true)
    const res = await axios({
      method: "post",
      url: servicePath.addComment,
      header: { "Access-Control-Allow-Origin": "*" },
      data: dataProps,
      withCredentials: true
    })
    setIsLoading(false)
    const isSuccess = res.status == 200;
    if (isSuccess) {
      message.success("评论成功");
      setCommentKey(Math.random());
    } else {
      message.error("评论失败");
    }
    return isSuccess;
  };

  return (
    <Layout
    pageTitle="博客详情页 | CYQ的个人博客"
      renderRight={() => (
        <div>
          <Author />
          {/* <Advert /> */}
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">{tocify && tocify.render()}</div>
            </div>
          </Affix>
        </div>
      )}
    >
      <Spin tip="Loading..." spinning={isLoading}>
        <div className="acticle-div">
        <div className="bread-div">
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/">首页</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
            <Breadcrumb.Item> {props.title}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div>
          <div className="detailed-title">{props.title}</div>
          <ListIcon item={props} className='center' />
          <div
            className="detailed-content"
            dangerouslySetInnerHTML={{ __html: marked(props.article_content) }}
          />
        </div>
        <div>
          <CommentList artId={props.id} listKey={commentKey} upComment={upComment} />
          <CommentForm onOk={upComment} />
        </div>
        </div>
      </Spin>
    </Layout >
  )
};

Detailed.getInitialProps = async context => {
  let id = context.query.id;
  const result = await axios(servicePath.getArticleById + id)
  return result.data.data[0];
};

export default Detailed;
