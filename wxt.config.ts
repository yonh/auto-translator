import { defineConfig } from 'wxt';
import vue from '@vitejs/plugin-vue';

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: 'Auto Translator',
    description: 'Automatic page translation with OpenAI integration',
    permissions: [
      'storage',
      'tabs',
      'activeTab',
      'scripting',
      'webNavigation'
    ],
    host_permissions: [
      '<all_urls>'
    ],
    action: {
      default_popup: 'popup.html',
      default_icon: {
        '16': '/icon/16.png',
        '48': '/icon/48.png',
        '128': '/icon/128.png'
      }
    },
    options_ui: {
      page: 'options.html',
      open_in_tab: true
    },
    icons: {
      '16': '/icon/16.png',
      '48': '/icon/48.png',
      '128': '/icon/128.png'
    }
  },
  runner: {
    disabled: false,
  },
  vite: () => ({
    plugins: [vue()],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  })
});
