module.exports = app => {
    const { router, controller } = app
    const { home } = controller.default
    router.get('/default/index', home.index)
    router.get('/default/getArticleList', home.getArticleList)
    router.get('/default/getArticleById/:id', home.getArticleById)
    router.get('/default/getTypeInfo', home.getTypeInfo)
    router.get('/default/getListById/:id', home.getListById)
    // router.post('/default/registerVisitor', home.registerVisitor)
    // router.post('/default/checkLogin', home.checkLogin)
    router.get('/default/getAllPartCount',controller.default.home.getAllPartCount)
    router.post('/default/addComment', home.addComment)
    router.get('/default/getCommentListById/:id', home.getCommentListById)

}