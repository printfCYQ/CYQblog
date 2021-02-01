/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1575167155115_6539";

  // add your middleware config here
  config.middleware = [];

  // config.cluster = {
  //   listen: {
  //     port: 7001,
  //     hostname: '0.0.0.0', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
  //     // path: '/var/run/egg.sock',
  //   }
  // }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // 连接数据库
  config.mysql = {
    // database configuration
    client: {
      // host
      host: "localhost",
      // port
      port: "3306",
      // username
      user: "root",
      // password
      password: "459987870",
      // database
      database: "react-blog"
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false
  };
  // 解决跨域
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['http://127.0.0.1:3000', 'http://127.0.0.1:3001']
  };
  config.cors = {
    // origin: "http://localhost:3000",
    // origin:'*',
    credentials: true,   // 开启认证
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS"
  };

  return {
    ...config,
    ...userConfig
  };
};
