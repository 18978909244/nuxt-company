<template>
  <section class="body-container middle-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-menu
          @select="handlerSelect"
          :default-active="currentIndex"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            v-for="(item, index) in helpList"
            :key="index"
            :index="index"
            :route="item.route"
          >
            <i class="el-icon-setting"></i>
            <span slot="title">{{ item.directory_name }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <Question :list="helpItem" />
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Question from "@/components/Question";
export default {
  components: {
    Question
  },
  computed: {
    ...mapState(["helpList"]),
    helpItem: function() {
      return (
        this.helpList[this.currentIndex] &&
        this.helpList[this.currentIndex].content_list
      );
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    handlerSelect(e) {
      this.currentIndex = e;
    }
  }
};
</script>
<style scoped lang="less"></style>
