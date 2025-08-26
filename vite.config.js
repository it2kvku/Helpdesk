import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Tải biến môi trường dựa vào mode hiện tại
  const env = loadEnv(mode, process.cwd(), '');
  
  // Sử dụng trực tiếp các biến môi trường
  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY)
    },
    server: {
      hmr: {
        timeout: 5000
      }
    }
  }
})
