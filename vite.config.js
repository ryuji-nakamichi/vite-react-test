import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  // main.jsx の BASE_PATH と合わせる
  base: '/js-test/react-test/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icon.svg'], // キャッシュ対象
      manifest: {
        name: '三國志 仮想戦史',
        short_name: '三國志クイズ',
        description: '三國志の知識を試すクイズ＆辞典アプリ',
        theme_color: '#242424', // index.css の背景色に合わせる
        background_color: '#242424',
        display: 'standalone', // アプリのように全画面で起動
        icons: [
          {
            src: 'icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})
