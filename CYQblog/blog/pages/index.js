import React, { useState, useEffect } from "react";
import { List, Input, Spin, Tag, Icon } from "antd";
import Link from "next/link";
import axios from "axios";
import servicePath from "../config/apiUrl";
// import "../static/style/pages/index.css";
import Layout from "../components/Layout";
import ListItem from "../components/ListItem";
import CountTo from "react-count-to";
import { initMarked } from "../components/utils";
const { marked } = initMarked({});
const SearchInput = Input.Search;

let timer;
const Home = ({ list }) => {
  const [fixedlist] = useState(list.data);
  const [fixedtoplist] = useState(list.topList);
  const [mylist, setMylist] = useState(list.data);
  const [toplist, setToplist] = useState(list.topList);
  const [isLoading, setIsLoading] = useState(false);
  const [keywords, setKeywords] = useState("");

  useEffect(() => {
    // 防抖
    // clearTimeout(timer);
    // timer = setTimeout(() => {
    //   setIsLoading(true);
    //   }, 1000);
      const mylist = fixedlist.filter((item) => item.title.match(keywords));
      const toplist = fixedtoplist.filter((item) => item.title.match(keywords));
      setMylist(mylist);
      setToplist(toplist);
      // setIsLoading(false);
    
  }, [keywords]);
  const goLoading = () => {
    setIsLoading(true);
  };
  return (
    <Layout pageTitle="首页 | CYQ的个人博客">
      <Spin tip="Loading..." spinning={isLoading}>
        <div className="searchBox">
          <SearchInput
            placeholder="Search"
            onSearch={setKeywords}
            enterButton
            allowClear
          />
        </div>
        <div className="comm-left-small">
          <List
            itemLayout="vertical"
            dataSource={toplist}
            renderItem={(item) => (
              <List.Item>
                <Spin spinning={isLoading}>
                  <div className="list-title" onClick={goLoading}>
                    <Link
                      href={{ pathname: "/detailed", query: { id: item.id } }}
                    >
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span>
                      <Tag color="#f50">置顶</Tag>
                    </span>
                    <span>
                      <Icon
                        type="calendar"
                        style={{ color: "lightseagreen" }}
                      />{" "}
                      {item.addTime}
                    </span>
                    <span>
                      <Icon type="folder" style={{ color: "sandybrown" }} />{" "}
                      {item.typeName}
                    </span>
                    <span>
                      <Icon type="fire" style={{ color: "red" }} />
                      <CountTo to={item.view_count} speed={1000} />人
                    </span>
                  </div>
                  <div
                    className="list-context"
                    dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                  ></div>
                  <div className="all-view">
                    <Link
                      href={{ pathname: "/detailed", query: { id: item.id } }}
                    >
                      <a>
                        <Icon type="arrows-alt" />
                        &nbsp;&nbsp;查看全文&nbsp;&nbsp; 》
                      </a>
                    </Link>
                  </div>
                </Spin>
              </List.Item>
            )}
          />
        </div>
        <div className="comm-left-small">
          <List
            header={<div className="type-name">最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={(item) => (
              <ListItem item={item} keywords={keywords} hasSearch />
            )}
          />
        </div>
      </Spin>
    </Layout>
  );
};

Home.getInitialProps = async () => {
  const res = await axios({
    url: servicePath.getArticleList,
    withCredentials: true, // 携带跨域cookie
  });
  console.log(res.data);
  return { list: res.data };
};

export default Home;
