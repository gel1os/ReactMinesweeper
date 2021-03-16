module.exports = ({ file, env }) => ({
    parser: file.extname === '.sss' ? 'sugarss' : false, // Handles `.css` && '.sss' files dynamically
        plugins: {
          'postcss-cssnext': {},
          'cssnano':  env === 'production'  ? {} : false
        }
})