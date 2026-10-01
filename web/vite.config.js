import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react(), {
    name: 'csleaf-backend',
    configureServer(server) {
      const backend = spawn(process.execPath, [fileURLToPath(new URL('../server/index.js', import.meta.url))], {
        stdio: ['inherit', 'inherit', 'inherit', 'ipc'], env: { ...process.env, CSLEAF_NO_OPEN: '1' },
      });
      const stopBackend = () => backend.kill();
      server.httpServer?.once('close', stopBackend);
      process.once('exit', stopBackend);
    },
  }],
  server: {
    host: '127.0.0.1',
    port: 5188,
    proxy: {
      '/api': { target: 'http://127.0.0.1:4513', changeOrigin: true },
      '/ws': { target: 'ws://127.0.0.1:4513', ws: true },
    },
  },
  build: {
    chunkSizeWarningLimit: 4000,
    rollupOptions: {
      output: {
        manualChunks: {
          monaco: ['monaco-editor', '@monaco-editor/react'],
          pdfjs: ['pdfjs-dist'],
          react: ['react', 'react-dom'],
        },
      },
    },
  },
});
