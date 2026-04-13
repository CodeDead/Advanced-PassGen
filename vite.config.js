import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgrPlugin(), eslintPlugin()],
});
