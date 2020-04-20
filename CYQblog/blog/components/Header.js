import React, { useState, useEffect } from "react";
import { Row, Col, Menu, Icon } from "antd";
import Router from "next/router";
import axios from "axios";
import servicePath from "../config/apiUrl";
import "../static/style/components/header.css";

const Header = () => {
  const [navArray, setNavArray] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios(servicePath.getTypeInfo);
      setNavArray(res.data.data);
    };
    fetchData();
  }, []);
  //跳转到列表页
  const handleClick = (e) => {
    if (e.key == 0) {
      Router.push("/index");
      setTimeout(function() {
      location.reload();
      }, 1000);
    } else if (e.key == 5) {
      Router.push("/login");
    } else {
      Router.push("/list?id=" + e.key);
    }
  };
  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={16} sm={16} md={10} lg={10} xl={10}>
          {/* <span className="header-logo">CYQ</span> */}
          <span className="sign">
            <span className="fast-flicker">C</span>Y
            <span className="flicker">Q</span>
          </span>
          <span className="header-txt">一个记录自己的个人博客</span>
        </Col>
        <Col className="memu-div" xs={8} sm={8} md={14} lg={10} xl={8}>
          <Menu
            mode="horizontal"
            onClick={handleClick}
            overflowedIndicator={
              <span>
                <Icon type="menu-unfold" />
              </span>
            }
          >
            <Menu.Item key="0">
              <Icon type="home" />
              首页
            </Menu.Item>
            {navArray.map((item) => (
              <Menu.Item key={item.Id}>
                <Icon type={item.icon} />
                {item.typeName}
              </Menu.Item>
            ))}
            {/* <Menu.Item key="5">
            <UserOutlined />
              登录
            </Menu.Item> */}
          </Menu>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
