require('esbuild').build({
  entryPoints: ['./lib/index.ts'],
  bundle: true,
  minify: true,
  outdir: 'dist',
  loader: {
    '.html':'text'
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  target: ['safari14'],
  format: 'esm',
  sourcemap: true,
  splitting: true,
}).catch(() => process.exit(1))
