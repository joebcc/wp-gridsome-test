// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const tailwind = require("tailwindcss");

const postcssPlugins = [tailwind()];

const purgecss = require('@fullhuman/postcss-purgecss')

if (process.env.NODE_ENV === 'production') postcssPlugins.push(purgecss(require('./purgecss.config.js')))

const path = require('path')

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        // you can also use a glob if you'd prefer
        path.resolve(__dirname, './src/styles/*.css'),
        // path.resolve(__dirname, './src/styles/*.scss'),
      ],
    })
}

module.exports = {
  siteName: 'Skeleton Gridsome + TailWind + GSAP',
  css: {
    loaderOptions: {
      postcss: {
        plugins: postcssPlugins
      }
    }
  },
  chainWebpack (config) {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

    // or if you use scss
    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
  },
  plugins: [
    {

      use: 'gridsome-plugin-svg',
      options: {
      // default options below
      goesBothWays: false,
      svgo: [
        {
          removeTitle: false
        },
        {
          prefixIds: {
            prefix: (_, {path}) => basename(path, '.svg'),
            delim: '-',
          },
        },
        {
          removeDesc: false
        },
        {
          removeViewBox: false,
        },
        {
          sortAttrs: true,
        }
        ],
      }

    }
  ],
}
