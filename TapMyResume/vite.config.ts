import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/tapmyresume/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  assetsInclude: ['**/*.lottie'],
});
