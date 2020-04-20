module.exports = app => {
    const { router, controller } = app;
    const { main } = controller.admin;
    const adminauth = app.middleware.adminauth()
    router.get('/admin/index', main.index)
    router.post('/admin/checkLogin', main.checkLogin)
    router.post('/admin/checkOpenId',controller.admin.main.checkOpenId)
    router.get('/admin/outLogin',adminauth,controller.admin.main.outLogin)
    router.get('/admin/getTypeInfo', adminauth, main.getTypeInfo)
    router.post('/admin/addArticle', adminauth, main.addArticle)
    router.post('/admin/updateArticle', adminauth, main.updateArticle)
    router.get('/admin/getArticleList', adminauth, main.getArticleList)
    router.get('/admin/delArticle/:id', adminauth, main.delArticle)
    router.get('/admin/getArticleById/:id', adminauth, main.getArticleById)
    router.get('/admin/getCommentList', adminauth, main.getCommentList)
    router.post('/admin/deleteCommentItem', adminauth, main.deleteCommentItem)
    router.post('/admin/updateIsTop',adminauth,controller.admin.main.updateIsTop)
}