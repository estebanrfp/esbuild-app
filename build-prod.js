const workboxBuild = require('workbox-build')

require('esbuild')
  .build({
    entryPoints: ['./lib/index.ts'],
    bundle: true,
    minify: true,
    outdir: 'dist',
    loader: {
      '.html': 'text'
    },
    define: {
      'process.env.NODE_ENV': '"production"'
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
    splitting: true
  })
  .then(() => {
    workboxBuild
      .generateSW({
        swDest: './dist/sw.js',
        globDirectory: './dist',
        skipWaiting: true
      })
      .then(() => {
        console.log('Generated new service worker.')
      })
      .catch((err) => {
        console.error('Unable to generate a new service worker.', err)
      })
  })

  .catch(() => process.exit(1))
