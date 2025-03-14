import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  theme:{
    extend:{
      colors:{
        'primary':"5f6FFF",
      },
      gridTemplateColumns : {
        'auto':'repeat (auto-fill,minmax(200px, 1fr))'

    },
  }
  },
  plugins: [react(),
    tailwindcss(),

  ],
  // server:{port:5173}
  // server: {
  //   host: '0.0.0.0',  // Ensure Vite binds to 0.0.0.0
  //   port: process.env.PORT || 5173,  // Use Render-assigned port
  //   strictPort: true,
  //   allowedHosts: ['prescripto-frontend-7-8coi.onrender.com'],
  // }
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5173,
    strictPort: true,
    cors: true,  // Enable CORS
    allowedHosts: ['prescripto-frontend-7-8coi.onrender.com'],
    proxy: {
      '/api': {
        target: 'https://prescripto-backend-3.onrender.com',  // Change this to your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
  },
})
