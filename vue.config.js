module.exports = {
  devServer: {
    port: 8088,
    proxy: {
      '/api-dev': {
        target: 'https://cosmos.demo-site.tw/api/',
        changeOrigin: true,
        pathRewrite: {
          '/api-dev': '',
        },
      },
      '/api-uat': {
        target: 'https://teststamp.tw-cosmos.com/api/',
        changeOrigin: true,
        pathRewrite: {
          '/api-uat': '',
        },
      },
      '/api-prd': {
        target: 'https://stamp.tw-cosmos.com/api/',
        changeOrigin: true,
        pathRewrite: {
          '/api-prd': '',
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '立亮居家家飾清潔';
      return args;
    });
  },
};
