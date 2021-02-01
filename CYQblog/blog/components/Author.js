import React, { useState, useEffect } from "react";
import { Avatar, Divider, Tooltip, Tag } from "antd";
import "../static/style/components/author.css";
import servicePath from "../config/apiUrl";
import axios from "axios";
import CountTo from "react-count-to";
import Music from "./Music";
const tagList = [
  {
    color: "magenta",
    label: "本博客由",
  },
  {
    color: "volcano",
    label: "React Hooks",
  },
  {
    color: "volcano",
    label: "node.js-Egg.js",
  },
  {
    color: "volcano",
    label: "Axios",
  },
  {
    color: "volcano",
    label: "React Next.js",
  },
  {
    color: "volcano",
    label: "Antd Design",
  },
  {
    color: "volcano",
    label: "markdown",
  },
  {
    color: "volcano",
    label: "mysql",
  },
  {
    color: "volcano",
    label: "CSS",
  },
  {
    color: "magenta",
    label: "等组成",
  },
];
const Author = () => {
  const [all_part_count, setAll_part_count] = useState(0);
  const [all_view_count, setAll_view_count] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios(servicePath.getAllPartCount).then((res) => {
      console.log(res);
      return res.data.data;
    });
    setAll_part_count(result[0].total);
    setAll_view_count(result[0].all_view_count);
  };
  return (
    <div className="author-div comm-box">
      <div className="avatar-img">
        {/* <Avatar
          size={100}
          src="../static/img/author-img.jpg"
        /> */}
        <Music/>
      </div>
      <div style={{ fontSize: 30, fontWeight: 700 }}>CYQ</div>
      <div>入门程序猿</div>
      <div>
        {tagList.map((v) => (
          <Tag color={v.color} key={v.label}>
            {v.label}
          </Tag>
        ))}
      </div>
      <Tag color="blue">
        文章共 
        <CountTo to={all_part_count} speed={1000} /> 篇
      </Tag>
      <Tag color="cyan">
        总访问 
        <CountTo to={all_view_count} speed={1000} /> 次
      </Tag>
      <div className="author-introduction">
        <Divider>社交账号</Divider>
        <a href="https://github.com/printfCYQ" target="_blank">
          <Tooltip title="https://github.com/printfCYQ">
            <Avatar size={28} icon="github" className="account" />
          </Tooltip>
        </a>
        <Tooltip title="QQ:459987870">
          <Avatar size={28} icon="qq" className="account" />
        </Tooltip>
        <Tooltip title="wechat:YQ459987870">
          <Avatar size={28} icon="wechat" className="account" />
        </Tooltip>
      </div>
    </div>
  );
};

export default Author;
