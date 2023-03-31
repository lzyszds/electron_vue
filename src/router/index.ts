import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Parsing from "@/views/Parsing.vue";

//引入 nprogress
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 引入样式
const routes = [
  {
    path: "/",
    name: "首页",
    component: Home, //注意，没有重定向就会出现两个一模一样的home页面
  },
  {
    path: "/about",
    name: "关于",
    component: About,
  },
  {
    path: "/parsing",
    name: "解析",
    component: Parsing,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    setTimeout(() => {
      document.querySelector('body')!.classList.remove('loading')
    }, 1000)
    return { top: 0 }
  },
});
//前置钩子
router.beforeEach(async (to: any) => {
  if (to.hash === '') {
    if (to.href.indexOf('userAdmin') != -1) return
    document.querySelector('.navbarContent')?.classList.remove('navbarContent100')
    document.querySelector('body')!.classList.add('loading')
  }
})


// 简单配置
NProgress.inc(0.4)
NProgress.configure({ easing: 'ease', speed: 1000, showSpinner: false })

// 进度条开始
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

// 进度条结束
router.afterEach(() => {
  NProgress.done()
})
export { router, routes };

