
const esbuild = require('esbuild')
const chokidar = require('chokidar')
const autoprefixer = require('autoprefixer')
const postCssPlugin = require('@deanc/esbuild-plugin-postcss')

chokidar.watch('.', { ignored: /dev|.git|node_modules/ }).on('all', (event, path) => {
  console.log(event, path)

  esbuild.build({
    entryPoints: ['./lib/index.ts', './lib/index.css'],
    bundle: true,
    minify: false,
    outdir: 'dev',
    loader: {
      '.html': 'text'
    },
    define: {
      'process.env.NODE_ENV': '"development"'
    },
    target: [
      'es2020',
      'chrome58',
      'firefox57',
      'safari11',
      'edge16',
      'node12.19.0'
    ],
    format: 'esm',
    sourcemap: true,
    splitting: true,
    plugins: [
      postCssPlugin({
        plugins: [autoprefixer]
      })
    ]
  }).catch(() => process.exit(1))
})

// bs.watch('src/**/*.js', function (event, file) {
//   require('esbuild').build({
//     stdio: 'inherit',
//     entryPoints: ['./src/scripts/index.js'],
//     outfile: `${dist}/assets/scripts${!(process.env.NODE_ENV === 'development') ? '.min' : ''}.js`,
//     minify: !(process.env.NODE_ENV === 'development'),
//     bundle: true,
//     sourcemap: process.env.NODE_ENV === 'development'
//   }).then(() => bs.reload())
//     .catch(() => process.exit(1))
// })
