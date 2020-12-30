
const chokidar = require('chokidar');

chokidar.watch('.', { ignored: /dev|node_modules/ }).on('all', (event, path) => {
  console.log(event, path);

  require('esbuild').build({
    entryPoints: ['./lib/index.ts'],
    bundle: true,
    minify: false,
    outdir: 'dev',
    loader: {
      '.html':'text'
    },
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    // target: ['safari14'],
    format: 'esm',
    sourcemap: true,
    splitting: true,
  }).catch(() => process.exit(1))
});
