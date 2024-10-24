import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    svgr(), // Enable SVG as React components
    react({
      babel: {
        exclude: "node_modules/**",
        parserOpts: {
          plugins: ['decorators-legacy', 'classProperties'],
        },
      },
    })],
  server: {
    port: 3000,  // You can change the default port if needed
    open: true,  // Automatically open the app in the browser on server start
  },
  esbuild: {
    include: /\.m?[jt]sx?$/, // Include .js, .jsx, .ts, .tsx files for transpiling
    exclude: /node_modules/, // Exclude node_modules from transpiling
  },
  build: {
    target: "esnext",
    outDir: 'dist',  // The output directory for your build
  },
  resolve: {
    alias: {
      '_constants': '/src/_constants',
      'components': '/src/components',
      'utils': '/src/utils',
      'hooks': '/src/hooks',
      'svg': '/src/svg',
      'styles': '/src/styles',
      'pages': '/src/pages',
      'routes': '/src/routes',
      'context': '/src/context',
    },
  },
});
