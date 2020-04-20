import { Tabs, Avatar } from "antd";
import "../static/style/components/advert.css";
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
const Advert = () => {
  return (
    <div className="ad-div comm-box">
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="QQ 群" key="1" className="comm-box">
            <div className="qq-title">加入QQ群一起学习</div>
            <div className="qq-number">
              <a href="https://jq.qq.com/?_wv=1027&k=57VJ0P8">
                <Avatar size={18} icon="qq" className="account" />
                前端交流群(12312312)
              </a>
            </div>
            <div className="qq-number">
              <a href="https://jq.qq.com/?_wv=1027&k=57VJ0P8">
                <Avatar size={18} icon="qq" className="account" />
                前端交流群(123123123)
              </a>
            </div>
            <div className="qq-number">
              <a href="https://jq.qq.com/?_wv=1027&k=57VJ0P8">
                <Avatar size={18} icon="qq" className="account" />
                前端交流群(123123123)
              </a>
            </div>
            <div className="qq-number">
              <a href="https://jq.qq.com/?_wv=1027&k=57VJ0P8">
                <Avatar size={18} icon="qq" className="account" />
                前端交流群(1231231231)
              </a>
            </div>
          </TabPane>
          <TabPane tab="公众号" key="2" className="comm-box">
            <div className="qq-title">扫一扫关注公众号</div>
            <div className="wechat-img">
            <img
                src="../static/img/wechat-img.jpg"
                width="100%"
              />
            </div>
          </TabPane>
          <TabPane tab="广告" key="3" className="comm-box">
            <div>
              <img
                src="http://blogimages.jspang.com/WechatIMG12.jpeg"
                width="100%"
              />
            </div>
            <div>
              <img
                src="http://newimg.jspang.com/shensanyuan.jpg"
                width="100%"
              />
            </div>
          </TabPane>
        </Tabs>
    </div>
  );
};

export default Advert;
