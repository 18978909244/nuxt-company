<template>
    <div class="list">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="question">
          {{ item.problem }}
        </div>
        <div class="answer">
          <div v-html="item.answer" />
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
.list {
  padding: 20px;
  .item {
    margin-bottom: 50px;
    &:nth-last-child(1) {
      margin-bottom: 0;
    }
  }
}
</style>
