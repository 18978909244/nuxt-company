<template>
  <div>
    <div class="list" v-if="list.length > 0">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="question">
          {{ item.title }}
        </div>
        <div class="answer">
          <div v-html="item.content" />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="empty">
        <el-icon class="iconfont icon-empty"></el-icon>
        暂无帮助问答
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {}
};
</script>

<style lang="less" scoped>
.empty {
  min-height: 500px;
  border: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .iconfont {
    font-size: 60px;
    text-align: center;
  }
}
.list {
  min-height: 500px;
  border: 1px solid #eee;
  padding: 20px;
  .item {
    margin-bottom: 50px;
    &:nth-last-child(1) {
      margin-bottom: 0;
    }
  }
}
</style>
