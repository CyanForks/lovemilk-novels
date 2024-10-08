import { defineConfig } from 'vitepress'
import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';
import UnoCSS from 'unocss/vite'

export default defineConfig({
  title: "牛奶の小说 / Novels of lovemilk",
  description: "牛奶の小说将在本网站可供查看 / Novels which are public and written by lovemilk are available on this website",
  srcDir: 'novels/',
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
    ],

    editLink: {
      pattern: 'https://github.com/zhuhansan666/novels/edit/main/novels/:path',
      text: '和我一起写小说 (记得 Fork 后提交 PR)'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zhuhansan666/novels' }
    ],

    externalLinkIcon: false,

    footer: {
      message: '<p select-none>本网站部署于中国大陆外, 由 GitHub Pages 和 Cloudflare Pages 提供托管支持</p>',
      copyright: '<a target="_blank" select-none href="https://aka.lovemilk.top/68">Copyright &copy; Lovemilk, All Rights Reserved.</a>'
    },

    docFooter: {
      prev: '返回',
      next: '前进'
    },

    darkModeSwitchLabel: '颜色模式',
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
  },
  vite: {
    plugins: [
      AutoSidebar({
        path: 'novels/',
        ignoreList: ['.outline.md']
        // titleFromFile: true,
      }),
      UnoCSS(),
    ],
    build: {
      rollupOptions: {
        external: ['unocss']
      }
    }
  },
})
