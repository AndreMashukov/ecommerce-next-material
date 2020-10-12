const withTypescript = require('@zeit/next-typescript');
module.exports = withTypescript();

const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
module.exports = withCSS(
  withSass({
    webpack(config, options) {
      config.module.rules.push({
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }
      });
      // config.resolve = {
      //   ...config.resolve, // this line will fixed
      //   modules: ['node_modules', './src']
      // };

      return config;
    }
  })
);
