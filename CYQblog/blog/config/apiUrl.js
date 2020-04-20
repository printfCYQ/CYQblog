let ipUrl = 'http://127.0.0.1:7001/default/' 

let servicePath = {
    getArticleList:ipUrl + 'getArticleList' ,  //  首页文章列表接口
    getArticleById:ipUrl + 'getArticleById/',  // 文章详细页内容接口 ,需要接收参数
    getTypeInfo : ipUrl + 'getTypeInfo', //类别接口
    getListById : ipUrl + 'getListById/', //根据类别ID获得文章列表
    // registerVisitor : ipUrl + 'registerVisitor/', //注册
    // checkLogin:ipUrl + 'checkLogin' ,  //  检查用户名密码是否正确
    addComment:ipUrl + 'addComment', // 添加评论
    getAllPartCount:ipUrl + 'getAllPartCount',         // 获得所有集数和访问数
    getCommentListById:ipUrl + 'getCommentListById/', // 根据文章ID获取评论
}
export default servicePath;
