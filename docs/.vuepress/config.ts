import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'

export default defineUserConfig({
  lang: 'en-us',
  title: '核桃树下',
  description: '这是我的个人博客，请多多关注！',
  head:[['link', { rel: 'icon', href: '/images/logo.png'}]],
  theme: defaultTheme({
    logo: '/images/logo.png',
    navbar:[
      { text: "首页", link: "/" },
      { text: '性能', link: '/performance/page_performance'},
    ],
    // sidebar: {
    //   '/': [
    //     {
    //       text: 'Guide',
    //       children: ['/guide/README.md', '/guide/getting-started.md'],
    //     },
    //   ],
    //   '/reference/': [
    //     {
    //       text: 'Reference',
    //       children: ['/reference/cli.md', '/reference/config.md'],
    //     },
    //   ],
    // },
  })
})