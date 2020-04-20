"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.boby = "<h1>123</h1>";
  }
  // 首页获取列表
  async getArticleList() {
    let sql = `
        SELECT article.id as id,
        article.title as title,
        article.introduce as introduce,
        FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,
        article.view_count as view_count,
        type.typeName as typeName 
        FROM article LEFT JOIN type ON article.type_id = type.Id
        WHERE article.isTop = 0 order by article.id desc
      `;
    const results = await this.app.mysql.query(sql);

    //置顶文章
    let sql2 = `
    SELECT article.id as id,
    article.title as title,
    article.introduce as introduce,
    FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,
    article.view_count as view_count,
    type.typeName as typeName 
    FROM article LEFT JOIN type ON article.type_id = type.Id
    WHERE article.isTop = 1 order by article.id desc
  `;
    const resTopList = await this.app.mysql.query(sql2);

    this.ctx.body = {
      data: results,
      topList: resTopList,
    };
  }
  // 根据id获取文章详情
  async getArticleById() {
    //先配置路由的动态传值，然后再接收值
    let id = this.ctx.params.id;

    // 增加阅读数
    let sql2 = "update article set view_count = view_count + 1 where id =" + id;
    const result2 = await this.app.mysql.query(sql2);
    
    let sql = `
        SELECT article.id as id,
        article.title as title,
        article.introduce as introduce,
        article.article_content as article_content,
        FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,
        article.view_count as view_count ,
        type.typeName as typeName ,
        type.id as typeId 
        FROM article LEFT JOIN type ON article.type_id = type.Id 
        WHERE article.id=${id}
      `;
    const result = await this.app.mysql.query(sql);

    this.ctx.body = { data: result };
  }

  //得到类别名称和编号
  async getTypeInfo() {
    const result = await this.app.mysql.select("type");
    this.ctx.body = { data: result };
  }
  //根据类别ID获得文章列表
  async getListById() {
    let id = this.ctx.params.id;
    let sql = `
        SELECT article.id as id,
        article.title as title,
        article.introduce as introduce,
        FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,
        article.view_count as view_count ,
        type.typeName as typeName 
        FROM article LEFT JOIN type ON article.type_id = type.Id 
        WHERE type_id=${id}
      `;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

  // 注册
  // async registerVisitor() {
  //   let visitorInfo = this.ctx.request.body;
  //   const result = await this.app.mysql.insert("visitor", visitorInfo);
  //   const insertSuccess = result.affectedRows === 1;
  //   const insertId = result.insertId;
  //   this.ctx.body = {
  //     isSuccess: insertSuccess,
  //     insertId: insertId
  //   };
  // }

  //判断用户名密码是否正确
  // async checkLogin() {
  //   let userName = this.ctx.request.body.userName;
  //   let password = this.ctx.request.body.password;
  //   const sql = `SELECT userName FROM visitor WHERE userName = ${userName} AND password = ${password}`
  //   const res = await this.app.mysql.query(sql);
  //   if (res.length > 0) {
  //     //登录成功,进行session缓存
  //     let openId = new Date().getTime();
  //     this.ctx.session.openId = { openId: openId };
  //     this.ctx.body = { data: "登录成功", openId: openId, userName: userName };
  //   } else {
  //     this.ctx.body = { data: "登录失败" };
  //   }
  // }

  //获取总文章数和总浏览数
  async getAllPartCount() {
    let sql = `SELECT count(1) as total,
        SUM(view_count) as all_view_count
        FROM article`;

    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

  // 添加评论
  async addComment() {
    let tmpComment = this.ctx.request.body;
    const result = await this.app.mysql.insert("artcomment", tmpComment);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId: insertId,
    };
  }
  //根据文章ID获得评论列表
  async getCommentListById() {
    let id = this.ctx.params.id;
    let sql = `
      SELECT artcomment.id as id,
      artcomment.art_id as art_id,
      artcomment.com_name as com_name,
      artcomment.is_reply as is_reply,
      artcomment.reply_id as reply_id,
      FROM_UNIXTIME(artcomment.add_time,'%Y-%m-%d' ) as add_time,
      artcomment.comment as comment 
      FROM artcomment LEFT JOIN article ON artcomment.art_id = article.Id 
      WHERE article.id = ${id}
    `;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
}

module.exports = HomeController;
