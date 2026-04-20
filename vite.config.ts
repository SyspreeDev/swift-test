// import { defineConfig } from 'vite'
// import path from 'path'
// import tailwindcss from '@tailwindcss/vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [
//     // The React and Tailwind plugins are both required for Make, even if
//     // Tailwind is not being actively used – do not remove them
//     react(),
//     tailwindcss(),
//   ],
//   resolve: {
//     alias: {
//       // Alias @ to the src directory
//       '@': path.resolve(__dirname, './src'),
//     },
//   },

//   // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
//   assetsInclude: ['**/*.svg', '**/*.csv'],
// })

import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },

  assetsInclude: ['**/*.svg', '**/*.csv'],

  build: {
    // Target modern browsers — smaller output, no legacy polyfills
    target: 'es2020',

    // Warn when any chunk exceeds 400 KB (before gzip)
    chunkSizeWarningLimit: 400,

    rollupOptions: {
      output: {
        /**
         * Manual chunk splitting — keeps vendor libraries in separate
         * cached chunks so a content change in your own code doesn't bust
         * the browser cache for React, Framer Motion, etc.
         */
        manualChunks(id) {
          // React core — changes almost never
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          // Framer Motion — large but stable
          if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) {
            return 'vendor-motion';
          }
          // Radix UI primitives — used by shadcn components
          if (id.includes('node_modules/@radix-ui')) {
            return 'vendor-radix';
          }
          // MUI (if still in the bundle — ideally remove it)
          if (id.includes('node_modules/@mui') || id.includes('node_modules/@emotion')) {
            return 'vendor-mui';
          }
          // Everything else in node_modules → vendor-misc
          if (id.includes('node_modules')) {
            return 'vendor-misc';
          }
        },
      },
    },
  },
});