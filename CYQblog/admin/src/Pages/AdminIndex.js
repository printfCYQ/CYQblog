import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Icon,message } from "antd";
import "../static/css/AdminIndex.css";
import AddArticle from "./AddArticle";
import ArticleList from "./ArticleList";
import Bar from './Bar';
import Comment from "./Comment";


import axios from 'axios'
import  servicePath  from '../config/apiUrl'

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const MenuItem = Menu.Item;


const menuList = [
  // { title: '工作台', path: '', icon: 'pie-chart', },
  // { title: '文件上传', path: '/index/upload', icon: 'desktop', },
  {
    title: '文章管理', path: '', icon: 'desktop',
    children: [
      { title: '文章列表', path: '/index/list', },
      { title: '添加文章', path: '/index/add', }
    ]
  },
  { title: '数据统计', path: '/index/bar', icon: 'bar-chart', },
  { title: '留言管理', path: '/index/comment', icon: 'file', },
]



function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false);

  const handleClick = ({ key }) => {
    props.history.push(key);
  }

    // 退出登录的方法
    const handleExit= e=>{
  
      localStorage.removeItem('openId')
      axios({
        method:'get',
        url:servicePath.outLogin,
        header:{ 'Access-Control-Allow-Origin':'*' },
        withCredentials:true
      }).then(
        res=>{
          if(res.data.data=='退出成功')
          {
            message.success('已退出')
            setTimeout(()=>{
              props.history.push('/')
            },1000)
          }
        }
      )
      
    }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={handleClick}
        >
          {menuList.map(v => (
            v.children ? (
              <SubMenu
                title={<><Icon type={v.icon} /><span>{v.title}</span></>}
                key={v.path}
              >
                {v.children.map(item => (
                  <MenuItem key={item.path}> <span>{item.title}</span>
                  </MenuItem>
                ))}
              </SubMenu>
            ) : (
                <MenuItem key={v.path}>
                  <Icon type={v.icon} />
                  <span>{v.title}</span>
                </MenuItem>
              )
          ))}
            <Menu.Item key="10" onClick={handleExit}>
            <Icon type="logout" />
              <span>退出登录</span>
            </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>CYQ博客后台管理</Breadcrumb.Item>
            {/* <Breadcrumb.Item>工作台</Breadcrumb.Item> */}
          </Breadcrumb>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <Switch>
              <Route path="/index/add/" exact component={AddArticle} />
              <Route path="/index/add/:id" exact component={AddArticle} />
              <Route path="/index/list/" component={ArticleList} />
              <Route path="/index/bar" component={Bar} />
              <Route path="/index/comment" component={Comment} />
              <Redirect exact strict from='/index' to='/index/list/' />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>CYQ.com</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminIndex;
