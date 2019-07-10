require('dotenv').config()

const Dotenv = require('dotenv-webpack')
const path = require('path')

module.exports = {
  webpack(config) {
    // path alias
    config.resolve.alias['pages'] = path.join(__dirname, 'pages')
    config.resolve.alias['src'] = path.join(__dirname, 'src')

    // Polyfill
    const originalEntry = config.entry
    config.entry = async () => {
      const entries = await originalEntry()
      if (
        entries['main.js'] &&
        !entries['main.js'].includes('./src/polyfill.ts')
      ) {
        entries['main.js'].unshift('./src/polyfill.ts')
      }
      return entries
    }

    // plugin
    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: path.join(__dirname, '.env'),
      }),
    ]

    return config
  },
}
