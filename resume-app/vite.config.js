import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.json'] // 自动解析这些扩展名
  },
  server: {
    hmr: {
      overlay: true // 可以设置为 false 来禁用错误覆盖层
    }
  }
})
