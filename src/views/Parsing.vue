<script setup lang='ts'>
import { ref } from 'vue'
import { ElInput, ElSelect, ElButton } from 'element-plus';

const input = ref('')
const options = [

]
</script>

<template>
  <div class="parsing">
    <div class="header">
      <el-select v-model="input" class="m-2" placeholder="Select" size="large">
        <el-option v-for="(item, index) in options" :key="index" :label="item" :value="item" />
      </el-select>
      inpu
    </div>
  </div>
</template>

<style lang="scss" scoped>
.parsing {
  padding: 20px;

  .input-with-select {
    border-radius: 20px;

  }
}
</style>
