import { defineClientConfig } from '@vuepress/client'

// import { provide, ref } from 'vue'
// import { useRoute, useRouter } from 'vue-router'

// import { onMounted } from 'vue'

export default defineClientConfig({
  enhance({ app, router, siteData }){
    console.log('Client enhance', app, router, siteData)

    // router.beforeEach((to) => {
    //   console.log('before navigation')
    // })

    // router.afterEach((to) => {
    //   console.log('after navigation')
    // })
  },
  // setup() {
  //   // 获取当前的路由位置
  //   const route = useRoute()
  //   // 或者 vue-router 实例
  //   const router = useRouter()
  //   // 供给一个值，可以被布局、页面和其他组件注入
  //   const count = ref(0)
  //   provide('count', count)

  //   onMounted(() => {
  //     // 在 mounted 之后使用 DOM API
  //     document.querySelector('#app')
  //   })
  // }

  
})