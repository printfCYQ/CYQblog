import { Form, Input, Button ,Divider} from 'antd';
import '../static/style/components/comment.css'
const TextArea = Input.TextArea;
const buttonStyle = {
  margin: '0 8px',
}

const CommentForm = ({ onCancel, onOk, isReply = false, form }) => {
  const { getFieldDecorator } = form;
  const onSubmit = () => {
    form.validateFields((err, values) => {
      if (err) { return }
      onOk(values).then(result => {
        // 清空表单的值
        !!result && form.setFieldsValue({ com_name: '', comment: '' })
      });
    })
  }
  return (
    <div className="comment-div">
    <Divider style={{color:'#1890ff'}}>欢迎留言</Divider>
    <Form layout='horizontal'>
      <Form.Item>
        {getFieldDecorator('com_name', {
          rules: [
            { required: true, message: '请输入昵称' }
          ]
        })(<Input placeholder='请输入昵称' />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('comment', {
          rules: [
            { required: true, message: `请输入${isReply ? '回复' : '评论'}内容` }
          ]
        })(<TextArea rows={4} placeholder={`请输入${isReply ? '回复' : '评论'}内容`} />)}
      </Form.Item>
      <Form.Item style={{ textAlign: "center" }}>
        {isReply && (
          <Button style={buttonStyle} onClick={onCancel}> 取消 </Button>
        )}
        <Button type="primary" style={buttonStyle} onClick={onSubmit}> 提交{isReply ? '' : '评论'} </Button>
      </Form.Item>
    </Form >
    </div>
  )
}

export default Form.create()(CommentForm);