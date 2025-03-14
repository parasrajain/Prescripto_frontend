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
  server: {
    host: '0.0.0.0',  // Ensure Vite binds to 0.0.0.0
    port: process.env.PORT || 5173,  // Use Render-assigned port
    strictPort: true
  }
})
