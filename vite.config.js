import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://sprintpedia.id',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '/page'),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            const cookie = 'cw_conversation=eyJhbGciOiJIUzI1NiJ9.eyJzb3VyY2VfaWQiOiIwMmQyOGI0Zi00ODA3LTQ2NTMtOWY1ZS1jZDNlYmFiZTRjNWYiLCJpbmJveF9pZCI6MX0.wAXs3_d_STfrhpGQ-CH0Ug2fkQ5A1gC7-HYzVq1GNoI;ci_session=otuuu8gj0ionbg63nqtrlvj9qc1qa618;csrf_cookie=90bc89a05b2ecde4060c4944615c8d06'; // <-- GANTI INI
            proxyReq.setHeader('User-Agent', 'Mozilla/5.0');
            proxyReq.setHeader('Cookie', cookie);
            proxyReq.setHeader('X-Requested-With', 'XMLHttpRequest');
            console.log(`[Vite Proxy] Mengirim request ke: ${proxyReq.host}${proxyReq.path}`);
          });

          // BAGIAN BARU: Laporkan apa yang dikirim kembali oleh server
          proxy.on('proxyRes', (proxyRes) => {
            console.log(`[Vite Proxy] Menerima respons dengan status: ${proxyRes.statusCode}`);
            if (proxyRes.headers.location) {
              console.log(`[Vite Proxy] --> SERVER REDIRECT ke: ${proxyRes.headers.location}`);
            }
          });
        }
      }
    }
  }
})
