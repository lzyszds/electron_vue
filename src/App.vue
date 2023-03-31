<script setup lang="ts">
import { routes } from '@/router/index'
import { watch, ref } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router'
const router = useRoute()
const pathActive = ref<number>(0)
pathActive.value = routes.findIndex(item => item.path === router.path)

//监听路由变化 从而改变pathActive 从而改变样式 
watch(() => {
  return router.path
}, (newVal) => {
  pathActive.value = routes.findIndex(item => item.path === newVal)
  console.log(pathActive.value);
})
</script>

<template>
  <div id="content">
    <div class="column">
      <img width="150" src="@/assets/images/logo.png" alt="">
      <div class="tool">
        <RouterLink v-for="(item, index) in routes" :key="index" :to="item.path"
          :class="pathActive == index ? 'active' : ''">
          <i class="fa fa-home fa-fw"></i>
          {{ item.name }}
        </RouterLink>
      </div>
    </div>
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
#content {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 10px;
  width: 100vw;
  overflow: hidden;
  height: 100vh;
  font-size: 1.6em;

  .column {
    background: rgb(34, 40, 48);
    padding: 10px;
    padding-top: 20%;
    gap: 10px;
    text-align: center;

    img {
      border-radius: 10px;
      margin-bottom: 30px;
    }

    .tool {
      display: grid;
      grid-template-rows: repeat(10, 45px);
      gap: 10px;
      background-color: transparent;

      a {
        text-decoration: none;
        color: #ddd;
        border-radius: 10px;
        padding: 10px;
        // background-color: #fff;
        // box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease-in-out;

        &:hover {
          color: var(--themeColor);
        }

        &.active {
          background-color: var(--themeColor);
          color: #fff;
        }
      }
    }

  }
}
</style>
