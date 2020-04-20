import CountTo from "react-count-to";
import { Icon } from "antd";

const ListIcon = ({item, className=''}) => (
  <div className={`list-icon ${className}`}>
    <span>
      <Icon type="calendar" style={{color:'lightseagreen'}}/> {item.addTime}
    </span>
    <span>
      <Icon type="folder" style={{color:'sandybrown'}}/> {item.typeName}
    </span>
    <span>
      <Icon type="fire" style={{color:'red'}}/> 点击量：
      <CountTo to={item.view_count} speed={1000}/>次
    </span>
  </div>
)

export default ListIcon;
