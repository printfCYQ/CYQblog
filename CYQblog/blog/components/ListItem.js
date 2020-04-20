import { List, Icon } from "antd";
import Link from 'next/link';
import ListIcon from './ListIcon';
import { initMarked } from './utils';
const { marked } = initMarked({});

const ListItem = ({ item, keywords, hasSearch }) => (
  <List.Item>
    <div className="list-title">
      <Link href={{ pathname: "/detailed", query: { id: item.id } }}>
        {hasSearch ? (
          <a
            dangerouslySetInnerHTML={{
              __html: item.title.replace(keywords, `<span style="color: red">${keywords}</span>`)
            }}
          />
        ) : (
          <a>{item.title}</a>
        )}
      </Link>
    </div>
    <ListIcon item={item} />
    <div
      className="list-context"
      dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
    />
    <div className="all-view">
      <Link
        href={{ pathname: "/detailed", query: { id: item.id } }}
      >
        <a>
          <Icon type="arrows-alt" />
          &nbsp;&nbsp;查看全文&nbsp;&nbsp;
          》
      </a>
      </Link>
    </div>
  </List.Item>
)

export default ListItem;