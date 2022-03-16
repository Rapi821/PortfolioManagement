const createAttributeRemover = require('vue-remove-attributes');
module.exports = {
  transpileDependencies: ['vuetify'],
  chainWebpack: (config) => {
    if (process.env.mode == 'production') {
      config.module
        .rule('vue')
        .use('vue-loader')
        .tap((options) => {
          options.compilerOptions.modules = [
            createAttributeRemover(['data-testid', ':data-testid']),
          ];
          return options;
        });
    }
  },
};
