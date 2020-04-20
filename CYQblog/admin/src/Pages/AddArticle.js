import React, { useState, useEffect } from "react";
import marked from "marked";
import "../static/css/AddArticle.css";
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";

const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState(); //发布日期
  const [updateDate, setUpdateDate] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState("选择文章类型"); //选择的文章类别

  useEffect(() => {
    getTypeInfo();
    //获得文章ID
    let tmpId = props.match.params.id;
    if (tmpId) {
      setArticleId(tmpId);
      getArticleById(tmpId);
    }
  }, []);

  marked.setOptions({
    renderer: marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false
  });

  const changeContent = e => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  };

  const changeIntroduce = e => {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html);
  };

  const getTypeInfo = () => {
    axios({
      methods: "get",
      url: servicePath.getTypeInfo,
      withCredentials: true,
      header: { "Access-Control-Allow-Origin": "*" }
    }).then(res => {
      if (res.data.data == "没有登录") {
        localStorage.removeItem("openId");
        props.histroy.push("/");
      } else {
        // console.log(res);
        setTypeInfo(res.data.data);
      }
    });
  };
  const setSelectTypeHandler = value => {
    setSelectType(value);
  };
  const saveArticle = () => {
    if (!selectedType) {
      message.error("文章类型为空");
      return false;
    } else if (!articleTitle) {
      message.error("文章标题为空");
      return false;
    } else if (!articleContent) {
      message.error("文章内容为空");
      return false;
    } else if (!introducemd) {
      message.error("文章简介为空");
      return false;
    } else if (!showDate) {
      message.error("发布日期为空");
      return false;
    }
    let dataProps = {};
    dataProps.type_id = selectedType;
    dataProps.title = articleTitle;
    dataProps.article_content = articleContent;
    dataProps.introduce = introducemd;
    let dateText = showDate.replace("-", "/");
    dataProps.addTime = new Date(dateText).getTime() / 1000;
    if (articleId == 0) {
      dataProps.view_count = 0;
      dataProps.isTop = 0;
      axios({
        method: "post",
        url: servicePath.addArticle,
        data: dataProps,
        withCredentials: true
      }).then(res => {
        console.log(res);
        setArticleId(res.data.insertId);
        if (res.data.isSuccess) {
          message.success("发布成功");
        } else {
          message.error("发布失败");
        }
      });
    } else {
      dataProps.id = articleId;
      axios({
        method: "post",
        url: servicePath.updateArticle,
        header: { "Access-Control-Allow-Origin": "*" },
        data: dataProps,
        withCredentials: true
      }).then(res => {
        if (res.data.isScuccess) {
          message.success("文章发布成功");
        } else {
          message.error("发布失败");
        }
      });
    }
  };


  // 修改文章
  const getArticleById = id => {
    axios(servicePath.getArticleById + id, {
      withCredentials: true,
      header: { "Access-Control-Allow-Origin": "*" }
    }).then(res => {
      //let articleInfo= res.data.data[0]
      setArticleTitle(res.data.data[0].title);
      setArticleContent(res.data.data[0].article_content);
      let html = marked(res.data.data[0].article_content);
      setMarkdownContent(html);
      setIntroducemd(res.data.data[0].introduce);
      let tmpInt = marked(res.data.data[0].introduce);
      setIntroducehtml(tmpInt);
      setShowDate(res.data.data[0].addTime);
      setSelectType(res.data.data[0].typeId);
    });
  };
  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                value={articleTitle}
                placeholder="博客标题"
                size="large"
                onChange={e => {
                  setArticleTitle(e.target.value);
                }}
              />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select
                defaultValue={selectedType}
                size="large"
                onChange={setSelectTypeHandler}
              >
                {typeInfo.map((item, index) => {
                  return (
                    <Option key={index} value={item.Id}>
                      {item.typeName}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                value={articleContent}
                placeholder="文章内容"
                onChange={changeContent}
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>

        <Col span={6}>
          <Row>
            <Col span={24}>
              {/* <Button size="large">暂存文章</Button>&nbsp; */}
              <Button type="primary" size="large" onClick={saveArticle}>
                发布文章
              </Button>
              <br />
            </Col>
            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                value={introducemd}
                placeholder="文章简介"
                onChange={changeIntroduce}
                onPressEnter={changeIntroduce}
              />
              <br />
              <br />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{
                  __html: "文章简介：" + introducehtml
                }}
              ></div>
            </Col>

            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  onChange={(date, dateString) => {
                    setShowDate(dateString);
                  }}
                  placeholder="发布日期"
                  // value={updateDate}
                  size="large"
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
export default AddArticle;
