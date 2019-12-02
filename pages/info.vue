<template>
  <section v-if="detail" class="body-container middle-container">
    <h1>{{ detail.title }}</h1>
    <el-divider />
    <el-image :src="detail.information_img" fit="contain"></el-image>
    <div v-html="detail.content"></div>
    <section class="footer">
      <div v-for="(item,index) in other" :key="index">
        <span class="" @click="$router.push(`/info?id=${item.information_id}`)">{{item.title}}</span>
      </div>
    </section>
  </section>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      id: null
    };
  },
  computed: {
    ...mapState(["informations"]),
    detail: function() {
      return this.informations.find(item => item.information_id === this.id);
    },
    other: function() {
      return this.informations.filter(item => item.information_id !== this.id);
    }
  },
  watch: {
    $route: function(to, from) {
      if (to.fullPath !== from.fullPath) {
        this.id = Number(this.$route.query.id);
      }
    }
  },
  created() {
    this.id = Number(this.$route.query.id);
  }
};
</script>

<style lang="less" scoped>
.footer {
  margin-top: 50px;
  display: flex;
  justify-content: flex-end;
}
</style>
