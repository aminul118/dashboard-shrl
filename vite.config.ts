import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true, // <-- crucial
    },
  },
  define: {
    'process.env': {}, // some deps peek at process
    global: 'window', // some deps assume Node's global
  },
  optimizeDeps: {
    include: ['quill', 'react-quilljs', 'parchment', 'quill-delta'],
  },
});
