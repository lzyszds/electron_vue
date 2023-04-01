<script setup lang='ts'>
import { reactive } from 'vue'
import { ElInput, ElSelect, ElOption, ElButton, ElCard } from 'element-plus';
import http from '@/http';
import ParsingType from '@/types/parsingType';
// const origin = 'https://jx.bozrc.com:4433/player/?url='
// const inputs = 'https://v.qq.com/x/cover/'

const parsing = reactive({
  input: '斗罗大陆',
  api: '',
  options: [],
  data: [] as ParsingType[][],
  listArr: [] as string[],
  listActive: 0,
  isListShow: false,
})
http('get', `/videoParsingApi/${0}/${parsing.input}`).then((res: string) => {
  const data = res
    .replaceAll('undefined', 'null')
    .replaceAll('Array.prototype.slice.call(', '')
    .replaceAll(')', '')
    .replaceAll("'", "\"")
    .replaceAll("None", "\"None\"")
    .replaceAll("False", "\"False\"")
    .replaceAll("True", "\"True\"")
    .replaceAll('"{', "{")
    .replaceAll('}"', "}")
  const dataPro = JSON.parse(data)//.episodeMain//.listData[0].list
  parsing.data = dataPro.map((item: any) => {
    return Object.values(item)[0]
  })
  changeTabIndex(0)
  console.log(`lzy  parsing.data:`, parsing.data, parsing.data.length)
})
const changeTabIndex = (index) => {
  parsing.listActive = index
  parsing.listArr = parsing.data[index].map((item: any) => {
    return item.title
  })
}
const toLookVideo = (item) => {
  console.log(`lzy  toLookVideo:`, 'toLookVideo')
}
</script>

<template>
  <div class="parsing">
    <div class="header">
      <el-select v-model="parsing.api" class="m-2" placeholder="Select">
        <el-option v-for="(item, index) in parsing.options" :key="index" :label="item" :value="item" />
      </el-select>
      <el-input v-model="parsing.input" placeholder="Please input" clearable />
      <ElButton type="primary">搜 索</ElButton>
      <ElButton @click="parsing.isListShow = !parsing.isListShow" type="primary" style="margin: 0;">目 录</ElButton>
    </div>
    <div class="parsingCon" v-if="parsing.isListShow">
      <!-- 视频介绍详情 -->
      <div class="details">
        <el-card>
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image" />
          <div>
            <span>斗罗大陆</span>
            <div class="bottom">
              <time class="time">256集</time>
            </div>
          </div>
        </el-card>
      </div>
      <div class="listings">
        <div class="changeTab">
          <p v-for="(item, index) in parsing.data" :key="index" @click="changeTabIndex(index)"
            :class="{ 'active': parsing.listActive === index }">
            {{ item[0].title + '-' + item[parsing.data[index].length - 1].title }}
          </p>
        </div>
        <div class="listContent">
          <span class="listItem" v-for="item in parsing.listArr" :key="item" @click="toLookVideo(item)">{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.parsing {
  padding: 10px;
  background-color: #eee;

  .header {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
  }

  .parsingCon {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-top: 10px;
    height: 320px;
    padding: 5px 10px;
    background-color: #fff;
    border-radius: 10px;

    .listings {
      height: 100%;
      width: 100%;
      text-align: center;

      .changeTab {
        display: flex;
        gap: 10px;
        height: 50px;
        background-color: #eee;
        margin: 10px 10px 0 0;
        border-radius: 10px;
        padding-left: 20px;

        p {
          cursor: pointer;
          font-family: 'dindin';

          &.active {
            color: var(--themeColor);
          }

          &:hover {
            color: #409EFF;
          }
        }
      }

      .listContent {
        height: calc(100% - 80px);
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        grid-template-rows: repeat(6, 1fr);
        gap: 10px;
        padding: 0 10px 10px 0;
        padding-top: 0;
        margin-top: 10px;

        .listItem {
          font-size: clamp(12px, 2vw, 16px);
          cursor: pointer;
          font-family: 'dindin';
          border-radius: 10px;
          background-color: #fff;
          box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease-in-out;
          padding-top: 3px;

          &:hover {
            color: var(--themeColor);
          }
        }
      }
    }

  }
}
</style>
