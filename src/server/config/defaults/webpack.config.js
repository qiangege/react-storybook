import autoprefixer from 'autoprefixer';
import { includePaths } from '../utils';

// Add a default custom config which is similar to what React Create App does.
module.exports = (storybookBaseConfig) => {
  const newConfig = { ...storybookBaseConfig };
  newConfig.module.loaders = [
    ...storybookBaseConfig.module.loaders,
    {
      test: /\.css?$/,
      include: includePaths,
      loaders: [
        require.resolve('style-loader'),
        require.resolve('css-loader'),
        require.resolve('postcss-loader'),
      ],
    },
    {
      test: /\.scss$/,
      loader: "style!css!sass?sourceMap",
      // exclude: /node_modules/,
      // exclude是指在执行webpack大宝的时候，想要忽略的目录，
      // 而我们在从node_modules中引入组件展示的时候，样式肯定是在node_modules中,所以node_module不能够忽略过去
      include: includePaths
    },
    {
      test: /\.json$/,
      include: includePaths,
      loader: require.resolve('json-loader'),
    },
    {
      test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
      include: includePaths,
      loader: require.resolve('file-loader'),
      query: {
        name: 'static/media/[name].[hash:8].[ext]',
      },
    },
    {
      test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
      include: includePaths,
      loader: require.resolve('url-loader'),
      query: {
        limit: 10000,
        name: 'static/media/[name].[hash:8].[ext]',
      },
    },
  ];

  newConfig.postcss = () => {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9',
        ],
      }),
    ];
  };

  newConfig.resolve.extensions = ['.js', '.json', 'scss'];
  newConfig.resolve.alias = {
    ...storybookBaseConfig.resolve.alias,
    // This is to support NPM2
    'babel-runtime/regenerator': require.resolve('babel-runtime/regenerator'),
  };

  // Return the altered config
  return newConfig;
};
