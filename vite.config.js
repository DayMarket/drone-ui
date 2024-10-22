import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import svg from 'vite-plugin-svgo'
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    svgr(), // Enable SVG as React components
    // svg({
    //   multipass: true,
    //   plugins: [
    //     {
    //       name: 'preset-default',
    //       params: {
    //         overrides: {
    //           convertColors: {
    //             currentColor: true,
    //           },
    //         },
    //       },
    //     },
    //   ],
    // }),
    react({
      babel: {
        parserOpts: {
          plugins: ['decorators-legacy', 'classProperties'],
        },
      },
    })],
  server: {
    port: 3000,  // You can change the default port if needed
    open: true,  // Automatically open the app in the browser on server start
  },
  build: {
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
